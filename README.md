# Sample Starknet Hardhat Project

This is minimalistic plug and play template for Hardhat Starknet projects.

## What's changed?

### `starknet-compile` before tests

Shows compile errors and generates artifacts when you run tests.
```
"pretest": "hardhat starknet-compile --disable-hint-validation"
```

### Easy tests
Default network is integrated-devnet with pretest compiling. Just do,

```sh
npm run test
```

It runs your contract on integrated devnet and includes utils to grab prefunded accounts. See [devnet-testing-helper.ts file](test/devnet-testing-helper.ts).

### Fast tests with devnet

To have the tests run faster, use a local devnet and not the integrated devnet. Using integrated devnet with hardhat starknet needs spinning up and stopping docker containers for every compile and test. For my tests using separate devnet running in docker drops testing time to 8 seconds from 36 seconds!

When you have local `devnet` use this,

```
npm run devnet-test
```

### Fast compiling with local venv

Use local Cairo venv for compiling to avoid spending time spinning up and stopping compiling docker containers. After setting up your [Cairo environment](https://www.cairo-lang.org/docs/quickstart.html) edit hardhat config to point to your local venv. For my test with two contracts, it went down from 17 seconds down to 5 seconds.

In your `./hardhat.config.ts` file,
```diff
  starknet: {
    network: "integrated-devnet",
+    venv: "~/cairo_venv", // Change ~/cairo_venv to your cairo venv location
  ...
```
