import { RootProvider } from 'fumadocs-ui/provider/next';
import { Metadata } from 'next';

import './global.css';
import { Inter } from 'next/font/google';

import SearchDialog from '@/components/search';

const inter = Inter({
    subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    icons: { icon: '/icon.svg' },
};
