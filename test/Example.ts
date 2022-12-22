import { starknet } from "hardhat";
import { expect } from "chai";
import { deployContract, getAccount } from "./devnet-testing-helper";
import { StarknetContract } from "hardhat/types";
import { OpenZeppelinAccount } from "@shardlabs/starknet-hardhat-plugin/dist/src/account";

describe("Example contract", async () => {
  let account: OpenZeppelinAccount, exampleContract: StarknetContract;
  before(async () => {
    account = await getAccount();
    exampleContract = await deployContract("Example");
  });

  it("add balance", async () => {
    const amountToAdd = 2356;
    const balancePre = await exampleContract.call("get_balance");
    await account.invoke(exampleContract, "increase_balance", {
      amount: amountToAdd,
    });
    const balancePost = await exampleContract.call("get_balance");
    console.log(balancePost.res - balancePre.res);

    expect(balancePost.res - balancePre.res).to.be.equal(BigInt(amountToAdd));
  });
});
