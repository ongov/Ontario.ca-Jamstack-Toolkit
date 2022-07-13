import { v4 as uuidv4 } from 'uuid';
import { Command } from 'commander';
import { simpleGit as git } from 'simple-git';
import inquirer from 'inquirer';
import fs from 'fs-extra';

const program = new Command();

program
  .name('appl')
  .description('Developer CLI for Ontario.ca Jamstack Toolkit')
  .version('0.1.0');

program
  .command('update')
  .description('Update an existing Ontario.ca Jamstack project')
  .argument('<tagOrBranch>', 'tag or branch to update to')
  .option('-r, --repo <repo>', 'repo URL to use')
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

        var coreFileList = [
          [`./${tmpDirName}/src/_data/core`, './src/_data/core'],
          [`./${tmpDirName}/src/_includes/core`, './src/_includes/core'],
          [`./${tmpDirName}/src/assets/css/core`, './src/assets/css/core'],
          [`./${tmpDirName}/src/assets/vendor`, './src/assets/vendor'],
          [`./${tmpDirName}/.core-eleventy.js`, './.core-eleventy.js'],
        ];

        var defaultRepoUrl =
          'https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit';
        var repoUrl = options.repo ? options.repo : defaultRepoUrl;

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
