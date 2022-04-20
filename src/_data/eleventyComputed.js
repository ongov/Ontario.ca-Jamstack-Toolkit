var getPageLang = function(data) {
  return data.lang || "en";
}

module.exports = {
    // Solution for rootPath from https://github.com/11ty/eleventy/issues/648#issuecomment-663507116
    rootPath: function(data) {
      return data.page.url
        .split('/')
        .filter(function(x) {
          return x;
        })
        .map(function() {
          return '../';
        })
        .join('');
    },
    pageLang: getPageLang,
  }