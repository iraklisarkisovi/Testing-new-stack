"use client";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetGame } from "../requests/GetGames";
import { CardImage } from "../components/GameComponent";
import { Card } from "../components/ui/card";

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
      <Card className="w-ful h-screen flex items-center justify-center rounded-none bg-foreground">
        <CardImage
          id={data?.id}
          image={data?.background_image}
          rating={data?.rating}
          name={data?.name}
          key={data?.id}
        />
      </Card>
    </>
  );
}
