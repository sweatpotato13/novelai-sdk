import { Nyaai } from "../src/index";
import axios from "axios";

jest.mock("axios");

describe("nyaai-sdk Test", () => {
    test("login", async () => {
        expect("1").toBe("1");
    });
});
