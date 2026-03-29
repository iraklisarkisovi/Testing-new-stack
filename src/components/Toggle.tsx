import { Toggle } from "../components/ui/toggle";
import { MoonIcon } from "lucide-react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const Theme = atomWithStorage<"dark" | "light">("theme", "dark");

export function ToggleDemo() {
  const [theme, setTheme] = useAtom(Theme);

  return (
    <Toggle
      className="cursor-pointer"
      aria-label="Toggle bookmark"
      size="sm"
      variant={theme === "dark" ? "dark" : "outline"}
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    >
      <MoonIcon className="group-data-[state=on]/toggle:fill-foreground" />
    </Toggle>
  );
}
