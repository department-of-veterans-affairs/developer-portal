# Typescript

This doc contains miscellaneous

## Compiler Options

### `rootDir`

See [this comment](https://github.com/microsoft/TypeScript/issues/9858#issuecomment-370537216) for an explanation of the `rootDir` compiler option.

> > I told typescript that my source was all in a particular folder (via `rootDir`)
>
> This is not what `rootDir` means! `rootDir` means "Use this folder as the relative basis for computing the paths in outDir". Which files are part of your compilation is a separate question that is answered by `files` and/or `include`/`exclude`
