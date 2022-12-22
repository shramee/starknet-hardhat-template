# Sample Starknet Hardhat Project

This is minimalistic plug and play template for Hardhat Starknet projects.

## What's included?

### `starknet-compile` before tests

> ~~StarknetPluginError: Could not find JSON artifact for "...cairo". Consider recompiling your contracts.~~

```
package.json
...
"pretest": "hardhat starknet-compile"
...
```

### Easy tests

Just do,

```sh
npm test
```

It runs your contract on devnet and includes utils to grab prefunded accounts. See [devnet-testing-helper.ts file](test/devnet-testing-helper.ts).

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test --starknet-network integrated-devnet
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
