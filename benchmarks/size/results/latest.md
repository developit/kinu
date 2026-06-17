# Kinu size benchmarks

Generated at: 2026-06-17T01:44:24.038Z

## Aggregate scenarios

| Scenario | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| One component (Button) | 0.62 | 0.33 | 5.99 | 1.51 | 1.85 |
| A few components (Button + Input + Dialog + Popover + Tabs) | 1.35 | 0.62 | 13.9 | 3 | 3.62 |
| Nearly all components (namespace import) | 12.34 | 3.91 | 60.14 | 10.67 | 14.57 |

## Per-component (isolated import)

Each row is one component built in isolation — its JS plus the CSS its `style.css` pulls in. Use it to attribute size regressions and to check a component against its budget in `ROADMAP.md`. Run with `BENCH_QUICK=1` to skip this matrix.

| Component | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| dropdown-menu | 4.69 | 1.86 | 9.25 | 2.23 | 4.08 |
| combobox | 4.27 | 1.6 | 9.58 | 2.3 | 3.9 |
| context-menu | 2.1 | 1.02 | 10.2 | 2.36 | 3.38 |
| sidebar | 3.27 | 1.38 | 5.09 | 1.48 | 2.86 |
| listbox | 3.25 | 1.32 | 4.5 | 1.33 | 2.65 |
| spinner | 0.6 | 0.32 | 10.79 | 2.25 | 2.57 |
| list | 2.55 | 1.1 | 4.45 | 1.26 | 2.36 |
| chip | 1.21 | 0.59 | 5.33 | 1.36 | 1.94 |
| popover | 0.11 | 0.1 | 7.59 | 1.81 | 1.91 |
| carousel | 1.51 | 0.69 | 4.07 | 1.18 | 1.87 |
| button | 0.62 | 0.33 | 5.99 | 1.51 | 1.85 |
| status | 0.6 | 0.32 | 5.51 | 1.51 | 1.83 |
| tree | 0.82 | 0.42 | 4.99 | 1.4 | 1.83 |
| tabs | 0.64 | 0.34 | 5.23 | 1.45 | 1.79 |
| toggle | 1.38 | 0.64 | 4.23 | 1.14 | 1.79 |
| item | 1.23 | 0.59 | 4.03 | 1.18 | 1.77 |
| slider | 1.28 | 0.62 | 4.37 | 1.14 | 1.77 |
| input | 1.14 | 0.54 | 4.37 | 1.22 | 1.76 |
| otp | 1.08 | 0.54 | 4.13 | 1.18 | 1.72 |
| progress-ring | 0.61 | 0.33 | 5.06 | 1.35 | 1.67 |
| switch | 1.03 | 0.5 | 4.13 | 1.16 | 1.66 |
| accordion | 0.6 | 0.33 | 4.57 | 1.33 | 1.66 |
| radio-group | 1.03 | 0.5 | 4.06 | 1.15 | 1.65 |
| checkbox | 1 | 0.49 | 4.18 | 1.15 | 1.64 |
| tooltip | 0.6 | 0.32 | 4.82 | 1.3 | 1.62 |
| collapsible | 1.2 | 0.59 | 3.85 | 1.03 | 1.62 |
| select | 0.6 | 0.32 | 4.15 | 1.27 | 1.59 |
| field | 1.17 | 0.56 | 3.77 | 1.02 | 1.58 |
| prose | 0.59 | 0.32 | 4.44 | 1.25 | 1.57 |
| color-picker | 1 | 0.5 | 4 | 1.07 | 1.57 |
| menubar | 1.21 | 0.6 | 3.59 | 0.96 | 1.56 |
| timeline | 0.66 | 0.35 | 4.23 | 1.19 | 1.54 |
| input-group | 0.6 | 0.33 | 4.97 | 1.2 | 1.53 |
| file-upload | 1 | 0.49 | 3.8 | 1.03 | 1.53 |
| hover-card | 0.66 | 0.35 | 4.02 | 1.13 | 1.48 |
| textarea | 0.6 | 0.32 | 4.01 | 1.15 | 1.47 |
| badge | 0.59 | 0.32 | 4.39 | 1.14 | 1.46 |
| avatar | 0.63 | 0.34 | 3.96 | 1.12 | 1.46 |
| date-picker | 1 | 0.5 | 3.5 | 0.91 | 1.41 |
| time-picker | 1 | 0.49 | 3.5 | 0.91 | 1.41 |
| calendar | 1 | 0.49 | 3.5 | 0.91 | 1.4 |
| meter | 0.6 | 0.32 | 4.15 | 1.05 | 1.37 |
| pagination | 0.7 | 0.35 | 3.82 | 1.02 | 1.37 |
| skeleton | 0.6 | 0.32 | 3.78 | 1.05 | 1.37 |
| kbd | 0.59 | 0.32 | 3.71 | 1.03 | 1.35 |
| breadcrumb | 0.68 | 0.35 | 3.68 | 1 | 1.35 |
| toggle-group | 0.6 | 0.33 | 3.8 | 1.02 | 1.34 |
| navigation-menu | 0.69 | 0.35 | 3.65 | 0.99 | 1.33 |
| progress | 0.6 | 0.32 | 3.83 | 1 | 1.32 |
| table | 0.6 | 0.32 | 3.7 | 1 | 1.32 |
| empty | 0.59 | 0.32 | 3.64 | 1 | 1.32 |
| alert | 0.59 | 0.32 | 3.96 | 0.99 | 1.31 |
| card | 0.59 | 0.32 | 3.71 | 0.98 | 1.3 |
| alert-dialog | 0.11 | 0.1 | 4.31 | 1.19 | 1.29 |
| dialog | 0.11 | 0.1 | 4.31 | 1.19 | 1.29 |
| resizable | 0.6 | 0.33 | 3.54 | 0.94 | 1.27 |
| label | 0.6 | 0.32 | 3.52 | 0.94 | 1.26 |
| sheet | 0.11 | 0.1 | 4.23 | 1.16 | 1.26 |
| drawer | 0.11 | 0.1 | 4.2 | 1.15 | 1.25 |
| separator | 0.6 | 0.32 | 3.47 | 0.91 | 1.23 |
| aspect-ratio | 0.03 | 0.05 | 3.55 | 0.94 | 0.99 |
| typography | 0 | 0.02 | 3.5 | 0.93 | 0.95 |
| scroll-area | 0.6 | 0.32 | 0.03 | 0.05 | 0.37 |
