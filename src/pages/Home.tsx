import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Theme, ToggleDemo } from "../components/Toggle";
import { useQuery } from "@tanstack/react-query";
import { GetGames } from "../requests/GetGames";
import type { Game } from "../types/types";
import { CardImage } from "../components/GameComponent";
import { useEffect, useState } from "react";
import { PaginationComponent } from "../components/PaginationComponent";
import { SkeletonCard } from "../components/GameSkeleton";
import { useAtom } from "jotai";

function Home() {
  const [theme] = useAtom(Theme);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["Games", page],
    queryFn: () => GetGames(page, pageSize),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <CardHeader
        className={`justify-around transition-colors   ${theme === "dark" ? "text-secondary bg-secondary-foreground" : "bg-secondary"}  h-[60px]`}
      >
        <CardTitle className="cursor-pointer">Website Name</CardTitle>
        <ToggleDemo />
      </CardHeader>
      {isLoading ? (
        <Card
          className={`w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 h-full rounded-none ${theme === "dark" ? "bg-foreground  text-accent" : "bg-accent"}`}
        >
          {[1, 2, 3, 4, 5, 6].map((it) => (
            <SkeletonCard key={it} />
          ))}
        </Card>
      ) : (
        <>
          <Card
            className={`w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 h-full rounded-none transition-colors  ${theme === "dark" ? "text-secondary bg-foreground" : "bg-accent"}`}
          >
            {data?.map((item: Game) => (
              <CardImage
                id={item.id}
                image={item.background_image}
                rating={item.rating}
                name={item.name}
                key={item.id}
              />
            ))}
          </Card>
        </>
      )}
      <PaginationComponent currentPage={page} setPage={setPage} />

      <CardFooter
        className={`flex flex-col transition-colors  ${theme === "dark" ? "bg-secondary-foreground text-accent" : "bg-accent"} text-accent items-start justify-between`}
      >
        <CardTitle>Website Name</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
          aperiam?
        </CardDescription>
      </CardFooter>
    </>
  );
}

export default Home;
