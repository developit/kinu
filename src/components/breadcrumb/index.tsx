import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Breadcrumb = createSimpleComponent('breadcrumb', 'nav');
export const BreadcrumbList = createSimpleComponent('breadcrumb-list', 'ol');
export const BreadcrumbItem = createSimpleComponent('breadcrumb-item', 'li');
export const BreadcrumbLink = createSimpleComponent('breadcrumb-link', 'a');
