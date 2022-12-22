import { HardhatUserConfig } from "hardhat/config";
import "@shardlabs/starknet-hardhat-plugin";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  starknet: {
    network: "integrated-devnet",
    // Use this venv for faster compiling
    venv: "~/cairo_venv",
  },
  networks: {
    devnet: {
      url: "http://127.0.0.1:5050",
    },
    integratedDevnet: {
      url: "http://127.0.0.1:5051",
      args: ["--port", "5051"],
      stdout: "logs/stdout.log",
      stderr: "logs/stderr.log",
    },
  },
};

export default config;
