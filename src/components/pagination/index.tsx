import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  PaginationOwnProps,
  PaginationListOwnProps,
  PaginationItemOwnProps,
  PaginationLinkOwnProps,
} from './types';
import './style.css';

export const Pagination = createSimpleComponent<'nav', PaginationOwnProps>(
  'pagination',
  'nav',
);
export const PaginationList = createSimpleComponent<'ul', PaginationListOwnProps>(
  'pagination-list',
  'ul',
);
export const PaginationItem = createSimpleComponent<'li', PaginationItemOwnProps>(
  'pagination-item',
  'li',
);
export const PaginationLink = createSimpleComponent<
  'button',
  PaginationLinkOwnProps
>('pagination-link', 'button');
