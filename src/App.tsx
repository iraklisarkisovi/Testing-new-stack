import "./App.css";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { ToggleDemo } from "./components/Toggle";
import { useQuery } from "@tanstack/react-query";
import { GetGames } from "./requests/GetGames";
import type { Game } from "./types/types";
import { CardImage } from "./components/GameComponent";
import { SpinnerEmpty } from "./components/LoadingComponent";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Games"],
    queryFn: GetGames,
  });

  console.log(data);
  return (
    <>
      <CardHeader className="justify-around text-secondary bg-secondary-foreground h-[60px]">
        <CardTitle>Website Name</CardTitle>
        <ToggleDemo />
      </CardHeader>
      {isLoading ? (
        <Card className="w-full h-screen flex flex-col items-center justify-center max-md:grid-cols-2 max-sm:grid-cols-1 rounded-none bg-foreground">
          <SpinnerEmpty />
        </Card>
      ) : (
        <Card className="w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 h-full rounded-none bg-foreground">
          {data?.map((item: Game) => (
            <CardImage
              image={item.background_image}
              rating={item.rating}
              name={item.name}
            />
          ))}
        </Card>
      )}

      <CardFooter className="flex flex-col bg-secondary-foreground text-accent items-start justify-between">
        <CardTitle>Website Name</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
          aperiam?
        </CardDescription>
      </CardFooter>
    </>
  );
}

export default App;
