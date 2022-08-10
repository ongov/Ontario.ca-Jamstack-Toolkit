# Ontario.ca Service Integration: Jamstack Application Toolkit

[[_TOC_]]

## Release History

- 0.15.0 (2022-08-10): Add project starter automation to `jam-on.mjs`
- 0.14.0 (2022-07-21): Convert update script from shell to Node-based (`jam-on.mjs`)
- 0.13.0 (2022-07-15): Add documentation of the file structure, reorganize the example pages, add an example app-level component
- 0.12.0 (2022-07-12): Update to latest version of Ontario Design System
- 0.11.0 (2022-07-05): Total refactoring of footer to take advantage of locale features and eliminate the need for separate English and French templates, refactoring config files into `core` and `app` pattern
- 0.10.0 (2022-06-22): Total refactoring of header to take advantage of locale features and eliminate the need for separate English and French templates
- 0.9.0 (2022-06-06): New `_main_content.njk` file in `src/_includes/app` to allow customization of main content area outside of `core`
- 0.8.2 (2022-06-06): Make page content full-height even when content is short
- 0.8.1 (2022-06-06): Fix a bug related to some files being encoded `UTF-8 with BOM` instead of just `UTF-8`
- 0.8.0 (2022-06-01): Add the `prettier` code formatter
- 0.7.0 (2022-05-30): Enhance localeStrings to allow nesting of keys for better content organization, and to allow markdown in the localeStrings. README.md contains more details.
- 0.6.0 (2022-05-20): Added `update-jamstack-toolkit.sh` script
- 0.5.0 (2022-05-19): Moved site root configuration into `src/_data/app/app-globals.js` from `src/_data/core/core-globals.js`
- 0.4.0 (2022-05-17): Add option to use the application header from the Ontario Design System instead of the main Ontario.ca website header

## The Jamstack Application Architecture and Ontario.ca

The "Jamstack" approach to web applications is a modern architecture based on decoupled patterns. The user-facing parts of the application are deployed as client-side browser code and needed features that cannot be supported by client-side code are provided by back-end APIs. This allows user interfaces to be deployed using static web servers, cloud-based storage buckets, or specialized platforms such as [Netlify](https://www.netlify.com/).

The pattern emphasizes security, resilience, scale, and separation of concerns, and is well-suited to one of the main challenges of web development for Ontario.ca, which is to deliver a cohesive, best in class user experience while supporting the wide range of back-end systems, programming languages and approaches used throughout the Government of Ontario.

[Jamstack.org](https://jamstack.org/) is a good starting point for learning more about this pattern. In particular, we recommend you start by reading:

- [What is Jamstack](https://jamstack.org/what-is-jamstack/), a detailed overview of the architectural pattern
- [Why Jamstack?](https://jamstack.org/why-jamstack/), an explanation of the benefits of the pattern for areas including security, maintainability and developer experience

## About this Toolkit

This toolkit provides a straightforward and flexible starting point for building Jamstack applications meeting the requirements for integration with [Ontario.ca](https://ontario.ca). It focuses on providing a quick means to start building a statically-served web front end that can be enriched by back-end APIs.

The [Ontario Digital Service](https://www.ontario.ca/page/ontario-digital-service) actively uses the Jamstack Toolkit for our own application development for Ontario.ca. Deployed applications built with the toolkit include:

- [The 2021 Public Sector Salary Disclosure](https://www.ontario.ca/public-sector-salary-disclosure/2021/all-sectors-and-seconded-employees/)

### Technical Foundations of the Jamstack Toolkit

The toolkit is designed to integrate well with more complex client-side frameworks a delivery team may want to use, such as [Angular](https://angular.io/) or [React](https://reactjs.org/). We have therefore emphasized lightweight foundations and tried to avoid too many assumptions or framework dependencies. Specifically:

- We use the [Eleventy](https://www.11ty.dev/) static site generator for handling composition and build, and the [Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) templating language for building page templates, layouts and reusable components
- We use the work of the [Ontario Design System](https://designsystem.ontario.ca/) to allow the quick construction of applications that match the [Ontario.ca](http://ontario.ca/) guidelines for look and feel, behaviour, and overall user experience
- We use plain Javascript or the lightweight [Alpine.js](https://alpinejs.dev/) framework for any Javascript usage

### Learning to Use the Jamstack Toolkit

An understanding of modern browser-side technologies (HTML, CSS and Javascript) is a starting point for working with the Jamstack toolkit. It is also helpful to have experience in Javascript development generally using [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).

Because Eleventy is a major foundation of the toolkit, we [recommend Eleventy's documentation as a starting point](https://www.11ty.dev/docs/) for understanding Eleventy's conventions, and more generally the use of static site generators to precompile user interfaces. The toolkit follows Eleventy's default behaviour wherever possible.

## Prerequisites and Installation

[Node.js](https://nodejs.org/en/) must be installed.

From a fresh checkout, `npm install` will install all dependencies.

## Exploring the Examples

A fresh checkout contains some example pages and components that can give you more of a sense of how the toolkit works. These can be removed using the steps below under _Using as the Base for a New Project_.

## Using as the Base for a New Project

From a fresh checkout and after running `npm install`, you can use the `jam-on.mjs` command line tool to start a new project:

`node jam-on.mjs new`

This will:

- delete the local `.git` folder to remove the version control history
- remove various example files
- prompt you for the English and French-side subfolders to use for your app, create starter files based on your answers, and update the site configuration in other places

You can then use `git init` and make initial commit.

### Updating Your Project from Future Development of the Jamstack Application Toolkit

You can use the `jam-on.mjs` command line tool to pull in certain changes from the Jamstack Application toolkit repo, using this command:
`node jam-on.mjs update [desired tag or branch]`

Specifically, this script will update:

- Any `core` files or folders in `src` or `.jam-on` - see **Modifying Code, Components, and Styles** for more details
- The `src/assets/vendor` directory that contains the Ontario Design System files and other third-party dependencies
- the `jam-on.mjs` command line tool itself

You should [refer to the Jamstack Application Toolkit repo](https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit) for available release tags.

## Development

### `core` and `app`

The project divide resources into `core` and `app` directories and files.

- Avoid modifiying `core` files and directories to make it easier to bring future improvements from new versions of the Jamstack Toolkit into your application.
- `app` files and directories are starting points for customizations your own product will need, especially when intersecting with `core` components
  - `src/_includes/app/_head_custom.njk` allows the insertion of additional tags into the `<head>` portion of your templates
  - `src/_includes/app/_main_content.njk` allows you to customize layout and otherwise in the main content area between the standard Ontario Design System header and footer components

### Understanding the Toolkit File Structure

A freshly cloned repository includes the following:

- `.jam-on` [folder] - folder used by the `jam-on.mjs` command line tool
  - app [folder] - folder for app-specific configuration produced by the command line tool
  - core [folder] - folder for core files used by the command line tool (do not modify)
- `src` [folder] - source code folder for the static user interface.
  - `_data` [folder] - [Eleventy global data files folder](https://www.11ty.dev/docs/data-global/)
    - `app` [folder] - data files folder for the application
      - `app-eleventyComputed.js` - [Eleventy computed properties](https://www.11ty.dev/docs/data-computed/) for the application
      - `app-globals.js` - globals data file for the application
      - `app-locale-strings.json` - locale strings for the application
    - `core` [folder] - data files folder for the Jamstack Toolkit core
      - `core-eleventyComputed.js` - Eleventy computed properties for the Jamstack Toolkit core
      - `core-globals.js` - globals data file for the Jamstack Toolkit core
      - `core-locale-strings.json` - locale strings for the Jamstack Toolkit core
    - `eleventyComputed.js` - combined computed properties from `app-eleventyComputed.js` and `core-eleventyComputed.js`
    - `globals.js` - combined globals data file from `app-globals.js` and `core-globals.js`
  - `_includes` [folder] - folder for [reusable templates used by Eleventy](https://www.11ty.dev/docs/templates/)
    - `app` [folder] - folder for application-specific templates
      - `components` [folder] - folder for reusable component templates
        - `_example_page_list.njk` - example component that outputs a list of site pages and links
      - `_footer_expanded_content.njk` - customizable expanded footer content template
      - `_head_custom.njk` - customizable template to insert additional tags in the `<head>` section of pages
      - `_main_content.njk` - customizable template for layout of the main content area between the header and footer
    - `core` [folder] - folder for templates used in the Jamstack Toolkit core
      - `components` [folder] - folder for components used in the Jamstack toolkit core
        - `_page_dates.njk` - component for managing page publication and modified dates
      - `_footer_default.njk` - default footer layout
      - `_footer_expanded.njk` - expanded footer layout
      - `_footer_standard_links.njk` - standard links used in the footer
      - `_footer.njk` - footer layouts wrapper
      - `_header_application-subheader.njk` - application subheader layout
      - `_header_menu_global-nav-items.njk` - global navigation items for the standard header menu
      - `_header_menu_lang-toggle.njk` - header menu language toggle
      - `_header_menu.njk` - header menu layouts
      - `_header.njk` - header layouts wrapper
      - `_icon_definitions.njk` - Ontario Design System icon definitions
      - `layout.njk` - overall layout template
  - `assets` [folder] - folder for assets such as CSS, client-side Javascript and images that will be copied to the built application without processing by Eleventy.
    - `css` [folder] - folder for CSS
      - `app` [folder] - folder for application-specific CSS
        - `app-styles.css` - file for application-specific CSS
      - `core` [folder] - folder for Jamstack Toolkit core CSS
        - `core-styles.css` - file for Jamstack Toolkit core CSS (including Ontario Design System CSS import)
      - `style.css` - CSS file made up of `app-styles.css` and `core-styles.css`. Included in the header section of the layout template
    - `vendor` [folder] - folder for vendor/third party assets
      - `ontario-design-system` [folder] - [Ontario Design System](https://designsystem.ontario.ca/) assets used by the Jamstack Toolkit (file contents not detailed in full, refer to Ontario Design System documentation)
  - `example-pages` [folder] - English-language folder of example pages
    - `jamstack-toolkit-app-header.njk` - example page using the application header and expanded footer
    - `jamstack-toolkit.njk` - exampe page using the standard header and footer
  - `pages-dexemple` [folder] - French-language folder of example pages
    - `boite-a-outils-dapplication-jamstack-app-header.njk` - example page using the application header and expanded footer
    - `boite-a-outils-dapplication-jamstack.njk` - exampe page using the standard header and footer
  - `index.njk` - redirect page from site root to `/jamstack-toolkit` page
- `test` [folder] - folder for holding tests
  - `test.js` - example test file using the [Mocha](https://mochajs.org/) test framework
- `.app-eleventy.js` - application-level Eleventy configuration file
- `.core-eleventy.js` - Jamstack Toolkit core Eleventy configuration file
- `.eleventy.js` - [Eleventy configuration file](https://www.11ty.dev/docs/config/) made up of `.app-eleventy.js` and `.core-eleventy.js`
- `.gitignore` - project [Git Ignore](https://git-scm.com/docs/gitignore) configuration file
- `.htmlvalidate.json` - [html-validate](https://www.npmjs.com/package/html-validate) configuration file
- `.htmlvalidateingore` - ignore file for `html-validate`
- `.nvmrc` - [Node Version Manager](https://github.com/nvm-sh/nvm) config file
- `.pre-commit-config.yaml` - [pre-commit](https://pre-commit.com/) config file
- `.prettierignore` - ignore file for Prettier code formatter
- `.prettierrc.json` - [Prettier](https://prettier.io/) code formatter config file
- `CONTRIBUTING.md` - contribution guidelines
- `jam-on.mjs` - command-line tool for setting up and updating projects
- `LICENSE.txt` - project open source license
- `package-lock.json` - [NPM lock file](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json)
- `package.json` - [NPM configuration file](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
- `README.md` - main product README file (you are reading this right now)

### Serving and Rebuilding the Application

`npm run serve` will serve the generated application locally, updating and rebuilding as changes are made - the generated files will appear in the `dist` directory.

### Setting the Header Style

You can set your application to use either the Ontario.ca main website header or the Ontario application header used for applications and subsites outside of the main website using the `useApplicationHeader` boolean option in `src/_data/app/app-globals.js`

For full details on the two header styles available in the Ontario Design System, consult these two pages:

- [Ontario.ca header](https://designsystem.ontario.ca/components/detail/ontario-header.html) - _mandatory for all pages that are part of the main ontario.ca website_
- [Application header](https://designsystem.ontario.ca/components/detail/application-header.html) - _for applications and subsites outside of the main ontario.ca website_

To set the `useApplicationHeader` option differently for specific pages from the global config, you can specify it in the YAML front matter of the page:

> `useApplicationHeader: true`

#### Links in the Design System Application Subheader

Link text and URLs for the application menu can be configured using the locale file `/src/_data/app/app-locale-strings.js`, under the `applicationHeader.navMenu` key.

### Setting the Footer Style

Two footer styles are supported:

- `default`, the standard Ontario.ca footer.
- `expanded`, a footer including the standard content that can also be customized with additional content using the template in `src/_includes/app/_footer_expanded.njk`. The additional content included is an example only.

The footer style is set in `src/_data/app/app-globals.js`.

For full details and guidelines on footer styles in the Ontario Design System, consult the [documentation on Ontario.ca footers](https://designsystem.ontario.ca/components/detail/footers.html).

To set the footer style differently for specific pages from the global config, you can specify it in the YAML front matter of the page:

> `footerType: expanded`

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

Eleventy can be configured to build site outputs that are different from the source input by modifying options in the `.eleventy.js` configuration file, which is made up of a combination of configuration functions and options in two files:

- `.app-eleventy.js` (a point for your application's configuration)
- `.core-eleventy.js` (core configuration, do not modify)

The default state of the toolkit shows some examples of this approach that aligns with deploying Jamstack sites to Ontario.ca:

- The `addPassthroughCopy` statement in `.app-eleventy.js` copies the root-level `assets` folder in `src` to the `jamstack-toolkit` folder of the built site
- The `assetsPath` variable from `src/_data/app/app-globals.js` is used to reference the build location of the assets folder in the templates

This configuration simplifies deployment to Ontario.ca by requiring only two routes to be configured, one for each language, with an assets directory shared between the two.
