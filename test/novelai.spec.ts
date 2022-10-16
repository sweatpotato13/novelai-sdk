import { NovelAi } from "../src/index";
import axios from "axios";

jest.setTimeout(300000);
jest.mock("axios");

describe("novelai-sdk Test", () => {
    let accessToken: string;
    
    test("login", async () => {
        const resp = {
            data: {
                accessToken: "accessToken",
            },
        };
    
        (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(
            resp
        );

        const novelAi = new NovelAi();
        const response = await novelAi.login("?", "?");
        accessToken = response.accessToken;
        expect(response.accessToken).toBeDefined();
    });

    test("generate-image", async () => {
        const resp = {
            data: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
        };
    
        (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(
            resp
        );

        const novelAi = new NovelAi();
        const response = await novelAi.generateImage("masterpiece", accessToken);
        expect(response.imageBase64).toBeDefined();
    });
});
