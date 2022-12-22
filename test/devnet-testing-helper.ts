import { starknet } from "hardhat";
import fs from "fs";
import { PredeployedAccount } from "@shardlabs/starknet-hardhat-plugin/dist/src/devnet-utils";
import { OpenZeppelinAccount } from "@shardlabs/starknet-hardhat-plugin/dist/src/account";
import { StarknetContract } from "hardhat/types";

type DevnetHelper = {
  accounts: PredeployedAccount[];
};

let _devnetHelperConf: DevnetHelper;

/**
 * Returns stuff to help with testing on Devnet
 * @returns {Promise<DevnetHelper>}x
 */
export async function devnetHelperConfWithFS(
  clearCache?: boolean
): Promise<DevnetHelper> {
  const confCachePath = __dirname + "/../cache/starknet-devnet-helper.json";
  let config: DevnetHelper;

  const reloadHelperConf = async () => {
    config = {
      accounts: await starknet.devnet.getPredeployedAccounts(),
    };
    fs.writeFileSync(confCachePath, JSON.stringify(config), { flag: "w" });
    return config;
  };

  if (clearCache || !fs.existsSync(confCachePath)) {
    return await reloadHelperConf();
  } else {
    const _configBuffer = fs.readFileSync(confCachePath);
    return JSON.parse(_configBuffer.toString());
  }
}

/**
 * Returns stuff to help with testing on Devnet
 * @returns {Promise<DevnetHelper>}x
 */
export async function devnetHelperConf(
  clearCache?: boolean
): Promise<DevnetHelper> {
  const confCachePath = __dirname + "/../cache/starknet-devnet-helper.json";

  if (!_devnetHelperConf) {
    _devnetHelperConf = {
      accounts: await starknet.devnet.getPredeployedAccounts(),
    };
  }

  return _devnetHelperConf;
}

export async function getAccount(index = 0): Promise<OpenZeppelinAccount> {
  const { accounts } = await devnetHelperConf();
  const { address, private_key } = accounts[index];
  return await starknet.OpenZeppelinAccount.getAccountFromAddress(
    address,
    private_key
  );
}

export async function deployContract(
  name: string,
  constructorArgs: any = {}
): Promise<StarknetContract> {
  const account = await getAccount();
  const contractFactory = await starknet.getContractFactory(name);
  await account.declare(contractFactory);

  const options = { maxFee: 9e18 };
  // implicitly invokes UDC
  return await account.deploy(contractFactory, constructorArgs, options);
}
