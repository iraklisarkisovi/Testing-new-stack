import { useTranslation } from "react-i18next";
import { SelectDemo } from "./SelectComponent";
import { ToggleDemo } from "./Toggle";
import { CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function Header({ theme }: { theme: string | "ka" | "en" }) {
  const { t } = useTranslation();
  const Navigate = useNavigate();

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
      <div className="flex flex-row w-full gap-5 items-center max-w-[150px]">
        <SelectDemo />
        <ToggleDemo />
      </div>
    </CardHeader>
  );
}
