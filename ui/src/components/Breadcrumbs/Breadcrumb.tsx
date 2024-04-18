import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  previousPage?: string;
  previousPageLink?: string;
}
const Breadcrumb = ({ pageName, previousPage, previousPageLink }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          {/* If there is no previous page, don't show the link */
          previousPage && 
          <li>
            <Link className="font-medium" href={previousPageLink!}>
              {previousPage} /
            </Link>
            </li>
            }
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
