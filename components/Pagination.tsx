import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationPage() {
  return (
    <div className="flex mt-5 align-middle justify-center">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        
        
        <PaginationItem>
          <PaginationLink
            href="#">
            Page 1 of 6
          </PaginationLink>
        </PaginationItem>
      
        
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  )
}
