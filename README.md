# Ontario.ca Service Integration: Jamstack Application Toolkit

## Release History

* 0.4.0 (2022-05-17): Add option to use the application header from the Ontario Design System instead of the main Ontario.ca website header

## About the Jamstack Approach

"Jamstack" refers to an approach to developing web applications based on decoupled patterns. [Jamstack.org](https://jamstack.org/) is a good starting point for learning about this pattern.

## About this Toolkit

This toolkit provides a straightforward and flexible starting point for building Jamstack applications that conform to the requirements for integration with [Ontario.ca](https://ontario.ca). Specifically, it focuses on providing a quick means of getting started building a statically-served web front end that can be enriched by back-end APIs.

The separate [Jamstack backing services](https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-backing-services) project provides some example back-end services to demonstrate various patterns.

Existing applications built with the toolkit include:
* Public Sector Salary Disclosure

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
* `git init` and make an initial commit
    * Note that the use of `git Last Modified` for page dates (see below under **Publication and Updated Dates for Pages**) means the example site will fail to build without an initial commit. Change the use of `git Last Modified` in the page date if you need to work without git or with another version control system.

## Development

### Serving and Rebuilding the Application

`npm run serve` will serve the generated application locally, updating and rebuilding as changes are made - the generated files will appear in the `dist` directory.

### Modifying Code, Components, and Styles

The project divide resources into `core` and `app` directories in various places.

* Avoid modfiying `core` files if you want an easier process of bringing in future improvements from new versions of the toolkit
* `app` files are starting points for customizations your own product will need, especially when intersecting with `core` components
    * Example: `src/_includes/app/_head_custom.njk` allows the insertion of additional tags into the `<head>` portion of your templates.

### Setting the Header Style

You can set your application to use either the Ontario.ca main website header or the Ontario application header used for applications and subsites outside of the main website using the `useApplicationHeader` boolean option in `src/_data/app/app-globals.js`

For full details on the two header styles available in the Ontario Design System, consult these two pages:
* [Ontario.ca header](https://designsystem.ontario.ca/components/detail/ontario-header.html) - *mandatory for all pages that are part of the main ontario.ca website*
* [Application header](https://designsystem.ontario.ca/components/detail/application-header.html) - *for applications and subsites outside of the main ontario.ca website*

### Translation

The toolkit includes features to support building in both official languages of Ontario.ca.

#### Translating Pages

The simplest way of maintaining parallel English and French pages is to maintain two pages that reference each other through their front matter.

* In an English language page, `fr_page_url` should be a reference to the URL of the parallel French language page.
* In a French language page, `en_page_url` should be a reference to the URL of the parallel French language page. All French language pages should also contain `lang: fr` in their front matter.

This structure above allows the language switcher link to be appropriately generated in the header when building the site.

#### Maintaining Locale Files

You can create localization strings for shared components or similar uses in `src/_data/localeStrings.json`, which can then be referred to in page templates using the `localeString` filter: `{{ "[key]" | localeString}}`. This filter will insert the appropriate localized string for the key based on the current page language.

### Custom Head Tags

Insert any needed custom tags for the `<head></head>` portion of the site layout in `src/_includes/core/_head_custom.njk`.

### Publication and Updated Dates for Pages

The default layout includes a component to make handling publication and updated dates for pages easier that matches the style of pages published with the Ontario.ca CMS.

Any pages using it should include the following in their YAML front matter:

```
date: git Last Modified
published_date: {YYYY-MM-DD formatted date for initial publication}
```

By using `git Last Modified`, pages will receive their update time from Git version control when the application is built. [This feature is described in more detail in Eleventy's documentation](https://www.11ty.dev/docs/dates/#setting-a-content-date-in-front-matter).

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

### Environment-Dependent Variables

For values that need to differ between environments, the [basic approach described in the Eleventy documentation has been used](https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables) has been used. This lets you do the following:
* when building: `ELEVENTY_ENV=stage npm run build` - sets the build environment to `stage` or another value
* in templates: `{{ globals.environment }}` to access the supplied value of `ELEVENTY_ENV` (defaults to `development` if no value supplied)
* in `_data/globals.js`: use the `env` value in `module.exports` to implement environment-differentiated variables or functions to supply to your templates
    * The `userFriendlyEnvString` values provides a simple example of how to do this

### Site Root Configuration

Jamstack sites deployed to Ontario.ca will need to configure a site root based on their deployed subfolder. The `siteRootEnvs` object in `src/_data/globals.js` can be used for these purposes.

### Build Output Configuration

Eleventy can be configured to build site outputs that are different from the source input by modifying options in the `.eleventy.js` configuration file. The default state of the toolkit shows some examples of this approach that aligns with deploying Jamstack sites to Ontario.ca:

* The `addPassthroughCopy` statement copies the root-level `assets` folder in `src` to the `jamstack-toolkit` folder of the built site
* The `assetsRoot` variable from `src/_data/globals.js` is used to reference the build location of the assets folder in the templates

This configuration simplifies deployment to Ontario.ca by requiring only two routes to be configured, one for each language, with an assets directory shared between the two.