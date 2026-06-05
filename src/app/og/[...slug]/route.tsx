import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ImageResponse } from '@takumi-rs/image-response';
import { notFound } from 'next/navigation';

import { appName } from '@/lib/shared';
import { getPageImage, source } from '@/lib/source';

const iconSrc = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), 'public/icon.svg')).toString('base64')}`;

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/[...slug]'>) {
    const { slug } = await params;
    const page = source.getPage(slug.slice(0, -1));
    if (!page) notFound();

    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                backgroundColor: '#0a0910',
                overflow: 'hidden',
            }}
        >
            {/* top accent bar */}
            <div
                style={{
                    display: 'flex',
                    height: '5px',
                    background: 'linear-gradient(90deg, #8839ef 0%, #cba6f7 60%, transparent 100%)',
                    flexShrink: 0,
                }}
            />

            {/* main layout */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'stretch',
                    padding: '56px 64px',
                    gap: '48px',
                }}
            >
                {/* left: text content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    {/* title and description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div
                            style={{
                                fontSize: 64,
                                fontWeight: 800,
                                color: '#ffffff',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {page.data.title}
                        </div>
                        {page.data.description && (
                            <div
                                style={{
                                    fontSize: 28,
                                    color: 'rgba(255,255,255,0.55)',
                                    lineHeight: 1.45,
                                }}
                            >
                                {page.data.description}
                            </div>
                        )}
                    </div>

                    {/* bottom branding */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={iconSrc} width={36} height={36} alt="" />
                        <span
                            style={{
                                fontSize: 22,
                                fontWeight: 600,
                                color: '#cba6f7',
                                letterSpacing: '0.01em',
                            }}
                        >
                            {appName}
                        </span>
                    </div>
                </div>

                {/* right: large icon */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '240px',
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '220px',
                            height: '220px',
                            borderRadius: '110px',
                            background:
                                'radial-gradient(circle, rgba(136,57,239,0.22) 0%, transparent 70%)',
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={iconSrc} width={190} height={190} alt="" />
                    </div>
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
            format: 'webp',
        },
    );
}

export function generateStaticParams() {
    return source.getPages().map((page) => ({
        lang: page.locale,
        slug: getPageImage(page).segments,
    }));
}
