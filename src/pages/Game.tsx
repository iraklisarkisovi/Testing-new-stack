"use client";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetGame } from "../requests/GetGames";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Spinner } from "../components/ui/spinner";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useAtom } from "jotai";
import { Theme } from "../components/Toggle";
import { useTranslation } from "react-i18next";
import Header from "../components/HeaderComponent";

export default function GamePage() {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const [theme] = useAtom(Theme);
  const { data, isFetching } = useQuery({
    queryKey: ["Currentgame", id],
    queryFn: () => GetGame(id),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isFetching) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center rounded-none ">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header theme={theme} />
      <Card
        className={`w-full h-full flex flex-col items-center justify-center rounded-none transition-colors ${theme === "dark" ? "bg-foreground" : "bg-accent"}`}
      >
        <Card className="relative w-full h-full min-h-[400px] flex items-center justify-center -top-4 overflow-hidden rounded-none border-none">
          <CardTitle className="text-accent z-10 text-3xl font-bold px-4 text-center">
            {data?.name}
          </CardTitle>

          <img
            src={data?.background_image}
            alt="Event cover"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </Card>

        <Card
          className={`flex flex-col z-10 rounded-none w-full p-5 gap-6 transition-colors ${theme === "dark" ? "bg-secondary-foreground text-accent" : "bg-accent"}`}
        >
          <div className="flex flex-wrap gap-4 items-start justify-start">
            {data?.rating != null && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("game.rating")}
                </span>
                <span className="text-2xl font-bold text-purple-400">
                  {data.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  / {data.rating_top}
                </span>
              </div>
            )}
            {data?.metacritic != null && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("game.metacritic")}
                </span>
                <span
                  className={`text-2xl font-bold ${data.metacritic >= 75 ? "text-green-400" : data.metacritic >= 50 ? "text-yellow-400" : "text-red-400"}`}
                >
                  {data.metacritic}
                </span>
              </div>
            )}
            {data?.playtime != null && data.playtime > 0 && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("game.avgPlaytime")}
                </span>
                <span
                  className={`text-sm font-semibold ${theme === "light" ? "text-secondary-foreground" : "text-accent"}  `}
                >
                  {data.playtime}h
                </span>
              </div>
            )}
            {data?.released && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("game.released")}
                </span>
                <span
                  className={`text-sm font-semibold ${theme === "light" ? "text-secondary-foreground" : "text-accent"}  `}
                >
                  {data.released}
                </span>
              </div>
            )}
            {data?.reviews_count != null && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("game.reviews")}
                </span>
                <span
                  className={`text-sm font-semibold ${theme === "light" ? "text-secondary-foreground" : "text-accent"}  `}
                >
                  {data.reviews_count.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <Separator />

          {data?.ratings && data.ratings.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t("game.playerRatings")}
              </span>
              <div className="flex flex-wrap gap-2">
                {data.ratings.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5">
                    <Badge
                      variant={theme === "dark" ? "secondary" : "link"}
                      className="text-xs capitalize"
                    >
                      {r.title}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {r.percent.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {data?.platforms && data.platforms.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t("game.platforms")}
              </span>
              <div className="flex flex-wrap gap-2">
                {data.platforms.map((pw) => (
                  <Badge
                    key={pw.platform.id}
                    variant="destructive"
                    className="text-xs"
                  >
                    {pw.platform.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <CardDescription className="text-xl">
            <strong className="text-purple-500">
              {t("cards.description")}
            </strong>{" "}
            {data?.description_raw || data?.description}
          </CardDescription>
        </Card>
      </Card>
    </>
  );
}
