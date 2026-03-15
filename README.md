# Docs Table Block

A WordPress Gutenberg block plugin that renders clean, documentation-style two-column tables with rich content support.

## Features

- **Parent/child block architecture** — `docs-table/table` (parent) + `docs-table/row` (child)
- **Rich content in the explanation column** — paragraphs, bullet lists, numbered lists, headings, and code blocks via InnerBlocks
- **Editable term labels** — RichText left column with bold, italic, and link formatting
- **Configurable header row** — toggle on/off, customize left and right labels
- **Adjustable layout** — left column width (15–50%), cell padding (4–32px)
- **Styling options** — border color picker, optional zebra striping
- **Responsive** — stacks cells vertically on mobile screens
- **Semantic HTML** — proper `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` markup for accessibility

## Requirements

- WordPress 6.4+
- PHP 7.4+
- Node.js 18+ (for building)

## Installation

1. Clone or copy the `docs-table-block/` directory into `wp-content/plugins/`:

   ```bash
   cp -r docs-table-block /path/to/wordpress/wp-content/plugins/
   ```

2. Install dependencies and build:

   ```bash
   cd /path/to/wordpress/wp-content/plugins/docs-table-block
   npm install
   npm run build
   ```

3. Activate the plugin in **WP Admin → Plugins → Docs Table Block**.

## Development

Start the development watcher for live rebuilds:

```bash
cd docs-table-block
npm run start
```

Build for production:

```bash
npm run build
```

## Usage

1. In the WordPress block editor, click **+** to add a block and search for **Docs Table**.
2. The table inserts with two example rows and a header row.
3. Click the left cell to type a term/label.
4. Click the right cell to add content — use the block inserter inside the cell to add paragraphs, bullet lists, numbered lists, headings, or code blocks.
5. Use the **+** button below the table to add more rows.
6. Reorder rows by selecting a row and using the block toolbar move controls.
7. Customize appearance in the block's **Inspector Panel** (right sidebar):
   - **Header Settings** — toggle header, change column labels
   - **Layout** — adjust left column width and cell padding
   - **Styling** — set border color, enable zebra striping

## File Structure

```
docs-table-block/
├── docs-table-block.php          # Plugin entry point, registers both blocks
├── package.json                  # Build scripts and dependencies
├── webpack.config.js             # Multi-entry webpack config
└── src/
    ├── docs-table/               # Parent block
    │   ├── block.json            # Block metadata and attributes
    │   ├── index.js              # Block registration
    │   ├── edit.js               # Editor component with InspectorControls
    │   ├── save.js               # Frontend save/render
    │   ├── style.scss            # Shared frontend + editor styles
    │   └── editor.scss           # Editor-only styles
    └── docs-table-row/           # Child block (one per table row)
        ├── block.json            # Block metadata (parent-locked)
        ├── index.js              # Block registration
        ├── edit.js               # Row editor with RichText + InnerBlocks
        ├── save.js               # Row frontend render
        ├── style.scss            # Shared styles
        └── editor.scss           # Editor-only styles
```

## How Lists Work

The right (explanation) column uses `InnerBlocks` rather than a single `RichText` field. This allows users to insert `core/list` blocks directly inside table cells, providing native support for:

- Unordered (bullet) lists
- Ordered (numbered) lists
- Nested list items
- Mixed content (paragraphs + lists + headings in the same cell)

The allowed blocks are restricted to `core/paragraph`, `core/list`, `core/heading`, and `core/code` to keep the table content focused and well-formatted.

## License

GPL-2.0-or-later
