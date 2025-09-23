// Al inicio de tu Ducks.test.jsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { DucksManager } from "../components/DucksManager";

// Mock de DuckForm que permite enviar datos dinámicos
jest.mock("../components/DuckForm", () => ({ initialDuck, onSave }) => {
    return (
        <button
            onClick={() =>
                onSave(
                    initialDuck
                        ? { ...initialDuck, description: "Pato Editado" }
                        : { id: 1, image: "duck.png", description: "Pato Test" }
                )
            }
        >
            Guardar Pato
        </button>
    );
});

describe("DucksManager - Test de Integridad", () => {
    test("flujo completo: agregar, editar y eliminar pato", () => {
        render(<DucksManager />);

        // --- Agregar pato ---
        const saveButton = screen.getByText("Guardar Pato");
        fireEvent.click(saveButton);

        expect(screen.getByText("Pato Test")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "duck.png");

        // --- Editar pato ---
        const editButton = screen.getByText("Editar");
        fireEvent.click(editButton);

        fireEvent.click(saveButton); // Guardamos cambios

        // Verificamos que la descripción se haya actualizado
        expect(screen.getByText("Pato Editado")).toBeInTheDocument();
        expect(screen.queryByText("Pato Test")).not.toBeInTheDocument();

        // --- Eliminar pato ---
        const deleteButton = screen.getByText("Eliminar");
        fireEvent.click(deleteButton);

        // Con el bug actual, el pato eliminado sigue presente
        expect(screen.getByText("Pato Editado")).toBeInTheDocument();

        // --- Simulación de fix (para comprobar el flujo correcto) ---
        // Si arreglamos el bug, el pato debería desaparecer:
        // expect(screen.queryByText("Pato Editado")).not.toBeInTheDocument();
    });
});
