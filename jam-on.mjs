/* eslint-disable no-console */
import { v4 as uuidv4 } from 'uuid';
import { Command } from 'commander';
import { simpleGit as git } from 'simple-git';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import validate from 'validate-npm-package-name';
import path from 'node:path';
import { createRequire } from 'node:module';

// Because assetions are still experimental in Node.js,
// we need to construct a require function within this ES module file
var require = createRequire(import.meta.url);
const { version: toolkitPackageJSONVersion } = require('./package.json');

const program = new Command();

nunjucks.configure('.jam-on/core/templates');

function generateToolkitFile(pathToFile, content, message) {
  fs.outputFileSync(pathToFile, content);
  console.log(message);
}

function newAction(options) {
  if (options.keepGit) {
    console.log('This will remove the example pages and components');
  } else {
    console.log(
      'This will remove any local Git information, and the example pages and components',
    );
  }

  let hasGit;
  let gitIsClean;

  try {
    fs.statSync('.git');
    hasGit = true;
  } catch (e) {
    hasGit = false;
    gitIsClean = true;
  }

  if (hasGit) {
    git().status({}, (error, status) => {
      if (error) {
        console.log('Error in git().status() command: ', error);
        process.exit();
      } else {
        gitIsClean = status.isClean();
      }
    });
  }

  inquirer
    .prompt({
      type: 'confirm',
      name: 'doNew',
      default: false,
      message: 'Proceed?',
    })
    .then((answers) => {
      if (!answers.doNew) {
        console.log('Farewell!');
        process.exit();
      }

      if (gitIsClean && !options.keepGit) {
        console.log(
          'Local Git repo is clean or does not exist, removing any Git information',
        );
        fs.removeSync('.git');
      } else if (!options.keepGit) {
        console.log(
          'Your local Git repo has modifications; please ensure the local git repo is clean and unmodified before running this command',
        );
        console.log('Farewell!');
        process.exit();
      }

      console.log('Creating new project...');

      console.log('Removing example files...');

      const exampleFilesList = [
        'src/_includes/app/components/_example_page_list.njk',
        'src/example-pages',
        'src/pages-dexemple',
        'src/index.njk',
      ];

      exampleFilesList.forEach((filePath) => {
        fs.removeSync(filePath);
      });

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'enRoot',
            message: 'What is the English-language subfolder for deployment?',
          },
          {
            type: 'input',
            name: 'frRoot',
            message: 'What is the French-language subfolder for deployment?',
          },
          {
            type: 'input',
            name: 'projectName',
            message:
              'What is the NPM package.json name for this project (use lowercase, hyphens and underscores only)?',
            default: 'new-jam-on-project',
            validate(userInput) {
              const validName = validate(userInput).validForNewPackages;
              if (validName) {
                return true;
              }
              return 'Invalid package name';
            },
          },
          {
            type: 'input',
            name: 'projectDescription',
            message: 'What is a short description for this project?',
            default: 'New Ontario.ca Jamstack Toolkit project',
          },
        ])
        .then((responses) => {
          console.log('Creating starter files...');

          const newConf = {
            assetsDestination: `${responses.enRoot}/assets`,
            englishRoot: responses.enRoot,
            frenchRoot: responses.frRoot,
            projectName: responses.projectName,
            projectDescription: responses.projectDescription,
            createDate: new Date().toISOString(),
            toolkitPackageJSONVersion,
          };

          generateToolkitFile(
            '.jam-on/app/conf.json',
            JSON.stringify(newConf),
            'Wrote new config file to .jam-on/app/conf.json',
          );

          const enFileContent = nunjucks.render('en.njk', newConf);

          const frFileContent = nunjucks.render('fr.njk', newConf);

          const redirectFileContent = nunjucks.render('redirect.njk', newConf);

          generateToolkitFile(
            `src/${newConf.englishRoot}.njk`,
            enFileContent,
            `Wrote English-side starter file at src/${newConf.englishRoot}.njk`,
          );

          generateToolkitFile(
            `src/${newConf.frenchRoot}.njk`,
            frFileContent,
            `Wrote French-side starter file at src/${newConf.frenchRoot}.njk`,
          );

          generateToolkitFile(
            'src/index.njk',
            redirectFileContent,
            'Wrote root-level redirect file at src/index.njk',
          );

          const testFileContent = nunjucks.render('test.njk', newConf);

          generateToolkitFile(
            'test/test.js',
            testFileContent,
            'Wrote starter test file at test/test.js',
          );

          const packageFileContent = nunjucks.render('package.njk', newConf);

          generateToolkitFile(
            'package.json',
            packageFileContent,
            'Wrote updated NPM package.json file at package.json',
          );

          fs.renameSync('README.md', 'README.jamstack.md');
          console.log('Renamed default README file');

          const readmeFileContent = nunjucks.render('README.njk', newConf);

          generateToolkitFile(
            'README.md',
            readmeFileContent,
            'Wrote new README file at README.md',
          );

          const sitemapFileContent = nunjucks.render('sitemap.njk', newConf);
          generateToolkitFile(
            `src/sitemap.njk`,
            sitemapFileContent,
            `Wrote sitemap.njk file at src/sitemap.njk`,
          );
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateAction(tagOrBranch, options) {
  let ignoreFile;
  let ignoreFileContent;

  console.log(
    `This will replace the 'core' and 'vendor' directories/files of the current project to the versions in Jamstack Toolkit version ${tagOrBranch}`,
  );
  inquirer
    .prompt({
      type: 'confirm',
      name: 'doUpdate',
      default: false,
      message: 'Perform the upgrade?',
    })
    .then((answers) => {
      if (!answers.doUpdate) {
        console.log('Farewell!');
        process.exit();
      }

      const tmpDir = 'tmp';

      const tmpCheckoutDir = `${tmpDir}${path.sep}${uuidv4()}`;
      ignoreFile = `${tmpDir}${path.sep}.gitignore`;
      ignoreFileContent = '*';
      fs.outputFileSync(ignoreFile, ignoreFileContent);

      console.log(`Updating to branch/tag: ${tagOrBranch}`);

      const jamOnPath = '/jam-on.mjs';

      const coreFilePaths = [
        '/src/_data/core',
        '/src/_includes/core',
        '/src/assets/img/core',
        '/src/assets/css/core',
        '/src/assets/js/core',
        '/src/assets/json/core',
        '/src/assets/vendor',
        '/.core-eleventy.js',
        '/.jam-on/core',
        jamOnPath,
      ];

      const coreFileReplacements = coreFilePaths.map((filePath) => [
        `./${tmpCheckoutDir}${filePath}`,
        `.${filePath}`,
      ]);

      const repoUrls = {
        odsGitLab:
          'https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit',
        odsGitHub:
          'https://github.com/ongov/Ontario.ca-Jamstack-Application-Toolkit',
      };

      const defaultRepoUrl = repoUrls.odsGitHub;
      const repoUrl = options.repo ? options.repo : defaultRepoUrl;

      function cleanUpTmp() {
        fs.removeSync(tmpDir);
        console.log(`Removed temporary checkout directory ${tmpDir}`);
        fs.removeSync(tmpCheckoutDir);
        console.log(`Removed temporary checkout directory ${tmpCheckoutDir}`);
      }

      git().clone(
        repoUrl,
        tmpCheckoutDir,
        { '--depth': 1, '--branch': `${tagOrBranch}` },
        (error) => {
          if (error) {
            console.log('Error cloning specified repo');
            console.log(error);
            process.exit();
          }
          console.log(
            `Checked out tag/branch ${tagOrBranch} to temporary directory ${tmpCheckoutDir}`,
          );

          // File diffing here
          console.log(
            `checking that jam-on.mjs is up to date for tag/branch ${tagOrBranch}`,
          );
          git().diff(
            [
              '--no-index',
              '--numstat',
              `./${jamOnPath}`,
              `${tmpCheckoutDir}${jamOnPath}`,
            ],
            (err, diff) => {
              if (err) {
                console.log(err);
                console.log('Error running diff on jam-on.mjs file');
                cleanUpTmp();
                process.exit();
              }
              if (diff !== '') {
                console.log('The jam-on.mjs CLI needs to be updated...');
                fs.copySync(`${tmpCheckoutDir}${jamOnPath}`, `./${jamOnPath}`);
                console.log(
                  'jam-on.mjs has been updated - please run the update command again',
                );
                cleanUpTmp();
                process.exit();
              }

              console.log(
                'jam-on.mjs is up to date, proceeding with update...',
              );
              ignoreFile = `${tmpCheckoutDir}${path.sep}.gitignore`;
              ignoreFileContent = '*';

              fs.outputFileSync(ignoreFile, ignoreFileContent);
              try {
                coreFileReplacements.forEach((filePathStruct) => {
                  console.log(
                    `Replacing ${filePathStruct[1]} with ${filePathStruct[0]}`,
                  );
                  fs.copySync(filePathStruct[0], filePathStruct[1]);
                });
                fs.removeSync(tmpDir);
                console.log(`Removed temporary checkout directory ${tmpDir}`);
                fs.removeSync(tmpCheckoutDir);
                console.log(
                  `Removed temporary checkout directory ${tmpCheckoutDir}`,
                );

                generateToolkitFile(
                  '.jam-on/app/versionMetadata.json',
                  JSON.stringify({
                    tagOrBranch,
                    updatedOn: new Date().toISOString(),
                  }),
                  'Created version metadata file at .jam-on/app/versionMetadata.json',
                );

                inquirer
                  .prompt([
                    {
                      type: 'confirm',
                      default: false,
                      name: 'generateSitemap',
                      message: 'Do you want a sitemap template generated?',
                    },
                    {
                      type: 'input',
                      name: 'enRoot',
                      message:
                        "What is the English-language subfolder for deployment? (optional, defaults to 'englishRoot' in .jam-on/app/conf.json)",
                    },
                  ])
                  .then((responses) => {
                    if (responses.generateSitemap) {
                      const enRoot = responses.enRoot
                        ? responses.enRoot
                        : JSON.parse(fs.readFileSync('.jam-on/app/conf.json'))[
                            'englishRoot'
                          ];
                      console.log(
                        `Creating sitemap template with front matter permalink value: ${enRoot}/sitemap.xml`,
                      );
                      const sitemapFileContent = nunjucks.render(
                        'sitemap.njk',
                        { englishRoot: enRoot },
                      );

                      generateToolkitFile(
                        `src/sitemap.njk`,
                        sitemapFileContent,
                        `Wrote sitemap.njk file at src/sitemap.njk`,
                      );

                      console.warn(
                        `Add the line: \n'eleventyExcludeFromCollections: true' \nto a page's front-matter if you wish it to not be indexed by the sitemap`,
                      );
                    }
                  })
                  .catch((e) =>
                    console.error('exception while trying to update files'),
                  );
              } catch (except) {
                console.log(
                  'Exception when copying update files from checked out repo',
                );
                cleanUpTmp();
              }
            },
          );
        },
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

program
  .name('jam-on')
  .description('Developer CLI for Ontario.ca Jamstack Toolkit')
  .version('0.4.0');

program
  .command('new')
  .description(
    'put a newly cloned toolkit project into a ready state for development',
  )
  .option('--keepGit', 'Do not delete the local .git folder (optional)')
  .action((options) => newAction(options));

program
  .command('update')
  .description('Update an existing Ontario.ca Jamstack project')
  .argument('<tagOrBranch>', 'tag or branch to update to (required)')
  .option(
    '-r, --repo <repo>',
    'repo URL to use, defaults to ODS GitHub (optional)',
  )
  .action((tagOrBranch, options) => updateAction(tagOrBranch, options));

program.parse();
