import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/uiBase/pagination";
import { useList } from "@/context/ListContext";

export const PaginationUI = () => {
  const { currentPage, totalPages, onPaginate } = useList();

  const getPages = () => {
    const pages = [];
    const delta = 1;

    const firstPage = 0;
    const lastPage = totalPages - 1;

    const start = Math.max(currentPage - delta, firstPage + 1);
    const end = Math.min(currentPage + delta, lastPage - 1);

    pages.push(firstPage);

    if (start > firstPage + 1) {
      pages.push("left-ellipsis");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < lastPage - 1) {
      pages.push("right-ellipsis");
    }

    if (end < lastPage) {
      pages.push(lastPage);
    }

    return [...new Set(pages)];
  };

  const pagesToShow = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPaginate(currentPage - 1)}
            disabled={currentPage === 0}
            className={`text-xs px-2.5 py-1            
                        sm:text-sm sm:px-3 sm:py-1.25
                        md:text-base md:px-3.5 md:py-1.5
                        lg:px-4 lg:py-1.75
              flex items-center gap-1 bg-transparent border-none rounded-md  transition text-info-content ${
                currentPage === 0
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer hover:bg-blue-200 hover:font-semibold"
              }`}
          >
            <span className="text-lg">&lt;</span> Previous
          </PaginationPrevious>
        </PaginationItem>
        {pagesToShow.map((page, idx) =>
          typeof page === "string" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis
                className="text-xs font-bold text-info-content 
                            sm:text-sm 
                            md:text-base
                             "
              />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPaginate(page)}
                className={`text-[10px] px-1.75 py-0.5            
                            sm:text-xs sm:px-2.25 sm:py-0.75
                            md:text-sm md:px-3 md:py-1
                             lg:px-3.5 lg:py-1.25
                   rounded-md transition cursor-pointer ${
                     page === currentPage
                       ? "font-bold text-[#2B89A8] bg-blue-200 border border-blue-500 shadow-lg"
                       : "hover:bg-blue-200 hover:text-[#2B89A8] text-info-content border border-transparent"
                   }`}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPaginate(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={` text-xs px-2.5 py-1            
                         sm:text-sm sm:px-3 sm:py-1.25
                         md:text-base md:px-3.5 md:py-1.5
                         lg:text-base lg:px-4 lg:py-1.75
              flex items-center gap-1  bg-transparent border-none rounded-md transition text-info-content ${
                currentPage === totalPages - 1
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer hover:bg-blue-200 hover:font-semibold"
              }`}
          >
            Next <span className="text-lg">&gt;</span>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
