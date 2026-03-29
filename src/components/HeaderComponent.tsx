import { useTranslation } from "react-i18next";
import { SelectDemo } from "./SelectComponent";
import { ToggleDemo } from "./Toggle";
import { CardHeader, CardTitle } from "./ui/card";

export default function Header({ theme }: { theme: string | "ka" | "en" }) {
  const { t } = useTranslation();

  return (
    <CardHeader
      className={`justify-around transition-colors ${theme === "dark" ? "text-secondary bg-secondary-foreground" : "bg-secondary"} h-[60px]`}
    >
      <CardTitle className="cursor-pointer">{t("home.name")}</CardTitle>
      <div className="flex flex-row w-full gap-5 items-center max-w-[150px]">
        <SelectDemo />
        <ToggleDemo />
      </div>
    </CardHeader>
  );
}
