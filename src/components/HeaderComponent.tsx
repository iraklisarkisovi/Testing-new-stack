import { useTranslation } from "react-i18next";
import { SelectDemo } from "./SelectComponent";
import { ToggleDemo } from "./Toggle";
import { CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Input } from "./ui/input";
import { atomWithStorage } from "jotai/utils";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const search = atomWithStorage("search", "");

export default function Header({
  theme,
}: {
  theme: string | "dark" | "light";
}) {
  const { t } = useTranslation();
  const [Search, setSearch] = useAtom(search);
  const Navigate = useNavigate();

  const HandleSearch = (value: string) => {
    setSearch(value);
    console.log(Search);
  };

  const controls = (
    <>
      <SelectDemo />
      <Input
        onChange={(e) => HandleSearch(e.target.value)}
        placeholder="Input search"
        className="min-w-[100px] w-[200px]"
      />
      <ToggleDemo />
    </>
  );

  return (
    <CardHeader
      className={`justify-between sticky top-0 z-50 transition-colors border-b-2 border-chart-5 ${
        theme === "dark"
          ? "text-secondary bg-secondary-foreground"
          : "bg-secondary"
      } h-[60px] w-full`}
    >
      <CardTitle className="cursor-pointer" onClick={() => Navigate("/")}>
        {t("home.name")}
      </CardTitle>

      {/* Desktop controls */}
      <div className="hidden sm:flex flex-row gap-5 items-center">
        {controls}
      </div>

      {/* Mobile burger menu */}
      <div className="flex sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{t("home.name")}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              {controls}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </CardHeader>
  );
}
