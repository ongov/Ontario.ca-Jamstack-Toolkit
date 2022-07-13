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
  .command('new')
  .description('Create a new Ontario.ca Jamstack project')
  .argument('<projectName>', 'project name')
  .action((projectName, options) => {
    console.log(`project name: ${projectName}`);
    console.log(`options: ${options}`);
    git().clone(
      'https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit',
      `${projectName}`
    );
  });

program
  .command('update')
  .description('Update an existing Ontario.ca Jamstack project')
  .argument('<tag>', 'tag to update to')
  .action((tag, options) => {
    console.log(
      `This will replace the 'core' and 'vendor' directories/files of the current project to the versions in Jamstack Toolkit version ${tag}`
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
        console.log(`Updating to branch/tag: ${tag}`);

        var coreFileList = [
          [`./${tmpDirName}/src/_data/core`, './src/_data/core'],
          [`./${tmpDirName}/src/_includes/core`, './src/_includes/core'],
          [`./${tmpDirName}/src/assets/css/core`, './src/assets/css/core'],
          [`./${tmpDirName}/src/assets/vendor`, './src/assets/vendor'],
          [`./${tmpDirName}/.core-eleventy.js`, './.core-eleventy.js'],
        ];

        git().clone(
          'https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit',
          tmpDirName,
          { '--depth': 1, '--branch': `${tag}` },
          function () {
            console.log(
              `Checked out tag/branch ${tag} to temporary directory ${tmpDirName}`
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
