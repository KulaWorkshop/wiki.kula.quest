import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

import bstructLang from '@/lib/bstruct.tmLanguage.json';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
    dir: 'content/wiki',
    docs: {
        schema: pageSchema,
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
    meta: {
        schema: metaSchema,
    },
});

export default defineConfig({
    mdxOptions: {
        rehypeCodeOptions: {
            langs: [bstructLang as any],
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
        },
    },
    plugins: [lastModified()],
});
