module.exports = function() {

    var userFriendlyEnvString = {
        dev: "development",
        stage: "staging",
        prod: "production"
      };

    var useApplicationHeader = false;

      return {
          userFriendlyEnvString: userFriendlyEnvString,
          useApplicationHeader: useApplicationHeader
      }
}