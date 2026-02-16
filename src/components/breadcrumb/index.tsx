import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  BreadcrumbOwnProps,
  BreadcrumbListOwnProps,
  BreadcrumbItemOwnProps,
  BreadcrumbLinkOwnProps,
} from './types';
import './style.css';

export const Breadcrumb = createSimpleComponent<'nav', BreadcrumbOwnProps>(
  'breadcrumb',
  'nav',
);
export const BreadcrumbList = createSimpleComponent<
  'ol',
  BreadcrumbListOwnProps
>('breadcrumb-list', 'ol');
export const BreadcrumbItem = createSimpleComponent<
  'li',
  BreadcrumbItemOwnProps
>('breadcrumb-item', 'li');
export const BreadcrumbLink = createSimpleComponent<
  'a',
  BreadcrumbLinkOwnProps
>('breadcrumb-link', 'a');
