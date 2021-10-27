# Contribution Guidelines

## Commit Messages

* Please use the https://www.conventionalcommits.org/ standard

Your commit messages should look like the following (body is optional, if any extended explanation is useful):

```
feat: add basic layout file

Convert to using a standard Eleventy layout file.

JIRA-Ref: OSI-29
```

## Branch Names

* Please name branches in this style: `{issue id}_{branch description}` (this lets our Git hooks determine the issue ID and insert it automatically in commit messages)

## Hooks

* Please copy the project's `git_hooks` in your `.git/hooks` directory either manually or with `npm run installHooks`
