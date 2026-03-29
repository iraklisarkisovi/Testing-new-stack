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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [theme] = useAtom(Theme);
  const navigate = useNavigate();
  const Navigate = useNavigate();
  return (
    <Card
      className="relative mx-auto w-full max-w-sm pt-0 mb-2 cursor-pointer 
           border-bv border-r border-transparent 
           transition-all duration-300 ease-in-out 
           hover:border-chart-4 hover:drop-shadow-2xl"
      onClick={() => Navigate("/game/" + id)}
    >
      <img
        src={image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader
        className={` transition-colors ${theme === "dark" ? "bg-secondary-foreground text-accent" : "bg-accent"}`}
      >
        <CardTitle>{name}</CardTitle>
        <CardAction className="p-5">
          <Badge
            variant={
              rating != undefined && rating >= 3.6 ? "secondary" : "destructive"
            }
          >
            {t("cards.rating")}
            {rating}
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
          {t("cards.button")}
        </Button>
      </CardFooter>
    </Card>
  );
}
