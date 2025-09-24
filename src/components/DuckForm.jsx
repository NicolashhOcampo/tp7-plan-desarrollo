import { useState, useEffect } from "react";

export default function DuckForm({ initialDuck, onSave }) {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    // Si recibimos un pato para editar, cargamos sus datos
    useEffect(() => {
        if (initialDuck) {
            setImage(initialDuck.image || "");
            setDescription(initialDuck.description || "");
        } else {
            setImage("");
            setDescription("");
        }
    }, [initialDuck]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !image) {
            alert("Por favor completa todos los campos");
            return;
        }

        const duck = {
            image,
            description,
            id: initialDuck?.id || Date.now(), // id nuevo si no existe
        };

        onSave(duck);

        // Limpiar solo si es nuevo pato
        if (!initialDuck) {
            setImage("");
            setDescription("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 border rounded-2xl shadow-md space-y-4"
        >
            <h2 className="text-xl font-bold">
                {initialDuck ? "Editar Pato" : "Crear Pato"}
            </h2>

            <div>
                <label className="block font-medium">Imagen (URL)</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://ejemplo.com/mi-pato.png"
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            {image && (
                <div className="flex justify-center">
                    <img src={image} alt="Pato preview" className="max-h-40 rounded-lg" />
                </div>
            )}

            <div>
                <label className="block font-medium">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción del pato"
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
                {initialDuck ? "Guardar Cambios" : "Crear Pato"}
            </button>
        </form>
    );
}
