import {Toggle, ToggleGroup} from 'pui';
import {useState} from 'preact/hooks';

export function Demo() {
  const [toggleGroup, setToggleGroup] = useState<string[]>([]);
  return (
    <ToggleGroup
      type="multiple"
      value={toggleGroup}
      onValueChange={setToggleGroup}
    >
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  );
}

export const code = `<ToggleGroup>...</ToggleGroup>`;

export default {Demo, code};
