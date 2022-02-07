# Ontario.ca Service Integration: Jamstack Application Toolkit

## About the Jamstack Approach

"Jamstack" refers to an approach to developing web applications based on decoupled patterns. [Jamstack.org](https://jamstack.org/) is a good starting point for learning about this pattern.

## About this Toolkit

This toolkit provides a straightforward starter template for building Jamstack-style sites that conform to the requirements for integrationwith [Ontario.ca](https://ontario.ca).

## Prerequisites

[Node.js](https://nodejs.org/en/) must be installed.

From a fresh checkout, `npm install` will install all dependencies.

## Local Development

`npm run serve` will serve the generated site locally, updating and rebuilding as changes are made - the generated files will appear in the `dist` directory.

### Automated Tests

* `test/test.js` has some simple tests using Mocha to check the site is being built as expected.
* The tests can be run at any time with `npm test`

### HTML Validation

* You can validate the source `.njk` files using `npm run htmlValidateSrc`
* You can validate the built `.html` files using `npm run htmlValidateDist`
* Any files in the `vendor` directory are ignored when validating
* The validator configuration is in `.htmlvalidate.json`

### Git Hooks

* This project uses [`pre-commit`](https://pre-commit.com/) to manage needed hooks. After installing `pre-commit` on your system, use the following to install the project's hooks.
    * `pre-commit autoupdate`
    * `pre-commit install`
    * `pre-commit install --hook-type prepare-commit-msg`

## Deployment

`npm run build` will generate site in the `dist` directory (after removing it to ensure a clean build) - this directory can then be deployed to a suitable hosting environment for serving static sites.