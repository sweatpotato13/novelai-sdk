/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { calcAccessKey } from "../utils";

export class NovelAi {
    private apiEndpoint: string;
    private headers: any;

    constructor() {
        this.apiEndpoint = "https://api.novelai.net";
        this.headers = {
            "accept": "*/*",
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua":
                '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://api.novelai.net/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        };
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /* Login */
    public async login(email: string, password: string): Promise<{ accessToken: string }> {
        try {
            const accessKey = await calcAccessKey(email, password);
            const url = this.apiEndpoint;
            const response = await axios.post(
                url + "/user/login",
                {
                    key: accessKey,
                },
                {
                    headers: this.headers
                }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(`login Error: ${error.message}`);
        }
    }

    /* Generate Image */
    public async generateImage(input: string, authorization: string): Promise<{ imageBase64: string }> {
        try {
            const url = "https://backend-production-svc.novelai.net/ai/generate-image";
            const body = {
                input,
                model: "safe-diffusion",
                parameters: {
                    width: 512,
                    height: 768,
                    scale: 12,
                    sampler: "k_euler_ancestral",
                    steps: 28,
                    seed: this.getRandomInt(1, 2100000000),
                    n_samples: 1,
                    ucPreset: 0,
                    uc: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
                },
            };
            const response = await axios.post(
                url + "/ai/generate-image",
                body,
                {
                    headers: {
                        ...this.headers,
                        "authorization": `Bearer ${authorization}`,
                    }
                }
            );

            return { imageBase64: response.data.substr(27, response.data.length) };
        } catch (error: any) {
            throw new Error(`generateImage Error: ${error.message}`);
        }
    }
}
