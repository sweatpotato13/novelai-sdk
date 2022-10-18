<h1 align="center">Welcome to novelai-sdk 👋</h1>

[![npm version](https://badge.fury.io/js/novelai.svg)](https://badge.fury.io/js/novelai) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![npm](https://img.shields.io/npm/dw/novelai.svg)

> novelAI SDK for Typescript

### 🏠 [Homepage](https://github.com/sweatpotato13/novelai-sdk)

## Install

```sh
npm i novelai
yarn add novelai
```

## Run tests

```sh
yarn test
```

## Usage

```ts
import fs from "fs";
import { NovelAi } from "novelai";

async function main() {
    const novelAi = new NovelAi();
    const accessToken = await (
        await novelAi.login("email", "password")
    ).accessToken;
    const data = await novelAi.generateImage(accessToken, {
        input: "masterpiece",
        model: "safe",
        resolution: "landscape",
        sampling: "k_euler_ancestral",
        seed: 1,
    });
    const buffer = Buffer.from(data.imageBase64, "base64");
    fs.writeFileSync("new-path.jpg", buffer);
    console.log("done");
}

main();
```

## Author

👤 **CuteWisp <sweatpotato13@gmail.com>**

-   Website: Cutewisp.com
-   Github: [@sweatpotato13](https://github.com/sweatpotato13)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sweatpotato13/novelai-sdk/issues).

## Show your support

Give a ⭐️ if this project helped you!
