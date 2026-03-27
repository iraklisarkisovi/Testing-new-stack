import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAtom } from "jotai";
import { Theme } from "./Toggle";

export function CardImage({
  id,
  name,
  rating,
  image,
}: {
  id: number | undefined;
  name: string | undefined;
  rating: number | undefined;
  image: string | undefined;
}) {
  const [theme] = useAtom(Theme);

  const navigate = useNavigate();
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 mb-2">
      <img
        src={image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader
        className={`${theme === "dark" ? "bg-secondary-foreground text-accent" : "bg-accent"}`}
      >
        <CardTitle>{name}</CardTitle>
        <CardAction className="p-5">
          <Badge
            variant={
              rating != undefined && rating >= 3.6 ? "secondary" : "destructive"
            }
          >
            Rating: {rating}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter
        className={theme === "dark" ? "bg-secondary-foreground" : "bg-accent"}
      >
        <Button
          className="w-full cursor-pointer"
          onClick={() => navigate(`/game/${id}`)}
        >
          View more
        </Button>
      </CardFooter>
    </Card>
  );
}
