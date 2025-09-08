import { GithubIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="max-w-screen-lg h-20 p-4 mx-auto">
      <ul className="w-full h-full flex items-center justify-between gap-4">
        <li>
          Una iniciativa de{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://github.com/armandodev"
            target="_blank"
            rel="noreferrer"
          >
            @armandodev
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
            href="https://github.com/armandodev/mixsync"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            Repo
          </a>
        </li>
      </ul>
    </footer>
  );
}
