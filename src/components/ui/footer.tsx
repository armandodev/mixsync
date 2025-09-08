import { GithubIcon } from "@/components/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4">
      <ul className="max-w-screen-lg h-20 p-4 mx-auto flex items-center justify-between gap-4">
        <li>
          Una iniciativa de{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="https://armandodev-portfolio.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            @armandodev
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
            href="https://github.com/armandodev/mixsync"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            Repo
          </Link>
        </li>
      </ul>
    </footer>
  );
}
