var env = process.env.ELEVENTY_ENV || "dev";

module.exports = function() {

  var userFriendlyEnvString = {
    dev: "development",
    stage: "staging",
    prod: "production"
  }

  return {
    designSystemRoot: "/assets/vendor/ontario-design-system",
    environment: env,
    userFriendlyEnvString: userFriendlyEnvString[env]
  }
}