module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      networkId: "*",
    },
  },

  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
