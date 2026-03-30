import { useTranslation } from "react-i18next";
import { SelectDemo } from "./SelectComponent";
import { ToggleDemo } from "./Toggle";
import { CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Input } from "./ui/input";
import { atomWithStorage } from "jotai/utils";

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

  return (
    <CardHeader
      className={`justify-around sticky top-0 z-50 transition-colors border-b-2 border-chart-5 ${
        theme === "dark"
          ? "text-secondary bg-secondary-foreground"
          : "bg-secondary"
      } h-[60px] w-full`}
    >
      <CardTitle className="cursor-pointer" onClick={() => Navigate("/")}>
        {t("home.name")}
      </CardTitle>

      <div className="flex flex-row w-auto gap-5 items-center max-w-[150px]">
        <SelectDemo />
        <Input
          onChange={(e) => HandleSearch(e.target.value)}
          placeholder="Input search"
          className="min-w-[100px] w-[200px]"
        />
        <ToggleDemo />
      </div>
    </CardHeader>
  );
}
