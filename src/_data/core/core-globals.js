module.exports = function() {

    var env = process.env.ELEVENTY_ENV || "dev";

    // Relative to assetsRoot (see app-globals.js)
    var designSystemPath = "/vendor/ontario-design-system";

      return {
          designSystemPath: designSystemPath,
          env: env
      }
}