interface BadgeProps {
    text: string;
}

export function Badge({ text }: BadgeProps) {
    return (
        <span className="ml-2 inline-flex items-center rounded-lg bg-neutral-300/60 px-2 py-0.5 align-middle text-xs font-medium dark:bg-neutral-800/60">
            {text}
        </span>
    );
}
