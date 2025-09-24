import { useState } from "react";
import DuckForm from "./DuckForm";

export const DucksManager = () => {
    const [ducks, setDucks] = useState([]);
    const [editingDuck, setEditingDuck] = useState(null);

    const handleSave = (duck) => {
        if (editingDuck) {
            setDucks(ducks.map((d) => (d.id === duck.id ? duck : d)));
            setEditingDuck(null);
        } else {
            setDucks([...ducks, duck]);
        }
    };

    const handleDelete = (duckId) => {
        setDucks(ducks.filter((d) => d.id !== duckId));
        if (editingDuck && editingDuck.id === duckId) {
            setEditingDuck(null);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <DuckForm initialDuck={editingDuck} onSave={handleSave} />

            <h2 className="text-2xl font-bold">Lista de Patos</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                {ducks.map((duck) => (
                    <div
                        key={duck.id}
                        className="p-4 border rounded-2xl shadow-md space-y-2"
                    >
                        <img
                            src={duck.image}
                            alt={duck.description}
                            className="w-full h-40 object-contain rounded-lg"
                        />
                        <p>{duck.description}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingDuck(duck)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(duck.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
