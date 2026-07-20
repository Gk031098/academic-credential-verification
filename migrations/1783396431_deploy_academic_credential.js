const AcademicCredential = artifacts.require("AcademicCredential");

module.exports = function (deployer) {
  deployer.deploy(AcademicCredential);
};