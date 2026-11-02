# Kinu size benchmarks

Generated at: 2026-11-02T02:49:51.021Z

## Aggregate scenarios

| Scenario | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| One component (Button) | 0.49 | 0.3 | 2.76 | 0.76 | 1.06 |
| A few components (Button + Input + Dialog + Popover + Tabs) | 0.98 | 0.49 | 13.92 | 2.81 | 3.31 |
| Nearly all components (namespace import) | 21.15 | 6.1 | 87.26 | 15.12 | 21.22 |

## Per-component (isolated import)

Each row is one component built in isolation — its JS plus the CSS its `style.css` pulls in. Use it to attribute size regressions and to check a component against its budget in `ROADMAP.md`. Run with `BENCH_QUICK=1` to skip this matrix.

| Component | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| dropdown-menu | 6.97 | 2.5 | 8.94 | 2 | 4.5 |
| context-menu | 5.01 | 1.89 | 9.89 | 2.13 | 4.02 |
| combobox | 4.2 | 1.57 | 9.27 | 2.07 | 3.64 |
| command | 6.68 | 2.44 | 2.6 | 0.88 | 3.32 |
| popover | 4.72 | 1.72 | 7.25 | 1.59 | 3.31 |
| sidebar | 4.58 | 1.73 | 3.32 | 1.19 | 2.92 |
| number-field | 3.12 | 1.26 | 5.25 | 1.19 | 2.46 |
| sheet | 4.51 | 1.68 | 2.04 | 0.68 | 2.36 |
| drawer | 3.26 | 1.35 | 2.87 | 0.89 | 2.25 |
| tags-input | 3.53 | 1.44 | 2.53 | 0.77 | 2.21 |
| password-input | 2.88 | 1.21 | 2.51 | 0.62 | 1.84 |
| listbox | 3.17 | 1.28 | 1.14 | 0.53 | 1.82 |
| dialog | 3.53 | 1.43 | 0.94 | 0.38 | 1.81 |
| alert-dialog | 3.48 | 1.42 | 0.94 | 0.38 | 1.8 |
| carousel | 3.5 | 1.38 | 0.67 | 0.36 | 1.74 |
| spinner | 0.3 | 0.21 | 7.39 | 1.47 | 1.68 |
| list | 2.39 | 1.05 | 1.11 | 0.48 | 1.53 |
| hotkey | 2.84 | 1.28 | 0.02 | 0.04 | 1.32 |
| copy-button | 1.7 | 0.8 | 0.75 | 0.35 | 1.15 |
| code | 1.35 | 0.67 | 1.09 | 0.46 | 1.13 |
| chip | 1.01 | 0.51 | 1.93 | 0.6 | 1.11 |
| button | 0.52 | 0.32 | 2.76 | 0.76 | 1.08 |
| composer | 1.28 | 0.63 | 1.05 | 0.43 | 1.06 |
| rating | 0.87 | 0.49 | 1.32 | 0.56 | 1.05 |
| select | 0.3 | 0.21 | 1.83 | 0.77 | 0.97 |
| item | 1.07 | 0.53 | 0.69 | 0.4 | 0.93 |
| tabs | 0.38 | 0.24 | 1.86 | 0.68 | 0.92 |
| status | 0.29 | 0.21 | 2.1 | 0.7 | 0.91 |
| slider | 1.06 | 0.54 | 0.98 | 0.35 | 0.9 |
| tree | 0.51 | 0.3 | 1.58 | 0.59 | 0.89 |
| input | 0.58 | 0.35 | 1.12 | 0.46 | 0.81 |
| toggle | 0.84 | 0.46 | 0.84 | 0.35 | 0.8 |
| progress-ring | 0.31 | 0.21 | 1.67 | 0.56 | 0.77 |
| stepper | 0.5 | 0.32 | 1.09 | 0.44 | 0.75 |
| avatar | 0.75 | 0.42 | 0.58 | 0.31 | 0.74 |
| otp | 0.53 | 0.34 | 0.76 | 0.39 | 0.72 |
| collapsible | 0.98 | 0.51 | 0.45 | 0.22 | 0.72 |
| accordion | 0.3 | 0.21 | 1.17 | 0.51 | 0.72 |
| tooltip | 0.3 | 0.21 | 1.41 | 0.5 | 0.7 |
| checkbox | 0.45 | 0.29 | 0.86 | 0.39 | 0.67 |
| radio-group | 0.5 | 0.31 | 0.69 | 0.35 | 0.66 |
| switch | 0.47 | 0.3 | 0.76 | 0.36 | 0.66 |
| textarea | 0.3 | 0.21 | 0.91 | 0.42 | 0.63 |
| prose | 0.29 | 0.2 | 1.01 | 0.42 | 0.62 |
| input-group | 0.31 | 0.22 | 1.57 | 0.39 | 0.61 |
| timeline | 0.35 | 0.23 | 0.83 | 0.38 | 0.61 |
| field | 0.61 | 0.35 | 0.51 | 0.24 | 0.59 |
| hover-card | 0.42 | 0.25 | 0.63 | 0.33 | 0.59 |
| message | 0.42 | 0.26 | 0.76 | 0.32 | 0.58 |
| menubar | 0.68 | 0.41 | 0.2 | 0.16 | 0.57 |
| pagination | 0.63 | 0.34 | 0.42 | 0.22 | 0.57 |
| badge | 0.29 | 0.21 | 0.98 | 0.35 | 0.56 |
| color-picker | 0.46 | 0.29 | 0.6 | 0.26 | 0.55 |
| file-upload | 0.45 | 0.29 | 0.41 | 0.23 | 0.53 |
| app-shell | 0.54 | 0.3 | 0.38 | 0.21 | 0.51 |
| indicator | 0.3 | 0.2 | 0.87 | 0.3 | 0.51 |
| stat | 0.44 | 0.28 | 0.48 | 0.23 | 0.51 |
| cluster | 0.29 | 0.21 | 0.92 | 0.27 | 0.47 |
| row | 0.28 | 0.2 | 0.86 | 0.27 | 0.47 |
| thread | 0.52 | 0.32 | 0.26 | 0.16 | 0.47 |
| grid | 0.28 | 0.2 | 0.89 | 0.26 | 0.46 |
| stack | 0.29 | 0.2 | 0.82 | 0.25 | 0.46 |
| meter | 0.29 | 0.2 | 0.76 | 0.25 | 0.45 |
| skeleton | 0.3 | 0.21 | 0.38 | 0.24 | 0.45 |
| aspect-ratio | 0.55 | 0.32 | 0.15 | 0.12 | 0.44 |
| navigation-menu | 0.49 | 0.26 | 0.26 | 0.18 | 0.44 |
| breadcrumb | 0.46 | 0.26 | 0.29 | 0.17 | 0.44 |
| alert | 0.29 | 0.2 | 0.66 | 0.23 | 0.43 |
| form | 0.62 | 0.38 | 0.03 | 0.05 | 0.43 |
| progress | 0.3 | 0.21 | 0.43 | 0.21 | 0.41 |
| toggle-group | 0.3 | 0.21 | 0.41 | 0.19 | 0.41 |
| table | 0.29 | 0.2 | 0.3 | 0.2 | 0.4 |
| time-picker | 0.45 | 0.29 | 0.1 | 0.1 | 0.4 |
| date-picker | 0.45 | 0.29 | 0.1 | 0.1 | 0.4 |
| empty | 0.29 | 0.2 | 0.25 | 0.19 | 0.39 |
| kbd | 0.28 | 0.2 | 0.27 | 0.19 | 0.39 |
| calendar | 0.45 | 0.29 | 0.1 | 0.1 | 0.39 |
| card | 0.28 | 0.2 | 0.29 | 0.17 | 0.37 |
| resizable | 0.3 | 0.21 | 0.15 | 0.13 | 0.34 |
| label | 0.29 | 0.2 | 0.13 | 0.13 | 0.33 |
| spacer | 0.29 | 0.21 | 0.25 | 0.11 | 0.31 |
| separator | 0.3 | 0.21 | 0.07 | 0.09 | 0.3 |
| center | 0.29 | 0.21 | 0.1 | 0.08 | 0.29 |
| scroll-area | 0.3 | 0.21 | 0.03 | 0.05 | 0.26 |
| typography | 0 | 0.02 | 0.1 | 0.1 | 0.13 |
