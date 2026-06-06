import { cn } from '@/lib/cn';

type BadgeType = 'info' | 'tip' | 'note' | 'warning' | 'danger' | 'success';

interface BadgeProps {
    type?: BadgeType;
    text: string;
    className?: string;
}

const typeStyles: Record<BadgeType, string> = {
    info: 'bg-[var(--vp-c-gray-soft)] text-[var(--vp-c-text-2)]',
    tip: 'bg-[var(--vp-c-indigo-soft)] text-[var(--vp-c-indigo-1)]',
    note: 'bg-[var(--vp-c-purple-soft)] text-[var(--vp-c-purple-1)]',
    warning: 'bg-[var(--vp-c-yellow-soft)] text-[var(--vp-c-yellow-1)]',
    danger: 'bg-[var(--vp-c-red-soft)]    text-[var(--vp-c-red-1)]',
    success: 'bg-[var(--vp-c-green-soft)]  text-[var(--vp-c-green-1)]',
};

export function Badge({ type = 'info', text, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'ml-2 inline-flex items-center rounded-lg px-2 py-0.5 align-middle text-xs font-medium',
                typeStyles[type],
                className,
            )}
        >
            {text}
        </span>
    );
}
