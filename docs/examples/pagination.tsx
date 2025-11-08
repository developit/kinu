import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from 'pui';

export function Demo() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink aria-current="page">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}

export const code = `<Pagination>...</Pagination>`;

export default {Demo, code};
