import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Theme } from "../components/Toggle";
import { useQueries } from "@tanstack/react-query";
import { GetGames } from "../requests/GetGames";
import type { Game } from "../types/types";
import { CardImage } from "../components/GameComponent";
import { useEffect, useState } from "react";
import { PaginationComponent } from "../components/PaginationComponent";
import { SkeletonCard } from "../components/GameSkeleton";
import { useAtom } from "jotai";
import Header, { search } from "../components/HeaderComponent";
import { useTranslation } from "react-i18next";

const TOTAL_PAGES = 4;
const PAGE_SIZE = 6;

function Home() {
  const { t } = useTranslation();
  const [Search, setSearch] = useAtom(search);
  const [theme] = useAtom(Theme);
  const [page, setPage] = useState(1);

  const results = useQueries({
    queries: Array.from({ length: TOTAL_PAGES }, (_, i) => ({
      queryKey: ["Games", +1],
      queryFn: () => GetGames(i + 1, PAGE_SIZE),
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    })),
  });

  const isSearching = !!Search && (Search as string).trim() !== "";
  useEffect(() => {
    setSearch("");
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page, isSearching]);

  const currentPageResult = results[page - 1];
  const isLoading = isSearching
    ? results.some((r) => r.isLoading)
    : currentPageResult.isLoading;

  const displayedGames: Game[] = isSearching
    ? results
        .flatMap((r) => r.data ?? [])
        .filter((game) =>
          game.name
            .toLocaleLowerCase()
            .includes((Search as string).toLocaleLowerCase()),
        )
    : (currentPageResult.data ?? []);

  return (
    <>
      <Header theme={theme} />
      {isLoading ? (
        <Card
          className={`w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 h-full rounded-none ${theme === "dark" ? "bg-foreground  text-accent" : "bg-accent"}`}
        >
          {[1, 2, 3, 4, 5, 6].map((it) => (
            <SkeletonCard key={it} />
          ))}
        </Card>
      ) : (
        <Card
          className={`w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 min-h-dvh   rounded-none transition-colors  ${theme === "dark" ? "text-secondary bg-foreground" : "bg-accent"}`}
        >
          {displayedGames.length > 0 ? (
            displayedGames.map((item: Game) => (
              <CardImage
                id={item.id}
                image={item.background_image}
                rating={item.rating}
                name={item.name}
                key={item.id}
              />
            ))
          ) : (
            <div className="w-screen h-fit mt-10 flex items-center justify-center">
              <h1 className="text-2xl">No results found.</h1>
            </div>
          )}
        </Card>
      )}
      {!isSearching && (
        <PaginationComponent currentPage={page} setPage={setPage} />
      )}

      <CardFooter
        className={`flex flex-col transition-colors  ${theme === "dark" ? "bg-secondary-foreground text-accent" : "bg-accent"} text-accent items-start justify-between`}
      >
        <CardTitle>{t("home.name")}</CardTitle>
        <CardDescription>{t("home.description")}</CardDescription>
      </CardFooter>
    </>
  );
}

export default Home;
