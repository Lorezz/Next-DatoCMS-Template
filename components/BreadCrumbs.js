import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const BreadCrumbs = ({ paths }) => {
  return (
    <Breadcrumb>
      {paths.map((p) => (
        <BreadcrumbItem key={p.title} isCurrentPage={p.isCurrentPage}>
          <Link href={p.path}>
            <BreadcrumbLink
              as="a"
              fontSize={'sm'}
              fontWeight="medium"
              style={{ textTransform: 'uppercase' }}>
              {p.title}
            </BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;



