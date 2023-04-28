/* eslint-disable-next-line */
function GlobalContent(contentKey, buildRequest, renderContent) {
  this.contentKey = contentKey;

  function throwFunctionDefinitionError(functionName) {
    throw new Error(`${functionName} function must be defined`);
  }

  /* eslint-disable operator-linebreak */
  this.buildRequest =
    buildRequest || throwFunctionDefinitionError('buildRequest');

  this.renderContent =
    renderContent || throwFunctionDefinitionError('renderContent');
  /* eslint-enable */

  this.activate = () => {
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
        // eslint-disable-next-line no-console
        console.error(
          `fetch() error: ${error} when trying to retrieve global content from ${globalContentRequest.url}; if developing locally, this may be an expected CORS error if attempting to fetch content from ontario.ca, ensure CORS is disabled in your browser session if you need to test global content retrival locally.`,
        );
      });
  };
}
