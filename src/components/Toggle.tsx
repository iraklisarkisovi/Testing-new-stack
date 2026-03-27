import { Toggle } from "../components/ui/toggle";
import { MoonIcon } from "lucide-react";
import { atom, useAtom } from "jotai";

export const Theme = atom<string | "dark" | "light">("dark");

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
