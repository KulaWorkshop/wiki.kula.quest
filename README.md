# KulaQuest Wiki

The [**KulaQuest Wiki**](https://wiki.kula.quest/) is a comprehensive technical reference for the PlayStation 1 game **KulaQuest** (also known as _Kula World_ in Europe and _Roll Away_ in North America).
Built from years of reverse engineering and research, this wiki provides several resources:

- Tutorials for various modding tools.
- Version history and differences covering every known release of the game, including prototypes and regional demos.
- Technical documentation for all of the game's custom binary file formats.
- ... and more!

## Development

This wiki is built with [Fumadocs](https://fumadocs.dev/) and [Next.js](https://nextjs.org/).
Both **Oxlint** (`.oxlintrc.json`) and **Oxfmt** (`.oxfmtrc.json`) are used to lint and format the codebase.

| Directory         | Purpose                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `content/wiki/`   | All wiki articles as MDX files, organized by topic.                     |
| `src/app/`        | Next.js App Router pages, layouts, and API routes.                      |
| `src/components/` | Reusable React components.                                              |
| `src/lib/`        | Shared utilities and constants.                                         |
| `public/`         | Static assets served at the site root (images, format reference files). |
| `scripts/`        | Miscellaneous scripts.                                                  |

### Local Preview

```bash
# Clone repository
git clone https://github.com/KulaWorkshop/wiki.kula.quest.git
cd wiki.kula.quest

# Install dependencies
bun install

# Start development server
bun run dev
```

### Building

```bash
bun run build
```

## License

This project is licensed under the [MIT License](LICENSE).
Created and maintained by [Brandon "SaturnKai" Gardenhire](https://panka.io) from the [Kula Workshop](https://github.com/kulaworkshop) project.
