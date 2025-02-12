import { AppLogo } from "../icons";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4 max-w-screen-lg h-20 mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <AppLogo />
        MixSync
      </h1>
    </header>
  );
}
