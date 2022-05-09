# Ontario.ca Service Integration: Jamstack Application Toolkit

## About the Jamstack Approach

"Jamstack" refers to an approach to developing web applications based on decoupled patterns. [Jamstack.org](https://jamstack.org/) is a good starting point for learning about this pattern.

## About this Toolkit

This toolkit provides a straightforward starter template for building Jamstack-style applications that conform to the requirements for integration with [Ontario.ca](https://ontario.ca). Specifically, it focuses on providing a quick means of getting started building a statically-served web front end that can be enriched by back-end APIs.

The separate [Jamstack backing services](https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-backing-services) project provides some example back-end services to demonstrate various patterns.

### Tech Used and Rationale

We have tried to be relatively framework neutral in our choices, in order to provide a skeleton that can be supplemented if necessary with a team's front-end framework of choice.

Specifically:
* We use the [Eleventy](https://www.11ty.dev/) static site generator for handling composition and build
* We use the lightweight [Alpine.js](https://alpinejs.dev/) framework or plain Javascript for any Javascript usage
* We use the work of the [Ontario Design System](https://designsystem.ontario.ca/) to allow the quick construction of applications that match the [Ontario.ca](http://ontario.ca/) look and feel guidelines

## Prerequisites and Installation

[Node.js](https://nodejs.org/en/) must be installed.

From a fresh checkout, `npm install` will install all dependencies.

## Using as the Base for a New Project

At this time, we recommend the following steps:
* `git clone` the project
* Delete the `.git` folder to remove the history
* Initiate your version control of choice - `git init` if using git

## Development

### Serving and Rebuilding the Application

`npm run serve` will serve the generated application locally, updating and rebuilding as changes are made - the generated files will appear in the `dist` directory.

### French Translation

This product implements a simple but functional approach to presenting content in both official languages that parallels the URL structure of `Ontario.ca`:

* English-language pages should go in the root of `src`
* The equivalent French-language page should go in `src/fr`, with the same filename, and include `lang: fr` in its [front matter](https://www.11ty.dev/docs/data-frontmatter/)

Appropriate headers and footers will then be used, and a language switcher link generated between the two different page versions in English and French.

### Custom Header Tags

### Automated Tests

* `test/test.js` has some simple tests using Mocha to check the app is being built as expected
* The tests can be run at any time with `npm test`

### HTML Validation

* You can validate the source `.njk` files using `npm run htmlValidateSrc`
* You can validate the built `.html` files using `npm run htmlValidateDist`
* Any files in the `vendor` directory are ignored when validating
* The validator configuration is in `.htmlvalidate.json`

### Git Hooks

* This project uses [`pre-commit`](https://pre-commit.com/) to manage its [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). After installing `pre-commit` on your system, use the following to install the project's hooks.
    * `pre-commit autoupdate`
    * `pre-commit install`
    * `pre-commit install --hook-type prepare-commit-msg`

## Deployment

`npm run build` will generate the application in the `dist` directory (after removing it to ensure a clean build) - this directory can then be deployed to a suitable hosting environment for serving static content.

### Environment Variables

For values that need to differ between environments, the [basic approach described in the Eleventy documentation has been used](https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables) has been used. This lets you do the following:
* when building: `ELEVENTY_ENV=stage npm run build` - sets the build environment to `stage` or another value
* in templates: `{{ globals.environment }}` to access the supplied value of `ELEVENTY_ENV` (defaults to `development` if no value supplied)
* in `_data/globals.js`: use the `env` value in `module.exports` to implement environment-differentiated variables or functions to supply to your templates
    * The `userFriendlyEnvString` values provides a simple example of how to do this