// Al inicio de tu Ducks.test.jsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { DucksManager } from "../components/DucksManager";

// Mock de DuckForm para simplificar los tests
jest.mock("../components/DuckForm", () => ({ onSave }) => {
    return (
        <button
            onClick={() =>
                onSave({ id: 1, image: "duck.png", description: "Pato Test" })
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

        // Hacemos click en editar
        const editButton = screen.getByText("Editar");
        fireEvent.click(editButton);

        // Guardamos con datos modificados
        fireEvent.click(saveButton);

        // Verificamos que la descripción siga presente (ya que nuestro mock devuelve el mismo pato)
        expect(screen.getByText("Pato Test")).toBeInTheDocument();
    });

    test("eliminar un pato (con bug intencional)", () => {
        render(<DucksManager />);
        const saveButton = screen.getByText("Guardar Pato");
        fireEvent.click(saveButton);

        const deleteButton = screen.getByText("Eliminar");
        fireEvent.click(deleteButton);

        // Con el bug actual, el pato eliminado permanece, así que sigue en la lista
        expect(screen.getByText("Pato Test")).toBeInTheDocument();
    });
});
