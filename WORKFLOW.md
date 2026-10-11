---
checks:
  - label: Typecheck
    command: pnpm exec tsc
  - label: Build
    command: pnpm build
  - label: Test
    command: pnpm test
hooks:
  after_create: pnpm install --frozen-lockfile
  timeout_ms: 300000
agent:
  max_fix_attempts: 2
---
You are working on {{ issue.identifier }}: {{ issue.title }} in {{ project.name }}.
{% if attempt %}
This is attempt {{ attempt }}. Resume from the workspace as it is; don't redo finished work.
{% endif %}
- Reproduce or confirm the current behaviour before changing it.
- Keep the change scoped to this issue; file follow-ups for anything else.
- Run the checks above before finishing.
