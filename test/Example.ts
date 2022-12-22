import { starknet } from "hardhat";
import { expect } from "chai";
import { getAccount } from "./devnet-testing-helper";

describe("Example contract", async () => {
  it("declare and deploy", async () => {
    const account = await getAccount();
    const contractFactory = await starknet.getContractFactory("Example");
    const classHash = await account.declare(contractFactory);

    // two ways to obtain the class hash
    expect(classHash).to.equal(await contractFactory.getClassHash());

    const constructorArgs = {};
    const options = { maxFee: 9e16 };
    // implicitly invokes UDC
    const contract = await account.deploy(
      contractFactory,
      constructorArgs,
      options
    );
  });
});
