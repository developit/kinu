// Re-exported, not just referenced: `void X` lets the bundler drop X entirely,
// so the measurement would be of the module's side effects alone.
export {Button} from '../../../src/components/button';
export {Input} from '../../../src/components/input';
export {Dialog} from '../../../src/components/dialog';
export {Popover} from '../../../src/components/popover';
export {Tab, TabList, TabPanel} from '../../../src/components/tabs';
