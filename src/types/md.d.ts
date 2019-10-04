declare module "*.mdx" {
  // This type definition isn't entirely accurate. The underlying component would be happy to accept more
  // attributes than this type signature will allow. However, the precise definition of those extra attributes
  // is defined by the markdown-component-loader at runtime based on configuration data. This constrained type
  // signature is used here as a statement of our preference to limit our use the component loader to it's
  // basic functionality.
  const MarkdownComponent: React.FunctionComponent<React.HTMLAttributes<HTMLElement>>;
  export default MarkdownComponent;
}
