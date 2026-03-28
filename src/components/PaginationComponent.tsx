import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { useAtom } from "jotai";
import { Theme } from "./Toggle";
import { Language } from "./SelectComponent";

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export const PaginationComponent = ({
  setPage,
  currentPage,
}: PaginationProps) => {
  const [Lang] = useAtom(Language);

  const [theme] = useAtom(Theme);

  const HandlePrevPage = () => {
    if (currentPage < 1) {
      setPage((prev) => prev - 1);
    } else {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <Pagination
      className={`${theme === "dark" ? "bg-secondary-foreground  text-accent" : "bg-secondary"} h-[60px]`}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            language={Lang}
            isCurrent={false}
            onClick={() => HandlePrevPage()}
          />
        </PaginationItem>
        {[1, 2, 3, 4].map((it) => (
          <PaginationItem key={it}>
            <PaginationLink
              isCurrent={currentPage === it ? true : false}
              onClick={() => setPage(it)}
            >
              {it}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            language={Lang}
            isCurrent={false}
            onClick={() => setPage((prev) => prev + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
