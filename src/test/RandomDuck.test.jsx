import 'dotenv/config';
import fetch from "node-fetch";

describe("RandomDuck API", () => {
    test("debería devolver status 200", async () => {
        const apiBase = process.env.VITE_BACK_URL;
        if (!apiBase) throw new Error("No se definió VITE_BACK_URL");

        const response = await fetch(`${apiBase}/patos/random`);
        expect(response.ok).toBe(true);
        expect(response.status).toBe(200);
    });
});
