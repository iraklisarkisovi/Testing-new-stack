import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { atom, useAtom } from "jotai";
import i18n from "i18next";

export const Language = atom<string>("en");

const items = [
  { label: "English", value: "en" },
  { label: "ქართული", value: "ka" },
];

export function SelectDemo() {
  const [language, setLanguage] = useAtom(Language);

  function handleLanguageChange(value: string) {
    setLanguage(value);
    i18n.changeLanguage(value);
  }

  return (
    <Select items={items} value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full max-w-48">
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
