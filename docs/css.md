# CSS Guide

We use the [VA Design System](https://design.va.gov/documentation), aka "Formation", as our base library for styling the site. VADS is composed of the `formation` and `formation-react` packages, which provide SASS styles and React components, respectively.

If you have questions about any of the guidelines in this document, please feel free to reach out in #ao-engineering. You can also post in the #sparklemotion channel, as Sparklemotion are currently the domain experts for the developer portal.

## Contents

* [The VA Design System](#va-design-system)
  * The [`formation`](#formation) package
    * [`formation` Styles on the Developer Portal](#formation-styles-on-the-developer-portal)
    * [`uswds` in `formation`](#uswds-in-formation)
    * [`formation` Utilities](#formation-utilities)
      * [Known Gaps in VADS Utilities](#known-gaps)
  * The [`formation-react`](#formation-react) package
    * [`formation-react` Components on the Developer Portal](#formation-react-components-on-the-developer-portal)
* [Developer Portal Custom Styles](#custom-styles)
  * [`lib.scss`](#libscss)
* [Checklist for Wriing Components and Styles](#checklist-for-writing-components-and-styles)
* [Resources](#resources)

## VA Design System

### `formation`

Broadly speaking, the `formation` styles come in 3 types: components, layouts, and utilities. Components are used to style specific pieces of site functionality. Layout styles implement a flexbox grid system for spacing components on the page. (Please do not use the legacy float grid.) Utilities are classes that provide specific CSS property values, such as `margin` or `color`. Utility classes use `!important` to override any other selectors that might apply to that element, so utility classes can be assumed to be authoritative and should take precedence over other styles. The combination of these three types of classes greatly reduces the amount of SCSS that we need to write on our own. VADS styling should always take precedence over classes we write ourselves; we should aim to style all of our components in JSX using the VADS to the extent possible.

VADS classes use [Block, Element, Modifier (BEM) syntax](https://design.va.gov/documentation/naming) as a naming convention. All classes (at least, those with up-to-date names) are prefixed with `vads-(c|l|u)-`, where `c`, `l`, and `u` refer to components, layouts, and utilities, respectively.

#### `formation` Styles on the Developer Portal

The following table documents the `formation` styles that we use in the developer portal (excluding VADS utilities, which are ubiquitous, and [USWDS classes](#uswds-in-formation)).

| `formation` CSS class | Purpose | Defined in source file | Consumed in |
| --------------------- | ------- | ---------------------- | ----------- |
| `feature` | [Calls attention to important blocks of text](https://design.va.gov/components/featured-content) | [`_va.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass/base/_va.scss) | `ApplyForm` |
| `form-checkbox` | Provides checkbox form styles | [`_m-form-elements.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass//modules/_m-form-elements.scss) | `ApplyForm`, `Beta` (to be deprecated) |
| `va-crisis-line` | Top-level class for the Veterans Crisis Line (VCL) container | [`_m-crisis-line.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass/site/_m-crisis-line.scss) | `VeteransCrisisLine` |
| `va-crisis-line-button` | Styles the VCL button | [`_m-crisis-line.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass/site/) | `VeteransCrisisLine` |
| `va-crisis-panel` | Container class for the VCL modal contents | [`_m-crisis-line.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass/site/) | `VeteransCrisisLinePanel` |
| `va-crisis-panel-body` | Styles the inside of the VCL modal | [`_m-crisis-line.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass/site/) | `VeteransCrisisLinePanel` |
| `vcl` | Styles the white VCL flag icon on the left of the VCL button | [`_m-crisis-line.scss`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/master/packages/formation/sass/site/) | `VeteransCrisisLine` |

#### `uswds` in `formation`

[`uswds`](https://github.com/uswds/uswds), the `npm` package for the [US Web Design System](https://designsystem.digital.gov/), is a direct dependency of `formation`, and `formation` exports some parts of `uswds` as part of its library. As a result, we use some USWDS styles on the developer portal. Most, if not all, of these styles are documented in the [VADS component docs](https://design.va.gov/components). We should only use USWDS styles that are exported and documented by VADS.

##### VADS `uswds` Reference

| Component Type | `uswds` CSS classes | Purpose | Defined in source file | Documentation |
| -------------- | ------------------- | ------- | ---------------------- | ------------- |
| Accordion | `usa-accordion`, `usa-accordion-button`, `usa-accordion-content` | Handles display of expandable/collapsible content | [`_accordions.scss`](https://github.com/uswds/uswds/blob/release-1.6.10/src/stylesheets/components/_accordions.scss) | [https://design.va.gov/components/accordions](https://design.va.gov/components/accordions) |
| Alert | `usa-alert`, `usa-alert-heading`, `usa-alert-body`, `usa-alert-info`, `usa-alert-warning`, `usa-alert-error`, `usa-alert-success`, `usa-alert-continue` | Displaying info to the user | [`_alerts.scss`](https://github.com/uswds/uswds/blob/release-1.6.10/src/stylesheets/components/_alerts.scss) | [https://design.va.gov/components/alertboxes](https://design.va.gov/components/alertboxes) |
| Button | `usa-button`, `usa-button-primary`, `usa-button-secondary`, `usa-button-active`, `usa-button-hover`, `usa-button-big`, `usa-button-disabled` | Provide styles for button elements | [`_buttons.scss`](https://github.com/uswds/uswds/blob/release-1.6.10/src/stylesheets/elements/_buttons.scss) | [https://design.va.gov/components/buttons](https://design.va.gov/components/buttons) |
| Form | `usa-form` | Sets some basic form properties | [`_forms.scss`](https://github.com/uswds/uswds/blob/release-1.6.10/src/stylesheets/components/_forms.scss) | [https://design.va.gov/components/form-controls](https://design.va.gov/components/form-controls) |
| Label | `usa-label` | Standard label styles | [`_labels.scss`](https://github.com/uswds/uswds/blob/release-1.6.10/src/stylesheets/elements/_labels.scss) | [https://design.va.gov/components/labels](https://design.va.gov/components/labels) |
| Sidenav | `usa-sidenav-list` | Provides some styles for lists of items within the side nav | [`_sidenav.scss`](https://github.com/uswds/uswds/blob/release-1.6.10/src/stylesheets/components/_sidenav.scss) | [https://design.va.gov/components/sidenav](https://design.va.gov/components/sidenav) |

##### `uswds` on the Developer Portal

The following list documents all of the USWDS classes we currently use.

| `uswds` CSS class       | Consumed in |
| ----------------------- | ----------- |
| `usa-accordion-content` | `Banner`, `formation-react`'s `CollapsiblePanel` in `GroupedAccordions` |
| `usa-alert`             | Deprecation notice in `ApiPage` |
| `usa-alert-body`        | Deprecation notice in `ApiPage` |
| `usa-alert-info`        | Deprecation notice in `ApiPage` |
| `usa-button`            | Various places: `Hero`, `NavBar`, `Header`, `ApplyForm`, `SupportContactUs` |
| `usa-button-primary`    | `Form`, `ApplyForm` |
| `usa-font-lead`         | `ApplyHeader`, `ApplySuccess` (NOT DOCUMENTED, probably don't use again) |
| `usa-form`              | `ApplyForm`, `swaggerPlugins/Servers` |
| `usa-sidenav-list`      | `SideNav` |

#### `formation` Utilities

The following list covers the CSS properties for which there are available [utilities](https://design.va.gov/utilities). For these properties, you should always prefer VADS utilities unless there is a specific reason that you cannot use them. For some common cases where VADS utilities will not work, see [Known Gaps](#known-gaps).

* [Background color](https://design.va.gov/utilities/background-color)
* [Border](https://design.va.gov/utilities/border)
* [Color](https://design.va.gov/utilities/color)
* [Display](https://design.va.gov/utilities/display)
* [Flexbox](https://design.va.gov/utilities/flexbox)
  * Flex parent: `flex-direction`, `flex-wrap`, `align-items`, `justify-content`, `align-content`
  * Flex child: `flex-grow`, `order`
* [Font family](https://design.va.gov/utilities/font-family)
* [Font size](https://design.va.gov/utilities/font-size)
* [Font style](https://design.va.gov/utilities/font-style)
* [Font weight](https://design.va.gov/utilities/font-weight)
* [Height](https://design.va.gov/utilities/height) and [width](https://design.va.gov/utilities/width)
* [Line height](https://design.va.gov/utilities/background-color)
* [Margins](https://design.va.gov/utilities/margins)
* [Padding](https://design.va.gov/utilities/padding)
* [Text align](https://design.va.gov/utilities/text-align)
* [Text decoration](https://design.va.gov/utilities/text-decoration)
* [Visibility](https://design.va.gov/utilities/visibility)

Note that some of these utilities use the responsive breakpoints (`medium-screen:[utility]`, etc) and others do not.

##### Known Gaps

There are a few consistently identifiable gaps in VADS that require us to write our own styles either as our own utility classes or in component stylesheets. These are areas where, if we are able to develop utilities following the VADS pattern to supplement the actual VADS utilities, we may be able to push changes upstream to `formation`. In any case, you can be confident that you will need to write or use developer portal-specific styles for these cases.

* Colors of any kind (`background-color`, `border-color`) are not responsive. We have some elements (e.g., the search box) that use different colors on mobile and desktop.
* There aren't utilities to help with DOM events such as `focus`, `hover`, etc (to my knowledge as of this writing).
* Miscellaneous lesser-used properties: `cursor`, `text-transform`, `list-style`
* It is difficult to style elements when a parent-child relationship is relevant to the style logic. (To be fair, this would be a difficult problem to address generically. You can be confident in writing component-specific styles in this case.)
  * One specific case of this situation is when styling third-party components. In this case, the pattern that we have to follow to style these components is `[.top-level-component-class] [element-tag-to-style] { ... }`. Since we don't ever have access to the element we want to style, we need to write a custom stylesheet; VADS utilities will never be useful in this case. Given that fact, the goal for these stylesheets should be to make them less opaque and easier to reason about in a way that complements the rest of our CSS approach. The current example of this pattern is `src/styles/swagger.scss` for `swagger-ui`.
* The width and height utilities generally don't offer options other than `0`, `100%`, and `auto`.

### `formation-react`

`formation-react` is the React package of VADS. See [here](https://department-of-veterans-affairs.github.io/veteran-facing-services-tools/visual-design) for documentation on available components.

#### `formation-react` Components on the Developer Portal

TODO

## Custom Styles

If you do need to write custom styles, please namespace **all** of your classes with `va-api-`. This pattern will allow us to identify which classes we need to maintain in future refactors of the developer portal styles and to identify patterns in our CSS needs that can be abstracted site-wide.

### `lib.scss`

As [documented above](#known-gaps), there are some gaps in VADS that could benefit from similar utilities to the ones exported by `formation`. If you have a generalizable style that could be extracted into a similar utility, feel free to add it to `src/styles/lib.scss`. There are some examples already in that file that can be used as a guide.

## Checklist for Writing Components and Styles

1. Check [`formation-react`](https://department-of-veterans-affairs.github.io/veteran-facing-services-tools/visual-design) to see if there is a React component that meets your needs.
1. Check [the `formation` component docs](https://design.va.gov/components) to see if there are component styles that can be a useful starting point for writing your component.
1. Try to write the component using [the VADS utilities](https://design.va.gov/utilities).
1. See if there are any Lighthouse developer portal utilities in [`src/styles/lib.scss`](#libscss) that can help with functionality not provided by the `formation` utilities.
1. Add a utility of the form `va-api-u-[css-property]--[value]` to `lib.scss` if the functionality you need can be generalized but is not already included in `formation` or `lib.scss`.
1. Write a custom component stylesheet that covers anything that can't be accomplished by any of the above strategies.

## Resources

Related resources:

* [VADS components](https://design.va.gov/components)
* [VADS layout](https://design.va.gov/layout)
* [VADS utilities](https://design.va.gov/utilities)
* [`formation-react` docs](https://department-of-veterans-affairs.github.io/veteran-facing-services-tools/visual-design)
* [VADS naming conventions](https://design.va.gov/documentation/naming)
* [SASS language documentation](https://sass-lang.com/documentation)
* Bourbon framework docs (Bourbon is the base library for `uswds`)
  * [`bourbon-neat` v1.8.0 docs](https://neat.bourbon.io/docs/1.8.0/) (note that `bourbon-neat` is unmaintained)
  * [`bourbon` v4 docs](https://www.bourbon.io/docs/4/) (current version is `6.0.0`, `uswds` is on `4.2.7`)
* [`veteran-facing-services-tools`](https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/), the monorepo for `formation` and `formation-react`
* [`uswds`](https://github.com/uswds/uswds/tree/release-1.6.10)
