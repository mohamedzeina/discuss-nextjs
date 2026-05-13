import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm font-mono flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1 min-w-0">
              {index > 0 && (
                <span
                  aria-hidden
                  className="text-ink-3 px-0.5 select-none"
                >
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="text-ink font-semibold truncate max-w-[220px] lowercase"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="ink-link text-ink-2 hover:text-persimmon transition-colors duration-200 motion-reduce:transition-none lowercase"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
