import { useState } from "react";

export const RandomDuckButton = () => {
    const [duck, setDuck] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRandomDuck = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/patos/random`);
            if (!response.ok) throw new Error("Error al obtener el pato");
            const data = await response.json();
            setDuck(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-6 space-y-4">
            <button
                onClick={fetchRandomDuck}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
            >
                Obtener pato al azar
            </button>

            {loading && <p className="text-sm">Cargando...</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {duck && (
                <div className="flex flex-col items-center gap-3 border p-2 rounded-lg shadow-sm w-80">
                    <img
                        src={duck.image_url}
                        alt={duck.title}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between text-sm">
                        <h3 className="font-bold text-sm">{duck.title}</h3>
                        <p>{duck.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
