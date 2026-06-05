import { type ReactNode } from 'react';

interface BinaryStructProps {
    name?: string;
    size?: string;
    children: ReactNode;
}

export function BinaryStruct({ name, size, children }: BinaryStructProps) {
    return (
        <div className="not-prose border-fd-border my-6 overflow-hidden rounded-lg border text-sm">
            {(name || size) && (
                <div className="border-fd-border bg-fd-muted flex items-center justify-between gap-4 border-b px-3 py-1.5">
                    {name && (
                        <span className="text-fd-foreground font-mono text-xs font-semibold">
                            struct <span className="text-fd-primary">{name}</span>
                        </span>
                    )}
                    {size && (
                        <span className="text-fd-muted-foreground font-mono text-xs">{size}</span>
                    )}
                </div>
            )}
            <div className="[&_thead]:border-fd-border [&_th]:bg-fd-muted/60 [&_th]:text-fd-muted-foreground [&_td]:text-fd-foreground [&_td]:border-fd-border/40 [&_tbody_tr:hover_td]:bg-fd-muted/25 overflow-x-auto [&_.prose-no-margin]:my-0 [&_table]:w-full [&_table]:border-collapse [&_td]:border-b [&_td]:px-3 [&_td]:py-2 [&_td]:font-mono [&_td]:text-xs [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-mono [&_th]:text-[11px] [&_th]:font-semibold [&_th]:tracking-wide [&_th]:uppercase [&_thead]:border-b [&_tr:last-child_td]:border-b-0">
                {children}
            </div>
        </div>
    );
}
