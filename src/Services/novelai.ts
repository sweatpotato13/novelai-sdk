/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { calcAccessKey } from "../utils";

const modelMap = {
    safe: 'safe-diffusion',
    nai: 'nai-diffusion',
    furry: 'nai-diffusion-furry',
} as const

const resolutionMap = {
    landscape: { height: 512, width: 768 },
    portrait: { height: 768, width: 512 },
    square: { height: 640, width: 640 },
} as const

const samplingMap = {
    k_euler_ancestral: "k_euler_ancestral",
    k_euler: "k_euler",
    k_lms: "k_lms",
    plms: "plms",
    ddim: "ddim"
} as const

type Model = keyof typeof modelMap
type Resolution = keyof typeof resolutionMap
type Sampling = keyof typeof samplingMap

export class NovelAi {
    private apiEndpoint: string;
    private headers: any;

    constructor() {
        this.apiEndpoint = "https://api.novelai.net";
        this.headers = {
            "content-type": "application/json",
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
    public async generateImage(authorization: string, params: { input: string, model?: Model, resolution?: Resolution, sampling?: Sampling, seed?: number }): Promise<{ imageBase64: string }> {
        try {
            const { input, model, seed, resolution, sampling } = params;
            const modelValue = modelMap[model];
            const resolutionValue = resolutionMap[resolution];
            const samplingValue = samplingMap[sampling];

            const url = this.apiEndpoint;
            const body = {
                input: input,
                model: model ? modelValue : "safe-diffusion",
                parameters: {
                    width: resolution ? resolutionValue.width : 512,
                    height: resolution ? resolutionValue.height : 768,
                    scale: 12,
                    sampler: sampling ? samplingValue : "k_euler_ancestral",
                    steps: 28,
                    seed: seed ? seed : this.getRandomInt(1, 2100000000),
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
