"use client";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetGame } from "../requests/GetGames";
import { CardImage } from "../components/GameComponent";
import { Card, CardDescription, CardTitle } from "../components/ui/card";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Currentgame"],
    queryFn: () => GetGame(id),
  });

  console.log(data);
  return (
    <>
      <Card className="w-full h-full flex flex-col items-center justify-center rounded-none bg-foreground">
        <Card className="relative aspect-video flex items-center justify-center -top-4 w-full h-full overflow-hidden">
          <CardTitle className="text-accent z-10 text-2xl">
            {data?.name}
          </CardTitle>

          <img
            src={data?.background_image}
            alt="Event cover"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />

          <Card className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-none"></Card>
        </Card>
        <Card className="flex flex-col z-10 rounded-none text-accent w-full h-screen p-5 bg-secondary-foreground">
          <CardDescription className="text-xl">
            <strong className="text-purple-500">Description:</strong>{" "}
            {data?.description}
          </CardDescription>
        </Card>
      </Card>
    </>
  );
}
