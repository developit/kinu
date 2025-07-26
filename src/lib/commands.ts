export const supportsCommand = 'command' in HTMLButtonElement.prototype;

if (!supportsCommand) {
  addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest(
      '[commandfor]',
    ) as HTMLElement | null;
    if (!trigger) return;
    if (e.defaultPrevented) return;

    const target = document.getElementById(trigger.getAttribute('commandfor')!);
    if (!target) return;

    const command = trigger.getAttribute('command');
    if (!command) return;

    if (command[0] === '-') {
      const ce = new Event('command', {bubbles: true, cancelable: true});
      Object.defineProperties(ce, {
        source: {value: trigger},
        command: {value: command},
      });
      target.dispatchEvent(ce);
      return;
    }

    const method = command.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    (target as any)[method]?.();
  });
}
