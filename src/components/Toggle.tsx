import { Toggle } from "../components/ui/toggle";
import { MoonIcon } from "lucide-react";

export function ToggleDemo() {
  return (
    <Toggle
      className="cursor-pointer"
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
    >
      <MoonIcon className="group-data-[state=on]/toggle:fill-foreground" />
    </Toggle>
  );
}
