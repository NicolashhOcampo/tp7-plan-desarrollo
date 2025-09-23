import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Notes from "../components/Notes";

describe("Notas - flujo completo de integridad", () => {
    test("puede agregar, editar y eliminar notas correctamente", () => {
        render(<Notes />);

        const input = screen.getByPlaceholderText(/escribe una nota/i);
        const addButton = screen.getByRole("button", { name: /agregar/i });

        // --- AGREGAR ---
        fireEvent.change(input, { target: { value: "Nota de prueba" } });
        fireEvent.click(addButton);

        // Verificar que se agregó
        expect(screen.getByText("Nota de prueba")).toBeInTheDocument();

        // --- EDITAR ---
        const editButton = screen.getByRole("button", { name: /editar/i });
        fireEvent.click(editButton);

        fireEvent.change(input, { target: { value: "Nota editada" } });
        const modifyButton = screen.getByRole("button", { name: /modificar/i });
        fireEvent.click(modifyButton);

        // Verificar edición
        expect(screen.getByText("Nota editada")).toBeInTheDocument();
        expect(screen.queryByText("Nota de prueba")).not.toBeInTheDocument();

        // --- ELIMINAR ---
        const deleteButton = screen.getByRole("button", { name: /eliminar/i });
        fireEvent.click(deleteButton);

        // Verificar eliminación
        expect(screen.queryByText("Nota editada")).not.toBeInTheDocument();
    });
});
