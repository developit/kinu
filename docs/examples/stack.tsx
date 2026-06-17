import {Stack} from 'kinu';

function Box({children}: {children: string}) {
  return (
    <div
      style={{
        padding: '0.5rem 0.75rem',
        borderRadius: 'var(--k-radius)',
        background: 'hsl(var(--k-secondary))',
        color: 'hsl(var(--k-secondary-foreground))',
        fontSize: '0.875rem',
      }}
    >
      {children}
    </div>
  );
}

export function Demo() {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <strong>gap="sm"</strong>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </Stack>
      <Stack gap="md" align="center">
        <strong>gap="md" · align="center"</strong>
        <Box>Centered</Box>
        <Box>Items</Box>
      </Stack>
    </Stack>
  );
}

export const code = `<Stack gap="md">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Stack>`;

export default {Demo, code};
