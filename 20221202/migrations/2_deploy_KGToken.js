const KGToken = artifacts.require('KGToken');

module.exports = function(deployer){
    deployer.deploy(KGToken,"KGToken","KTK",10000);
}