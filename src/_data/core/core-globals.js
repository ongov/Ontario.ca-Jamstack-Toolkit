module.exports = function() {

    var env = process.env.ELEVENTY_ENV || "dev";

    var siteRootEnvs = {
        dev: "",
        stage: "",
        prod: ""
      };

      var siteRoot = siteRootEnvs[env];

      var assetsRoot = siteRoot + "/jamstack-toolkit/assets";

      var designSystemRoot = assetsRoot + "/vendor/ontario-design-system"

      return {
          siteRoot: siteRoot,
          assetsRoot: assetsRoot,
          designSystemRoot: designSystemRoot,
          env: env
      }
}