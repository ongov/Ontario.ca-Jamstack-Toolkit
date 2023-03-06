function GlobalContent(contentKey, buildRequest, renderContent) {
  this.contentKey = contentKey;

  this.buildRequest =
    buildRequest ||
    function (contentkey) {
      throw new Error('buildRequest function must be defined');
    };

  this.renderContent =
    renderContent ||
    function (responseJson, contentKey) {
      throw new Error('renderContent function must be defined');
    };

  this.activate = function () {
    const globalContentRequest = this.buildRequest(this.contentKey);
    fetch(globalContentRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        this.renderContent(responseJson, contentKey);
      })
      .catch((error) => {
        console.log(
          `fetch() error: ${error} when trying to retrieve global content from ${globalContentRequest.url}; if developing locally, this may be an expected CORS error if attempting to fetch content from ontario.ca, ensure CORS is disabled in your browser session if you need to test global content retrival locally.`
        );
      });
  };
}

const buildContentRequestFromCMS = function (contentKey) {
  const globalContentUrl = `https://www.ontario.ca${contentKey}`;
  const globalContentRequest = new Request(globalContentUrl);
  return globalContentRequest;
};
