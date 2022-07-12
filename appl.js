const { Command } = require('commander');
const git = require('simple-git');

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

program.parse();
