<h1 align="center">Welcome to nyaai-sdk 👋</h1>

[![npm version](https://badge.fury.io/js/nyaai.svg)](https://badge.fury.io/js/nyaai) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![npm](https://img.shields.io/npm/dw/nyaai.svg)

> ai.nya.la SDK for Typescript

### 🏠 [Homepage](https://github.com/sweatpotato13/nyaai-sdk)

## Install

```sh
npm i nyaai
yarn add nyaai
```

## Run tests

```sh
yarn test
```

## Usage

```ts
import fs from "fs";
import { Nyaai } from "nyaai";

async function main() {
    const nyaai = new Nyaai();
    const accessToken = await (await nyaai.login()).accessToken;
    const data = await nyaai.generateImage(
        "mastrpieece, best quality",
        accessToken
    );
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

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sweatpotato13/nyaai-sdk/issues).

## Show your support

Give a ⭐️ if this project helped you!
