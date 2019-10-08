declare module "*.mdx" {
  // This type definition isn't entirely accurate. The underlying component would be happy to accept more
  // attributes than this type signature will allow. However, the precise definition of those extra attributes
  // is defined by the markdown-component-loader at runtime based on configuration data. This constrained type
  // signature is used here as a statement of our preference to limit our use the component loader to it's
  // basic functionality.
  type MarkdownComponentProps = {className?: string, style?: string};

  // The naming is a little unfortunate. The function exported and the type of that function share the same
  // name. The type name was chosen by us to comport with the React naming style. The underlying function name
  // was chosen by markdown-component-loader.
  type MarkdownComponent = React.FunctionComponent<MarkdownComponentProps>;
  const MarkdownComponent: MarkdownComponent;
  export default MarkdownComponent;
}
