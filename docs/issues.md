# Known Issues

This document tracks running issues that are useful to be aware when developing the dev portal but are either not high-priority or not solvable because they originate with a third-party package.

## Focus

### React Router

React Router anchor links do not update focus to the anchored section, as would be expected with native browser behavior. `Link` components cancel the default `click` event behavior so that the component can navigate with the [`history`](https://github.com/ReactTraining/history) object. This is a longstanding and well-known issue with React Router.

[`react-router-hash-link`](https://github.com/rafrex/react-router-hash-link) is a well-known workaround, but it doesn't actually handle the focus part of anchor clicks. Therefore, you need to manually handle focus for anchor links in the dev portal. For `HashLink` elements where ensuring that focus is respected you can use the `onHashAnchorClick` utility method in `src/utils/clickHandlers.ts` as an `onClick` method.

References:

- [Issue in the React Router repo](https://github.com/ReactTraining/react-router/issues/394#issuecomment-220221604)
- [Stack Overflow question](https://stackoverflow.com/questions/48223566/using-anchor-tags-in-react-router-4)
- [Source code](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js#L49)

### zenscroll

`zenscroll` is a dependency of `swagger-ui` for handling some kind of scrolling behavior. Unfortunately, it registers a global listener on the `window` object that captures all `click` events bubbling up. The event listener cancels the native behavior if the event target is an anchor element with an in-page `href` (i.e., it starts with the hash, like `#hash`, and does not include the path, like `/path#hash`) so that `zenscroll` can do its own custom scrolling. Needless to say, this is _terrible_ behavior, because it means that nothing else on the site can create an anchor of the form `<a href="#my-link">My link</a>`. So, if you would like to create an in-page anchor with the native `a` tag, you'll have to handle focus yourself.

**Note:** this behavior doesn't affect links created with `HashLink` or `NavHashLink` from `react-router-hash-link`. React Router `Link`s use `history.createHref()` to define the `href` attribute, and `history.createHref()` always includes the path.

- `zenscroll` [event listener](https://github.com/zengabor/zenscroll/blob/dist/zenscroll.js#L305)
- [The `event.preventDefault()` call](https://github.com/zengabor/zenscroll/blob/dist/zenscroll.js#L336)
- [Slack thread](https://lighthouseva.slack.com/archives/CSZN6V1CH/p1591980406369000) from the investigation that uncovered this issue

## Content

### API Category Names

The pseudo-schema for API categories in `src/apiDefs/categories.ts` currently includes two fields for the category name, `name` and `properName`. `name` is used in most places; `properName` is most likely a legacy of some earlier presentational needs.

`properName` is sometimes the same as `name` (Appeals, Health), and it is semantically incorrect in at least one case ("Benefits Intake API" for the Benefits category).

`properName` is only used in the following place:

- The `ApplySuccess` page uses `properName` as the display name for Benefits, Facilities, and VA Forms. (Note that the Apply page doesn't maintain a clear distinction between individual APIs and API categories.)

We should eliminate `properName` from the category schema as soon as possible, assuming that we can confirm that we can safely do that with UX.
