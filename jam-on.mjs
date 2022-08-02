import { v4 as uuidv4 } from 'uuid';
import { Command } from 'commander';
import { simpleGit as git } from 'simple-git';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';

const program = new Command();

nunjucks.configure('.jam-on/templates');

program
  .name('jam-on')
  .description('Developer CLI for Ontario.ca Jamstack Toolkit')
  .version('0.2.0');

program
  .command('new')
  .description(
    'put a newly cloned toolkit project into a ready state for development'
  )
  .action(() => {
    console.log(
      'This will remove all existing .git information, and the example pages and components'
    );
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
        console.log('Creating new project...');

        console.log('Removing example files...');

        const exampleFilesList = [
          'src/_includes/app/components/_example_page_list.njk',
          'src/example-pages',
          'src/pages-dexemple',
          'src/index.njk',
          'src/example-pages.njk',
          'src/pages-dexemple.njk',
        ];

        exampleFilesList.forEach((filePath, index) => {
          fs.removeSync(filePath);
        });

        console.log('Creating starter files...');

        const newConf = {
          assetsDestination: 'example-pages/assets',
          englishRoot: 'example-pages/jamstack-toolkit',
          frenchRoot: 'pages-dexemple/boite-a-outils-dapplication-jamstack',
          createDate: new Date().toISOString(),
        };

        const enFileContent = nunjucks.render('en.njk', newConf);

        const frFileContent = nunjucks.render('fr.njk', newConf);

        const redirectFileContent = nunjucks.render('redirect.njk', newConf);

        fs.outputFile(
          `src/${newConf.englishRoot}.njk`,
          enFileContent,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );

        fs.outputFile(`src/${newConf.frenchRoot}.njk`, frFileContent, (err) => {
          if (err) {
            console.error(err);
          }
        });

        fs.outputFile(`src/index.njk`, redirectFileContent, (err) => {
          if (err) {
            console.error(err);
          }
        });

        fs.outputFile('.jam-on/conf.json', JSON.stringify(newConf), (err) => {
          if (err) {
            console.error(err);
          }
        });

        console.log(enFileContent, frFileContent);
      })
      .catch((error) => {
        console.log(error);
      });
  });

program
  .command('update')
  .description('Update an existing Ontario.ca Jamstack project')
  .argument('<tagOrBranch>', 'tag or branch to update to (required)')
  .option(
    '-r, --repo <repo>',
    'repo URL to use, defaults to ODS GitLab (optional)'
  )
  .action((tagOrBranch, options) => {
    console.log(
      `This will replace the 'core' and 'vendor' directories/files of the current project to the versions in Jamstack Toolkit version ${tagOrBranch}`
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
        const tmpDirName = uuidv4();
        console.log(`Updating to branch/tag: ${tagOrBranch}`);

        const coreFileList = [
          [`./${tmpDirName}/src/_data/core`, './src/_data/core'],
          [`./${tmpDirName}/src/_includes/core`, './src/_includes/core'],
          [`./${tmpDirName}/src/assets/css/core`, './src/assets/css/core'],
          [`./${tmpDirName}/src/assets/vendor`, './src/assets/vendor'],
          [`./${tmpDirName}/.core-eleventy.js`, './.core-eleventy.js'],
        ];

        const defaultRepoUrl =
          'https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit';
        const repoUrl = options.repo ? options.repo : defaultRepoUrl;

        git().clone(
          repoUrl,
          tmpDirName,
          { '--depth': 1, '--branch': `${tagOrBranch}` },
          function (error) {
            if (error) {
              console.log('Error cloning specified repo');
              console.log(error);
              process.exit();
            }
            console.log(
              `Checked out tag/branch ${tagOrBranch} to temporary directory ${tmpDirName}`
            );
            coreFileList.forEach((filePathStruct, idx) => {
              console.log(
                `Replacing ${filePathStruct[1]} with ${filePathStruct[0]}`
              );
              fs.copySync(filePathStruct[0], filePathStruct[1]);
            });
            fs.removeSync(tmpDirName);
            console.log(`Removed temporary directory ${tmpDirName}`);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });

program.parse();
