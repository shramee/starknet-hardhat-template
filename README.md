# Sample Starknet Hardhat Project

This is minimalistic plug and play template for Hardhat Starknet projects.

## What's included?

### Default network is integrated-devnet

### `starknet-compile` before tests

Shows compile errors and generates artifacts when you run tests.

```
"pretest": "hardhat starknet-compile --disable-hint-validation"
```

### Easy tests

Just do,

```sh
npm run test
```

It runs your contract on devnet and includes utils to grab prefunded accounts. See [devnet-testing-helper.ts file](test/devnet-testing-helper.ts).

### Fast tests with devnet

To have the tests run faster, use a local devnet and not the integrated devnet. Using integrated devnet with hardhat starknet needs spinning up and stopping docker containers for every compile and test. From 36 seconds to 8 seconds!

When you have local `devnet` use this,

```
npm run devnet-test
```

### Fast compiling with local venv

Use local Cairo venv for compiling to avoid spending time spinning up and stopping docker containers for each test/compile. After setting up your [Cairo environment](https://www.cairo-lang.org/docs/quickstart.html) edit hardhat config to point to your local venv. For 2 simple contracts, from 17 seconds down to 5 seconds.

```ts
  starknet: {
    network: "integrated-devnet",
    // Use this venv for faster compiling
    venv: "~/cairo_venv", // Change ~/cairo_venv to your cairo venv location
  ...
```
