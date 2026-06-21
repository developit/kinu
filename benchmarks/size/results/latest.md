# Kinu size benchmarks

Generated at: 2026-06-21T02:07:12.440Z

## Aggregate scenarios

| Scenario | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| One component (Button) | 0.62 | 0.33 | 5.99 | 1.51 | 1.85 |
| A few components (Button + Input + Dialog + Popover + Tabs) | 1.35 | 0.62 | 13.9 | 3 | 3.62 |
| Nearly all components (namespace import) | 18.39 | 5.5 | 73.18 | 12.89 | 18.39 |

## Per-component (isolated import)

Each row is one component built in isolation — its JS plus the CSS its `style.css` pulls in. Use it to attribute size regressions and to check a component against its budget in `ROADMAP.md`. Run with `BENCH_QUICK=1` to skip this matrix.

| Component | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| dropdown-menu | 5.43 | 2.09 | 9.25 | 2.23 | 4.32 |
| command | 6.29 | 2.33 | 5.93 | 1.69 | 4.03 |
| combobox | 4.38 | 1.64 | 9.58 | 2.3 | 3.93 |
| context-menu | 3.49 | 1.45 | 10.2 | 2.36 | 3.82 |
| number-field | 3.3 | 1.33 | 8.48 | 1.97 | 3.3 |
| tags-input | 3.78 | 1.52 | 5.92 | 1.54 | 3.06 |
| popover | 2.98 | 1.23 | 7.59 | 1.81 | 3.05 |
| sidebar | 3.33 | 1.41 | 5.09 | 1.48 | 2.89 |
| password-input | 3.13 | 1.29 | 5.92 | 1.44 | 2.73 |
| listbox | 3.35 | 1.35 | 4.5 | 1.33 | 2.69 |
| spinner | 0.63 | 0.34 | 10.79 | 2.25 | 2.59 |
| carousel | 3.5 | 1.38 | 4.07 | 1.18 | 2.56 |
| dialog | 2.96 | 1.25 | 4.31 | 1.19 | 2.44 |
| alert-dialog | 2.92 | 1.24 | 4.31 | 1.19 | 2.43 |
| list | 2.57 | 1.11 | 4.45 | 1.26 | 2.38 |
| sheet | 2.68 | 1.15 | 4.23 | 1.16 | 2.31 |
| drawer | 2.7 | 1.15 | 4.2 | 1.15 | 2.29 |
| copy-button | 1.95 | 0.89 | 4.14 | 1.16 | 2.05 |
| chip | 1.24 | 0.6 | 5.33 | 1.36 | 1.96 |
| composer | 1.53 | 0.72 | 4.45 | 1.23 | 1.95 |
| button | 0.65 | 0.35 | 5.99 | 1.51 | 1.86 |
| status | 0.63 | 0.34 | 5.51 | 1.51 | 1.85 |
| tree | 0.84 | 0.44 | 4.99 | 1.4 | 1.84 |
| tabs | 0.72 | 0.38 | 5.23 | 1.45 | 1.83 |
| toggle | 1.41 | 0.66 | 4.23 | 1.14 | 1.8 |
| item | 1.25 | 0.6 | 4.03 | 1.18 | 1.79 |
| slider | 1.32 | 0.64 | 4.37 | 1.14 | 1.79 |
| input | 1.17 | 0.56 | 4.37 | 1.22 | 1.78 |
| rating | 0.99 | 0.55 | 4.21 | 1.2 | 1.75 |
| otp | 1.12 | 0.56 | 4.13 | 1.18 | 1.75 |
| progress-ring | 0.65 | 0.35 | 5.06 | 1.35 | 1.7 |
| stepper | 0.84 | 0.45 | 4.48 | 1.24 | 1.69 |
| checkbox | 1.04 | 0.51 | 4.27 | 1.17 | 1.68 |
| switch | 1.06 | 0.52 | 4.13 | 1.16 | 1.68 |
| radio-group | 1.08 | 0.53 | 4.06 | 1.15 | 1.68 |
| accordion | 0.64 | 0.34 | 4.57 | 1.33 | 1.68 |
| select | 0.63 | 0.34 | 4.34 | 1.3 | 1.64 |
| collapsible | 1.24 | 0.61 | 3.85 | 1.03 | 1.64 |
| tooltip | 0.63 | 0.34 | 4.82 | 1.3 | 1.64 |
| field | 1.19 | 0.57 | 3.9 | 1.05 | 1.62 |
| menubar | 1.27 | 0.63 | 3.59 | 0.96 | 1.59 |
| color-picker | 1.04 | 0.52 | 4 | 1.07 | 1.59 |
| prose | 0.62 | 0.33 | 4.44 | 1.25 | 1.59 |
| avatar | 0.88 | 0.47 | 3.96 | 1.12 | 1.59 |
| input-group | 0.64 | 0.35 | 4.97 | 1.2 | 1.55 |
| timeline | 0.69 | 0.36 | 4.23 | 1.19 | 1.55 |
| file-upload | 1.04 | 0.52 | 3.8 | 1.03 | 1.55 |
| hover-card | 0.76 | 0.39 | 4.02 | 1.13 | 1.53 |
| textarea | 0.64 | 0.34 | 4.21 | 1.18 | 1.52 |
| message | 0.76 | 0.39 | 4.16 | 1.13 | 1.52 |
| badge | 0.62 | 0.34 | 4.39 | 1.14 | 1.48 |
| app-shell | 0.87 | 0.44 | 3.78 | 1.02 | 1.46 |
| stat | 0.78 | 0.41 | 3.87 | 1.03 | 1.44 |
| thread | 0.86 | 0.45 | 3.65 | 0.98 | 1.43 |
| cluster | 0.63 | 0.34 | 4.31 | 1.09 | 1.43 |
| time-picker | 1.04 | 0.52 | 3.5 | 0.91 | 1.43 |
| date-picker | 1.04 | 0.52 | 3.5 | 0.91 | 1.43 |
| row | 0.62 | 0.34 | 4.26 | 1.09 | 1.43 |
| calendar | 1.04 | 0.51 | 3.5 | 0.91 | 1.42 |
| pagination | 0.81 | 0.4 | 3.82 | 1.02 | 1.42 |
| grid | 0.62 | 0.34 | 4.29 | 1.08 | 1.41 |
| stack | 0.62 | 0.33 | 4.22 | 1.08 | 1.41 |
| form | 0.96 | 0.51 | 3.43 | 0.89 | 1.4 |
| breadcrumb | 0.8 | 0.4 | 3.68 | 1 | 1.4 |
| meter | 0.63 | 0.34 | 4.15 | 1.05 | 1.39 |
| skeleton | 0.63 | 0.34 | 3.78 | 1.05 | 1.39 |
| navigation-menu | 0.83 | 0.4 | 3.65 | 0.99 | 1.39 |
| kbd | 0.62 | 0.34 | 3.71 | 1.03 | 1.37 |
| toggle-group | 0.64 | 0.35 | 3.8 | 1.02 | 1.36 |
| progress | 0.64 | 0.34 | 3.83 | 1 | 1.34 |
| table | 0.63 | 0.34 | 3.7 | 1 | 1.34 |
| empty | 0.62 | 0.33 | 3.64 | 1 | 1.33 |
| alert | 0.62 | 0.33 | 3.96 | 0.99 | 1.32 |
| card | 0.62 | 0.34 | 3.71 | 0.98 | 1.32 |
| resizable | 0.64 | 0.34 | 3.54 | 0.94 | 1.29 |
| label | 0.63 | 0.34 | 3.52 | 0.94 | 1.28 |
| spacer | 0.63 | 0.34 | 3.65 | 0.93 | 1.26 |
| center | 0.63 | 0.34 | 3.5 | 0.91 | 1.25 |
| separator | 0.64 | 0.34 | 3.47 | 0.91 | 1.25 |
| aspect-ratio | 0.31 | 0.23 | 3.55 | 0.94 | 1.17 |
| typography | 0 | 0.02 | 3.5 | 0.93 | 0.95 |
| scroll-area | 0.64 | 0.35 | 0.03 | 0.05 | 0.4 |
