module.exports = function() {

    var userFriendlyEnvString = {
        dev: "development",
        stage: "staging",
        prod: "production"
      };

      return {
          userFriendlyEnvString: userFriendlyEnvString,
      }
}