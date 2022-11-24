const solc = require("solc");
// fs-extra : node fs 모듈에 없는 추가적인 file 시스템 함수를 사용할수 있다. (fs 확장팩 같은 느낌)
const fs = require("fs-extra");
const path = require("path");

class Contract {
  static compile(_filename) {
    const contractPath = path.join(__dirname, "../contracts", _filename);
    const source = fs.readFileSync(contractPath, "utf8");
    let solcInput = {
      language: "Solidity",
      sources: {
        contract: {
          content: source,
        },
      },
      settings: {
        optimizer: {
          enabled: true,
        },
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    solcInput = JSON.stringify(solcInput);
    let contractObject = solc.compile(solcInput);
    // sol파일 컴파일해주는 함수 solc.compile()
    contractObject = JSON.parse(contractObject);
    // console.log(contractObject);

    for (const key in contractObject.contracts) {
      const contractName = "HelloWorld";
      const contract = contractObject.contracts[key][contractName];
      const abi = contract.abi;
      const bytecode = contract.evm.bytecode.object;
      const obj = { abi, bytecode };
      const _path = path.join(__dirname, "../upload", `${contractName}.json`);
      fs.outputJSONSync(_path, obj);
      return [abi, bytecode];
    }
  }

  static outObj(contractObject) {}
}
module.exports = { Contract };
