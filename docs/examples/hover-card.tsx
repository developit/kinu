import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'kinu';

export function Demo() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent>More info</HoverCardContent>
    </HoverCard>
  );
}

export const code = `<HoverCard>...</HoverCard>`;

export default {Demo, code};
