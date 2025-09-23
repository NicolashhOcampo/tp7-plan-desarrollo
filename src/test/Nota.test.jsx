import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Notes from "../components/Notes";


describe("Notes component", () => {
    test("puede agregar una nota", () => {
        render(<Notes />);
        const input = screen.getByPlaceholderText(/escribe una nota/i);
        const addButton = screen.getByText(/agregar/i);

        fireEvent.change(input, { target: { value: "Mi primera nota" } });
        fireEvent.click(addButton);

        expect(screen.getByText("Mi primera nota")).toBeInTheDocument();
    });

    test("puede editar una nota", () => {
        render(<Notes />);
        const input = screen.getByPlaceholderText(/escribe una nota/i);
        const addButton = screen.getByText(/agregar/i);

        // Agregar nota
        fireEvent.change(input, { target: { value: "Nota original" } });
        fireEvent.click(addButton);

        // Editar nota
        const editButton = screen.getByText(/editar/i);
        fireEvent.click(editButton);

        fireEvent.change(input, { target: { value: "Nota editada" } });
        const modifyButton = screen.getByText(/modificar/i);
        fireEvent.click(modifyButton);

        expect(screen.getByText("Nota editada")).toBeInTheDocument();
        expect(screen.queryByText("Nota original")).not.toBeInTheDocument();
    });

    test("puede eliminar una nota", () => {
        render(<Notes />);
        const input = screen.getByPlaceholderText(/escribe una nota/i);
        const addButton = screen.getByRole("button", { name: /agregar/i });

        // Agregar nota
        fireEvent.change(input, { target: { value: "Nota a eliminar" } });
        fireEvent.click(addButton);

        // Eliminar nota
        const deleteButton = screen.getByRole("button", { name: /eliminar/i });
        fireEvent.click(deleteButton);

        // Verificar que ya no está en el DOM
        expect(screen.queryByText("Nota a eliminar")).not.toBeInTheDocument();
    });

});