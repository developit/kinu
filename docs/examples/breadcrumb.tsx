import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from 'kinu';

export function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const code = `<Breadcrumb>...</Breadcrumb>`;

export default {Demo, code};
