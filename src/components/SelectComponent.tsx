import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import i18n from "i18next";
import { useEffect } from "react";

export const Language = atomWithStorage<string>("language", "en");

const items = [
  { label: "English", value: "en" },
  { label: "ქართული", value: "ka" },
];

export function SelectDemo() {
  const [language, setLanguage] = useAtom(Language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  function handleLanguageChange(value: string) {
    setLanguage(value);
  }

  return (
    <Select items={items} value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full max-w-48 cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{language === "ka" ? "ენა" : "Language"}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
