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

export const Language = atom<string>("en");

const items = [
  { label: "English", value: "en" },
  { label: "ქართული", value: "ge" },
];

export function SelectDemo() {
  const [language, setLanguage] = useAtom(Language);

  return (
    <Select items={items} value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{language === "ge" ? "ენა" : "Language"}</SelectLabel>
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
