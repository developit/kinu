# Kinu size benchmarks

Generated at: 2026-06-21T03:30:52.712Z

## Aggregate scenarios

| Scenario | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| One component (Button) | 0.62 | 0.33 | 6.07 | 1.54 | 1.87 |
| A few components (Button + Input + Dialog + Popover + Tabs) | 1.35 | 0.62 | 13.99 | 3.02 | 3.65 |
| Nearly all components (namespace import) | 19.18 | 5.64 | 77.03 | 13.67 | 19.31 |

## Per-component (isolated import)

Each row is one component built in isolation — its JS plus the CSS its `style.css` pulls in. Use it to attribute size regressions and to check a component against its budget in `ROADMAP.md`. Run with `BENCH_QUICK=1` to skip this matrix.

| Component | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| dropdown-menu | 5.43 | 2.09 | 9.26 | 2.24 | 4.33 |
| command | 6.29 | 2.33 | 5.95 | 1.7 | 4.03 |
| combobox | 4.38 | 1.64 | 9.6 | 2.31 | 3.94 |
| context-menu | 3.49 | 1.45 | 10.22 | 2.37 | 3.82 |
| number-field | 3.3 | 1.33 | 8.56 | 2 | 3.32 |
| tags-input | 3.78 | 1.52 | 5.94 | 1.54 | 3.06 |
| popover | 2.98 | 1.23 | 7.6 | 1.82 | 3.06 |
| sidebar | 3.33 | 1.41 | 5.1 | 1.49 | 2.9 |
| password-input | 3.13 | 1.29 | 5.93 | 1.45 | 2.74 |
| listbox | 3.35 | 1.35 | 4.51 | 1.34 | 2.7 |
| spinner | 0.63 | 0.34 | 10.8 | 2.26 | 2.6 |
| carousel | 3.5 | 1.38 | 4.08 | 1.18 | 2.57 |
| dialog | 2.96 | 1.25 | 4.32 | 1.2 | 2.45 |
| alert-dialog | 2.92 | 1.24 | 4.32 | 1.2 | 2.44 |
| list | 2.57 | 1.11 | 4.47 | 1.27 | 2.38 |
| hotkey | 3.43 | 1.48 | 3.43 | 0.89 | 2.37 |
| sheet | 2.68 | 1.15 | 4.25 | 1.17 | 2.32 |
| drawer | 2.7 | 1.15 | 4.22 | 1.15 | 2.3 |
| rating | 1.45 | 0.71 | 4.73 | 1.37 | 2.08 |
| copy-button | 1.95 | 0.89 | 4.16 | 1.17 | 2.05 |
| code | 1.6 | 0.76 | 4.5 | 1.27 | 2.03 |
| chip | 1.24 | 0.6 | 5.34 | 1.37 | 1.96 |
| composer | 1.53 | 0.72 | 4.46 | 1.24 | 1.96 |
| button | 0.65 | 0.35 | 6.07 | 1.54 | 1.89 |
| select | 0.63 | 0.34 | 5.15 | 1.53 | 1.87 |
| status | 0.63 | 0.34 | 5.52 | 1.51 | 1.85 |
| tree | 0.84 | 0.44 | 5.01 | 1.41 | 1.85 |
| tabs | 0.72 | 0.38 | 5.25 | 1.46 | 1.84 |
| toggle | 1.41 | 0.66 | 4.24 | 1.15 | 1.81 |
| item | 1.25 | 0.6 | 4.05 | 1.19 | 1.8 |
| slider | 1.32 | 0.64 | 4.39 | 1.15 | 1.79 |
| input | 1.17 | 0.56 | 4.38 | 1.23 | 1.78 |
| otp | 1.12 | 0.56 | 4.14 | 1.19 | 1.76 |
| progress-ring | 0.65 | 0.35 | 5.08 | 1.36 | 1.7 |
| stepper | 0.84 | 0.45 | 4.5 | 1.25 | 1.7 |
| checkbox | 1.04 | 0.51 | 4.28 | 1.18 | 1.69 |
| switch | 1.06 | 0.52 | 4.15 | 1.17 | 1.69 |
| radio-group | 1.08 | 0.53 | 4.07 | 1.16 | 1.69 |
| accordion | 0.64 | 0.34 | 4.58 | 1.34 | 1.68 |
| collapsible | 1.24 | 0.61 | 3.86 | 1.04 | 1.65 |
| tooltip | 0.63 | 0.34 | 4.83 | 1.31 | 1.65 |
| field | 1.19 | 0.57 | 3.92 | 1.06 | 1.63 |
| menubar | 1.27 | 0.63 | 3.61 | 0.97 | 1.6 |
| color-picker | 1.04 | 0.52 | 4.02 | 1.08 | 1.6 |
| prose | 0.62 | 0.33 | 4.45 | 1.26 | 1.6 |
| avatar | 0.88 | 0.47 | 3.97 | 1.13 | 1.59 |
| input-group | 0.64 | 0.35 | 4.99 | 1.21 | 1.56 |
| timeline | 0.69 | 0.36 | 4.24 | 1.2 | 1.56 |
| file-upload | 1.04 | 0.52 | 3.82 | 1.04 | 1.56 |
| hover-card | 0.76 | 0.39 | 4.04 | 1.14 | 1.53 |
| textarea | 0.64 | 0.34 | 4.23 | 1.19 | 1.53 |
| message | 0.76 | 0.39 | 4.17 | 1.14 | 1.53 |
| badge | 0.62 | 0.34 | 4.4 | 1.15 | 1.49 |
| app-shell | 0.87 | 0.44 | 3.79 | 1.03 | 1.47 |
| indicator | 0.64 | 0.34 | 4.28 | 1.11 | 1.46 |
| stat | 0.78 | 0.41 | 3.89 | 1.04 | 1.45 |
| thread | 0.86 | 0.45 | 3.67 | 0.99 | 1.44 |
| cluster | 0.63 | 0.34 | 4.33 | 1.1 | 1.44 |
| time-picker | 1.04 | 0.52 | 3.51 | 0.92 | 1.44 |
| date-picker | 1.04 | 0.52 | 3.51 | 0.92 | 1.44 |
| row | 0.62 | 0.34 | 4.27 | 1.1 | 1.44 |
| calendar | 1.04 | 0.51 | 3.51 | 0.92 | 1.43 |
| pagination | 0.81 | 0.4 | 3.83 | 1.03 | 1.43 |
| grid | 0.62 | 0.34 | 4.3 | 1.08 | 1.42 |
| stack | 0.62 | 0.33 | 4.23 | 1.08 | 1.42 |
| form | 0.96 | 0.51 | 3.44 | 0.9 | 1.41 |
| breadcrumb | 0.8 | 0.4 | 3.7 | 1.01 | 1.41 |
| meter | 0.63 | 0.34 | 4.17 | 1.06 | 1.4 |
| skeleton | 0.63 | 0.34 | 3.79 | 1.05 | 1.4 |
| navigation-menu | 0.83 | 0.4 | 3.67 | 0.99 | 1.39 |
| kbd | 0.62 | 0.34 | 3.73 | 1.04 | 1.38 |
| toggle-group | 0.64 | 0.35 | 3.82 | 1.03 | 1.37 |
| alert | 0.62 | 0.33 | 4.07 | 1.04 | 1.37 |
| progress | 0.64 | 0.34 | 3.84 | 1.01 | 1.35 |
| table | 0.63 | 0.34 | 3.71 | 1.01 | 1.34 |
| empty | 0.62 | 0.33 | 3.66 | 1.01 | 1.34 |
| card | 0.62 | 0.34 | 3.72 | 0.99 | 1.32 |
| resizable | 0.64 | 0.34 | 3.56 | 0.95 | 1.3 |
| label | 0.63 | 0.34 | 3.54 | 0.95 | 1.29 |
| spacer | 0.63 | 0.34 | 3.66 | 0.94 | 1.27 |
| center | 0.63 | 0.34 | 3.51 | 0.92 | 1.26 |
| separator | 0.64 | 0.34 | 3.48 | 0.91 | 1.26 |
| aspect-ratio | 0.31 | 0.23 | 3.56 | 0.95 | 1.17 |
| typography | 0 | 0.02 | 3.51 | 0.94 | 0.96 |
| scroll-area | 0.64 | 0.35 | 0.03 | 0.05 | 0.4 |
