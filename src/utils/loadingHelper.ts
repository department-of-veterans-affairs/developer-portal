interface DefaultLoadingPropsInterface {
  label: string;
  message: string;
}

export const defaultLoadingProps = (): DefaultLoadingPropsInterface => ({
  label: 'Loading',
  message: 'Loading APIs',
});
