import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { Badge } from './badge';
import { BinaryStruct } from './binary-struct';
import { HexDump } from './hex-dump';

export function getMDXComponents(components?: MDXComponents) {
    return {
        ...defaultMdxComponents,
        ...components,
        Badge,
        BinaryStruct,
        HexDump,
    } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
    type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
