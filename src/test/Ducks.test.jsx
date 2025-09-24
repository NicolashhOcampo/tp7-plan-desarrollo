// Ducks.test.jsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { DucksManager } from "../components/DucksManager";

// Mock de DuckForm más realista: crea o edita según corresponda
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

describe("DucksManager", () => {
    test("agrega un pato", () => {
        render(<DucksManager />);
        const saveButton = screen.getByText("Guardar Pato");
        fireEvent.click(saveButton);

        // Verificamos que el pato aparezca en la lista
        expect(screen.getByText("Pato Test")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "duck.png");
    });

    test("editar un pato", () => {
        render(<DucksManager />);
        const saveButton = screen.getByText("Guardar Pato");
        fireEvent.click(saveButton);

        // Confirmamos que está el pato original
        expect(screen.getByText("Pato Test")).toBeInTheDocument();

        // Hacemos click en editar
        const editButton = screen.getByText("Editar");
        fireEvent.click(editButton);

        // Guardamos con datos modificados (mock devuelve "Pato Editado")
        fireEvent.click(saveButton);

        // Ahora debe aparecer "Pato Editado" y no "Pato Test"
        expect(screen.getByText("Pato Editado")).toBeInTheDocument();
        expect(screen.queryByText("Pato Test")).not.toBeInTheDocument();
    });

    test("eliminar un pato", () => {
        render(<DucksManager />);

        // Crear un pato
        const saveButton = screen.getByText("Guardar Pato");
        fireEvent.click(saveButton);

        // Confirmar que el pato aparece en la lista
        expect(screen.getByText("Pato Test")).toBeInTheDocument();

        // Eliminar el pato
        const deleteButton = screen.getByText("Eliminar");
        fireEvent.click(deleteButton);

        // Ahora el pato ya no debería estar
        expect(screen.queryByText("Pato Test")).not.toBeInTheDocument();
    });
});
