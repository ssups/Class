module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9005,
      network_id: "*",
      websockets: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, //가나쉬 포트번호
      network_id: "*",
      websockets: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
