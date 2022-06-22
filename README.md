# Ontario.ca Service Integration: Jamstack Application Toolkit

## Release History

- 0.10.0 (2022-06-22): Total refactoring of header to take advantage of locale features and eliminate the need for separate English and French templates
- 0.9.0 (2022-06-06): New `_main_content.njk` file in `src/_includes/app` to allow customization of main content area outside of `core`
- 0.8.2 (2022-06-06): Make page content full-height even when content is short
- 0.8.1 (2022-06-06): Fix a bug related to some files being encoded `UTF-8 with BOM` instead of just `UTF-8`
- 0.8.0 (2022-06-01): Add the `prettier` code formatter
- 0.7.0 (2022-05-30): Enhance localeStrings to allow nesting of keys for better content organization, and to allow markdown in the localeStrings. README.md contains more details.
- 0.6.0 (2022-05-20): Added `update-jamstack-toolkit.sh` script
- 0.5.0 (2022-05-19): Moved site root configuration into `src/_data/app/app-globals.js` from `src/_data/core/core-globals.js`
- 0.4.0 (2022-05-17): Add option to use the application header from the Ontario Design System instead of the main Ontario.ca website header

## About the Jamstack Approach

"Jamstack" refers to an approach to developing web applications based on decoupled patterns. [Jamstack.org](https://jamstack.org/) is a good starting point for learning about this pattern.

## About this Toolkit

This toolkit provides a straightforward and flexible starting point for building Jamstack applications that conform to the requirements for integration with [Ontario.ca](https://ontario.ca). Specifically, it focuses on providing a quick means of getting started building a statically-served web front end that can be enriched by back-end APIs.

The separate [Jamstack backing services](https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-backing-services) project provides some example back-end services to demonstrate various patterns.

Existing applications built with the toolkit include:

- Public Sector Salary Disclosure

### Tech Used and Rationale

We have tried to be relatively framework neutral in our choices, in order to provide a skeleton that can be supplemented if necessary with a team's front-end framework of choice.

Specifically:

- We use the [Eleventy](https://www.11ty.dev/) static site generator for handling composition and build
- We use the lightweight [Alpine.js](https://alpinejs.dev/) framework or plain Javascript for any Javascript usage
- We use the work of the [Ontario Design System](https://designsystem.ontario.ca/) to allow the quick construction of applications that match the [Ontario.ca](http://ontario.ca/) look and feel guidelines

## Prerequisites and Installation

[Node.js](https://nodejs.org/en/) must be installed.

From a fresh checkout, `npm install` will install all dependencies.

## Using as the Base for a New Project

At this time, we recommend the following steps:

- `git clone` the project
- Delete the `.git` folder to remove the history
- `git init` and make an initial commit
  - Note that the use of `git Last Modified` for page dates (see below under **Publication and Updated Dates for Pages**) means the example site will fail to build without an initial commit. Change the use of `git Last Modified` in the page date if you need to work without git or with another version control system.

### Updating Your Project from Future Development of the Jamstack Application Toolkit

You can use the `update-jamstack-toolkit.sh` script to pull in certain changes from the Jamstack Application toolkit repo. Specifically, this script will update:

- Any `core` files in `src` - see **Modifying Code, Components, and Styles** for more details
- The `src/assets/vendor` directory that contains the Ontario Design System files and other third-party dependencies

You should [refer to the Jamstack Application Toolkit repo](https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit) for available release tags and modify the script to use the appropriate one using the `tag` variable.

## Development

### Serving and Rebuilding the Application

`npm run serve` will serve the generated application locally, updating and rebuilding as changes are made - the generated files will appear in the `dist` directory.

### Modifying Code, Components, and Styles

The project divide resources into `core` and `app` directories in various places.

- Avoid modfiying `core` files if you want an easier process of bringing in future improvements from new versions of the toolkit
- `app` files are starting points for customizations your own product will need, especially when intersecting with `core` components
  - `src/_includes/app/_head_custom.njk` allows the insertion of additional tags into the `<head>` portion of your templates
  - `src/_includes/app/_main_content.njk` allows you to customize layout and otherwise in the main content area between the standard Ontario Design System header and footer components

### Setting the Header Style

You can set your application to use either the Ontario.ca main website header or the Ontario application header used for applications and subsites outside of the main website using the `useApplicationHeader` boolean option in `src/_data/app/app-globals.js`

For full details on the two header styles available in the Ontario Design System, consult these two pages:

- [Ontario.ca header](https://designsystem.ontario.ca/components/detail/ontario-header.html) - _mandatory for all pages that are part of the main ontario.ca website_
- [Application header](https://designsystem.ontario.ca/components/detail/application-header.html) - _for applications and subsites outside of the main ontario.ca website_

If you need to set the `useApplicationHeader` option only for specific pages, you can specify it in the YAML front matter of the page:

> `useApplicationHeader: true`

#### Links in the Design System Application Subheader

Link text and URLs for the application menu can be configured using the locale file `/src/_data/app/app-locale-strings.js`, under the `applicationHeader.navMenu` key.

### Translation

The toolkit includes features to support building in both official languages of Ontario.ca.

#### Translating Pages

The simplest way of maintaining parallel English and French pages is to maintain two pages that reference each other through their front matter.

- In an English language page, `fr_page_url` should be a reference to the URL of the parallel French language page.
- In a French language page, `en_page_url` should be a reference to the URL of the parallel French language page. All French language pages should also contain `lang: fr` in their front matter.

This structure above allows the language switcher link to be appropriately generated in the header when building the site.

#### Maintaining Locale Files

Maintenance is much easier when content is separate from presentation and code, so we abstract out the content.

Content is added to `src/_data/localeStrings.json` and the localized string gets injected into the page with a custom filter, `localeString`, according to the current page language.

Content can be organized using nested keys. As seen below, you can group by page, section, element, and so-forth.

```json
{
  "homePage": {
    "title": {
      "en": "Home Page",
      "fr": "Page d'accueil"
    }
  }
}
```

To inject the content into your template, use the `localeString` filter:

```html
<h2>{{ "homePage.title" | localeString}}</h2>
```

To keep things clean, especially when dealing with images and links, markup can be added to the content file using two additional filters: `markdown` and `safe`. Using the `safe` filter sanitizes the markdown.

```json
"welcome": {
          "en": "Welcome to the Ontario.ca <a href=\"https://jamstack.org/\">Jamstack</a> Application Toolkit.",
          "fr": "Bienvenue à la trousse d'outils d'application <a href=\"https://jamstack.org/\">Jamstack</a> d'Ontario.ca."
        },
}
```

```html
<p>{{ "homePage.welcome" | localeString | markdown | safe}}</p>
```

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

- `test/test.js` has some simple tests using Mocha to check the app is being built as expected
- The tests can be run at any time with `npm test`

### HTML Validation

- You can validate the source `.njk` files using `npm run htmlValidateSrc`
- You can validate the built `.html` files using `npm run htmlValidateDist`
- Any files in the `vendor` directory are ignored when validating
- The validator configuration is in `.htmlvalidate.json`

### Git Hooks

- This project uses [`pre-commit`](https://pre-commit.com/) to manage its [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). After installing `pre-commit` on your system, use the following to install the project's hooks.
  - `pre-commit autoupdate`
  - `pre-commit install`
  - `pre-commit install --hook-type prepare-commit-msg`

### Prettier

Prettier is an opinionated code formatter that ensures all outputted code confrms to our consistent style. We have an accepted common style guide and this tool allows us to automate it. This allows us to avoid style discussions, unneccessary code review discussions on style, and separate the responsible of formatting from the linter. It is also very useful for new team members who may be used to other styles.

- Format all files: `npx prettier --write .`
- Format files in a directory: `npx prettier --write src/_data/`
- Format a specific file: `npx prettier --write src/_data/app/eleventyComputed.js`
- Check that things are formatted without overwriting: `npx pretter --check .`

- **Integrate with Visual Studio Code** by installing the extension `prettier-vscode`, "Prettier - Code Formatter"
- Ignore the next node in the abstract syntax tree from formatting
  - JS - `// prettier-ignore` comment above
  - NJK - `<!-- prettier ignore -->` or `<!-- prettier-ignore-attribute -->`
  - NJK - `{{! prettier-ignore }}`
  - CSS - `/* prettier-ignore */`

## Deployment

`npm run build` will generate the application in the `dist` directory (after removing it to ensure a clean build) - this directory can then be deployed to a suitable hosting environment for serving static content.

### Environment-Dependent Variables

For values that need to differ between environments, the [basic approach described in the Eleventy documentation has been used](https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables) has been used. This lets you do the following:

- when building: `ELEVENTY_ENV=stage npm run build` - sets the build environment to `stage` or another value
- in templates: `{{ globals.environment }}` to access the supplied value of `ELEVENTY_ENV` (defaults to `development` if no value supplied)
- in `_data/globals.js`: use the `env` value in `module.exports` to implement environment-differentiated variables or functions to supply to your templates
  - The `userFriendlyEnvString` values provides a simple example of how to do this

### Site Root Configuration

Jamstack sites deployed to Ontario.ca will need to configure a site root based on their deployment subfolder. The `siteRootEnvs` object in `src/_data/app/app-globals.js` can be used for these purposes.

### Build Output Configuration

Eleventy can be configured to build site outputs that are different from the source input by modifying options in the `.eleventy.js` configuration file. The default state of the toolkit shows some examples of this approach that aligns with deploying Jamstack sites to Ontario.ca:

- The `addPassthroughCopy` statement copies the root-level `assets` folder in `src` to the `jamstack-toolkit` folder of the built site
- The `assetsRoot` variable from `src/_data/globals.js` is used to reference the build location of the assets folder in the templates

This configuration simplifies deployment to Ontario.ca by requiring only two routes to be configured, one for each language, with an assets directory shared between the two.
