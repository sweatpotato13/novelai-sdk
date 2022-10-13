import { Nyaai } from "../src/index";

describe("nyaai-sdk Test", () => {
    let accessToken: string;

    test("login", async () => {
        const nyaai = new Nyaai();
        const response = await nyaai.login();
        accessToken = response.accessToken;
        expect(response.accessToken).toBeDefined();
    });

    test("generate-image", async () => {
        const nyaai = new Nyaai();
        const response = await nyaai.generateImage("masterpiece", accessToken);

        expect(response.imageBase64).toBeDefined();
    });
});
