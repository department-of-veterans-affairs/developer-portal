declare module "*/applyHeader.mdx" {
  const applyHeader: React.StatelessComponent<{className: string}>;
  export default applyHeader;
}
declare module "*.mdx" {
    const MarkdownComponent: React.StatelessComponent;
    export default MarkdownComponent;
}
