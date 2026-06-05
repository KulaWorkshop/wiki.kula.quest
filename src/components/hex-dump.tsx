import { HexDumpSection } from './hex-dump-section';

interface SchemaEntry {
    skip?: number;
    bytes?: number;
    label?: string;
    color?: string;
}

interface HexDumpProps {
    offset: string;
    hex: string;
    schema: SchemaEntry[];
}

interface HexPart {
    type: 'byte' | 'section';
    value: string;
    note?: string;
    color?: string;
}

interface HexLine {
    address: string;
    parts: HexPart[];
}

function parseHexBytes(hex: string): string[] {
    return hex.trim().split(/\s+/).filter(Boolean);
}

function buildLines(offset: string, bytes: string[], schema: SchemaEntry[]): HexLine[] {
    const BYTES_PER_LINE = 16;

    interface Slot {
        byte: string;
        note?: string;
        color?: string;
        groupStart: boolean;
        groupEnd: boolean;
    }

    const slots: Slot[] = [];
    let byteIdx = 0;

    for (const entry of schema) {
        if (entry.skip) {
            for (let i = 0; i < entry.skip; i++) {
                slots.push({ byte: bytes[byteIdx++] ?? '??', groupStart: false, groupEnd: false });
            }
            continue;
        }

        const count = entry.bytes ?? 1;
        for (let i = 0; i < count; i++) {
            slots.push({
                byte: bytes[byteIdx++] ?? '??',
                note: entry.label,
                color: entry.color,
                groupStart: i === 0,
                groupEnd: i === count - 1,
            });
        }
    }

    // fill remaining bytes not covered by schema
    while (byteIdx < bytes.length) {
        slots.push({ byte: bytes[byteIdx++], groupStart: false, groupEnd: false });
    }

    // parse the base offset address
    const baseAddr = parseInt(offset.replace(/h$/i, ''), 16);

    // split slots into 16-byte lines, then group consecutive same-note slots into sections
    const lines: HexLine[] = [];
    const totalLines = Math.ceil(slots.length / BYTES_PER_LINE);

    for (let lineIdx = 0; lineIdx < totalLines; lineIdx++) {
        const lineSlots = slots.slice(lineIdx * BYTES_PER_LINE, (lineIdx + 1) * BYTES_PER_LINE);
        const addrNum = baseAddr + lineIdx * BYTES_PER_LINE;
        const address = addrNum.toString(16).toUpperCase().padStart(6, '0') + 'h';
        const parts: HexPart[] = [];

        let i = 0;
        while (i < lineSlots.length) {
            const slot = lineSlots[i];

            // if this slot has an annotation, accumulate consecutive slots with the same note
            if (slot.note) {
                const note = slot.note;
                const color = slot.color;
                const group: string[] = [];

                while (i < lineSlots.length && lineSlots[i].note === note) {
                    group.push(lineSlots[i].byte);
                    i++;
                }

                parts.push({ type: 'section', value: group.join(' '), note, color });
            } else {
                parts.push({ type: 'byte', value: slot.byte });
                i++;
            }
        }

        lines.push({ address, parts });
    }

    return lines;
}

export function HexDump({ offset, hex, schema }: HexDumpProps) {
    const bytes = parseHexBytes(hex);
    const lines = buildLines(offset, bytes, schema);

    return (
        <pre className="border-fd-border not-prose bg-fd-muted/50 text-fd-foreground relative overflow-x-auto rounded-lg border px-6 py-4 font-mono text-sm leading-relaxed">
            <code>
                {lines.map((line, i) => (
                    <span key={i}>
                        <span className="text-fd-muted-foreground select-none">
                            {line.address}{' '}
                        </span>{' '}
                        {line.parts
                            .map((part, j) =>
                                part.type === 'section' ? (
                                    <HexDumpSection
                                        key={j}
                                        value={part.value}
                                        note={part.note}
                                        color={part.color}
                                    />
                                ) : (
                                    <span key={j}>{part.value}</span>
                                ),
                            )
                            .reduce<React.ReactNode[]>((acc, el, idx) => {
                                if (idx > 0) acc.push(' ');
                                acc.push(el);
                                return acc;
                            }, [])}
                        {'\n'}
                    </span>
                ))}
            </code>
        </pre>
    );
}
