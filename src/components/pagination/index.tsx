import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Pagination = createSimpleComponent('pagination', 'nav');
export const PaginationList = createSimpleComponent('pagination-list', 'ul');
export const PaginationItem = createSimpleComponent('pagination-item', 'li');
export const PaginationLink = createSimpleComponent('pagination-link', 'button');
