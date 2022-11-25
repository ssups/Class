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
