var env = process.env.ELEVENTY_ENV || "development";

module.exports = function() {
  return {
    designSystemRoot: "/assets/vendor/ontario-design-system",
    environment: env
  }
}