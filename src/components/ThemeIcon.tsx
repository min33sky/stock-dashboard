import { MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeIcon() {
  return (
    <button className="border-1 absolute right-8 rounded-lg border-neutral-400 p-2 shadow-lg xl:right-32">
      <MoonIcon className="h-8 w-8 cursor-pointer fill-none stroke-neutral-400 stroke-1" />
    </button>
  );
}
