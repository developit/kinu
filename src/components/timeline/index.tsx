import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TimelineEntryOwnProps, TimelineOwnProps} from './types';
import './style.css';

const TimelineRoot = createSimpleComponent<'ol', TimelineOwnProps>(
  'timeline',
  'ol',
);

const TimelineEntry = createSimpleComponent<'li', TimelineEntryOwnProps>(
  'timeline-entry',
  'li',
);

type TimelineComponent = typeof TimelineRoot & {Entry: typeof TimelineEntry};

export const Timeline = TimelineRoot as TimelineComponent;
Timeline.Entry = TimelineEntry;
