# Updating Release Notes

## Overview

Each API has its own file at `src/content/apiDocs/<apiCategory>/<apiName>ReleaseNotes.mdx`.

[mdx](https://github.com/ticky/markdown-component-loader) is a superset of Markdown for use in React apps. Besides being able to use standard Markdown and HTML in the file, it allows you to pass props to the generated component (declared in the front matter of the `mdx` file), and then use `{ }` style dynamic expressions within the markdown. You can apply styling to the resulting React component.

This interactive page lets you see how the markdown syntax in `mdx` files are converted into html:
[Markdown Component Loader - Online Editor](https://ticky.github.io/markdown-component-loader/repl.html).

## Format of a Release Note

```
### **Month DD, YYYY** | v<api version>.<vets-api release number>

**PR Name or other high-level description [#<PR number>](link to PR in GitHub)**
- Description of change
- Description of change
```

Example:
```
### **February 13, 2019** | v0.0.0.307

**Standardize closed days to "Closed" in Facilities API [#2802](https://github.com/department-of-veterans-affairs/vets-api/pull/2802)**
- Changes any casing of "closed" and "-" to "Closed" for a consistent convention in the Facilities API
```

All release notes in the file should be separated by a horizontal rule (`---`). There
shouldn't be one after the final note.

## Finding Release History

This will hopefully not need to be done going forward, but this is how I found additional content for release notes for the Facility API

1. Go to `vets-api` repo
2. Search for "facilities" 
3. Look at the results for commits ([example](https://github.com/department-of-veterans-affairs/vets-api/search?q=facilities&type=Commits))
4. Copy and massage the PR text
5. Look through the daily releases to get the release version and date of a PR ([example](https://github.com/department-of-veterans-affairs/vets-api/tags?after=vets-api%2Fv0.0.256)).
