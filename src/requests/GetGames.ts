import type { Game } from "../types/types";

const apikey = import.meta.env.VITE_API_KEY;

export const GetGames = async (page: number, pageSize: number) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${apikey}&page=${page}&page_size=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apikey}`,
      },
    },
  );
  if (!res.ok) {
    throw "api request failed";
  }
  const Response = await res.json();
  const games: Game[] = Response.results;
  return games;
};

export const GetGame = async (GameId: string | undefined) => {
  const res = await fetch(`https://api.rawg.io/api/games/${GameId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apikey}`,
    },
  });
  if (!res.ok) {
    throw "api request failed";
  }
  const Response = await res.json();
  const game: Game = Response;
  return game;
};
