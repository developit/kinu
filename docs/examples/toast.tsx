import {Button, Menubar, toast} from 'kinu';

export function Demo() {
  return (
    <Menubar>
      <Button onClick={() => toast.show('Hello from toast!')}>
        Basic Toast
      </Button>
      <Button
        onClick={() =>
          toast.show('Your event has been successfully created!', {
            title: 'Event created',
            icon: '🎉',
            action: <Button>Undo</Button>,
            duration: 5000,
          })
        }
      >
        With Title
      </Button>
    </Menubar>
  );
}

export const code = `<Button onClick={() => toast.show('msg')}>Show Toast</Button>`;

export default {Demo, code};
