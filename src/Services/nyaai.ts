/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export class Nyaai {
    private apiEndpoint: string;
    private headers: any;

    constructor() {
        this.apiEndpoint = "https://api.nya.la";
        this.headers = {
            accept: "*/*",
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua":
                '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            Referer: "https://ai.nya.la/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        };
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /* Login */
    public async login(): Promise<{ accessToken: string }> {
        try {
            const url = this.apiEndpoint;
            return await this.wrapFetch(
                url + "/user/login",
                {
                    key: "6HzwaRaxuZmPxRKJYOIE5rxnZN8wdPiqgWupUVt2KHB4EjVA4E__URS3xSkI60jy",
                },
                this.headers
            );
        } catch (error: any) {
            throw new Error(`login Error: ${error.message}`);
        }
    }

    /* Generate Image */
    public async generateImage(input: string, authorization: string): Promise<{ imageBase64: string }> {
        try {
            const url = this.apiEndpoint;
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

            const response = await this.wrapFetch(
                url + "/ai/generate-image",
                body,
                {
                    ...this.headers,
                    "authorization": `Bearer ${authorization}`,
                }
            );

            return { imageBase64: response.substr(27, response.length) };
        } catch (error: any) {
            throw new Error(`generateImage Error: ${error.message}`);
        }
    }

    /* Wrap */
    private async wrapFetch(
        url: string,
        body: any,
        headers: any
    ): Promise<any> {
        try {
            const res = await axios.post(url, body, headers);
            const data = await res.data;
            return data;
        } catch (error: any) {
            throw new Error(`Failed to fetch: ${error.message}`);
        }
    }
}