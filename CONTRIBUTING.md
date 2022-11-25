# Contributing to the Ontario.ca Jamstack Toolkit

## Commit messages

Please use the [Conventional Commits](https://www.conventionalcommits.org) standard. Your commit messages should read:

```
feat: add basic layout file

Convert to using a standard Eleventy layout file.

JIRA-Ref: OSI-29
```

 Adding a commit body is optional, but useful if your commit requires an extended explanation.

## Branch names

- Please name branches in this style: `{issue id}_{branch description}`. This format allows our Git hooks to determine the issue ID and insert it automatically in commit messages.

## Git hooks

- This project uses [pre-commit](https://pre-commit.com/) to manage its git hooks. After installing pre-commit on your system, use the following commands to install the project's hooks:
  - `pre-commit autoupdate`
  - `pre-commit install`
  - `pre-commit install --hook-type prepare-commit-msg`

## Ontario Design System updates

Do not update the [Ontario Design System](https://designsystem.ontario.ca/docs/documentation/for-developers.html) yourself. Instead:

- Change the `DS_VERSION` variable in the `installDesignSystem` script in `package.json` to the current version of the Ontario Design System
- Run `npm run installDesignSystem`
- Run `npm build` to build a new version of your application using the updated design system
- Run `npm run test` and update the tests for `Ontario Design System inclusion` as necessary

The general purpose of this script is to automate the update of the Ontario Design System and remove example files and others that are not required for deployment.

## Releases

New or updated features should be managed as a release.

In the merge request, ideally immediately before merge:
- Bump the version number where appropriate in `package.json`, `README.md` and similar
- Add the version number and a short release note to `README.md`
- Bump the tag used in `update-jamstack-toolkit.sh` to match that version number

Once merged, add a tag formatted as `r[x].[y].[z]` to match that version number.