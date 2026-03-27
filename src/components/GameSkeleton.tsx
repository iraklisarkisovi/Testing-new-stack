import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="w-full">
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardHeader className="flex mt-5 flex-row items-start justify-center">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-1/4" />
      </CardHeader>
      <CardFooter className="flex mt-4 items-center justify-center bg-secondary-foreground">
        <Skeleton className="h-7 w-full" />
      </CardFooter>
    </Card>
  );
}
