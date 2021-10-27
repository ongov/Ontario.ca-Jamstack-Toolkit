# Ontario.ca Service Integration: Static Application Toolkit

## Getting Started

[Node.js](https://nodejs.org/en/) must be installed.

From a fresh checkout, `npm install` will install all dependencies.

### Local Development

`npm run serve` will serve the generated static site locally, updating and rebuilding as changes are made - the generated files will appear in the `dist` directory.

### Deployment

`npm run build` will generate static site in the `dist` directory (after removing it to ensure a clean build) - this directory can then be deployed to a suitable static hosting environment.