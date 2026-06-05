'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface HexDumpSectionProps {
    value: string;
    note?: string;
    color?: string;
}

interface TooltipPos {
    top: number;
    left: number;
}

export function HexDumpSection({ value, note, color = '#4ade80' }: HexDumpSectionProps) {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState<TooltipPos | null>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const isMobile = useRef(false);

    useEffect(() => {
        isMobile.current = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }, []);

    const updatePos = () => {
        if (!spanRef.current) return;
        const rect = spanRef.current.getBoundingClientRect();
        setPos({ top: rect.top - 4, left: rect.left });
    };

    const handleMouseEnter = () => {
        if (!isMobile.current) {
            updatePos();
            setShow(true);
        }
    };

    const handleMouseLeave = () => setShow(false);

    const handleClick = () => {
        updatePos();
        setShow((v) => !v);
    };

    return (
        <span
            ref={spanRef}
            className="relative cursor-help border-b border-dotted font-mono transition-colors duration-200 hover:text-red-400!"
            style={{ color, borderColor: color }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {value}
            {show &&
                note &&
                pos &&
                typeof document !== 'undefined' &&
                createPortal(
                    <span
                        className="pointer-events-none fixed z-9999 -translate-y-full rounded bg-neutral-950 px-2 py-1 font-mono text-xs whitespace-nowrap text-neutral-50 opacity-90"
                        style={{ top: pos.top, left: pos.left }}
                    >
                        {note}
                    </span>,
                    document.body,
                )}
        </span>
    );
}
