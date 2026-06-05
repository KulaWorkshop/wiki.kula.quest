import { RootProvider } from 'fumadocs-ui/provider/next';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './global.css';
import SearchDialog from '@/components/search';
import { appName, siteAuthor, siteDescription, siteKeywords, siteUrl } from '@/lib/shared';

const inter = Inter({
    subsets: ['latin'],
});

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appName,
    url: siteUrl,
    description: siteDescription,
    author: {
        '@type': 'Person',
        name: siteAuthor,
        url: siteUrl,
    },
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
};

export default function Layout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: appName,
        template: `%s | ${appName}`,
    },
    description: siteDescription,
    keywords: siteKeywords,
    authors: [{ name: siteAuthor, url: siteUrl }],
    creator: siteAuthor,
    publisher: siteAuthor,
    icons: { icon: '/icon.svg' },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    openGraph: {
        type: 'website',
        siteName: appName,
        locale: 'en_US',
        url: siteUrl,
        title: appName,
        description: siteDescription,
        images: [{ url: '/og/image.webp', width: 1200, height: 630, alt: appName }],
    },
    twitter: {
        card: 'summary_large_image',
        title: appName,
        description: siteDescription,
        images: ['/og/image.webp'],
        creator: `@${siteAuthor}`,
    },
    alternates: {
        canonical: siteUrl,
    },
};
