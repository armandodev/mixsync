import { useState } from "react";
import type { Result } from "@/types/result";
import { SpotifyIcon, CopyIcon } from "@/components/icons";

const COPY_FEEDBACK_DURATION = 3000;
const FADE_DURATION = 200;

export default function Track({ track }: { track: Result }) {
  const [modalMessage, setModalMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(track.url);
      setModalMessage("URL copiada");
      setShowModal(true);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTimeout(() => setShowModal(false), FADE_DURATION);
      }, COPY_FEEDBACK_DURATION);
    } catch (error) {
      console.error("Error al copiar la URL:", error);
    }
  };

  const handleCopyFileName = async () => {
    try {
      await navigator.clipboard.writeText(
        `${track.artist} - ${track.title}.mp3`
      );
      setModalMessage("Nombre de archivo copiado");
      setShowModal(true);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTimeout(() => setShowModal(false), FADE_DURATION);
      }, COPY_FEEDBACK_DURATION);
    } catch (error) {
      console.error("Error al copiar el nombre de archivo:", error);
    }
  };

  return (
    <li className="w-full rounded-lg border-2 border-gray-300 p-2 flex items-center justify-between gap-4 relative">
      {showModal && (
        <div
          className={`copy-alert fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w- p-4 box-border ${
            copied ? "animate-fade-in" : "animate-fade-out"
          }`}
          role="alert"
        >
          <p className="w-full text-center p-4 border border-gray-500 bg-gray-200 text-gray-500 rounded-lg">
            {modalMessage}
          </p>
        </div>
      )}
      <header className="flex items-center gap-2">
        <img
          className="w-20 aspect-square rounded-lg"
          src={track.image}
          alt={track.title}
        />
        <div>
          <h3 className="text-xl">{track.title}</h3>
          <p className="text-gray-500">{track.artist}</p>
        </div>
      </header>
      <ul className="flex justify-end gap-2">
        <li>
          <button
            className="cursor-pointer"
            onClick={handleCopy}
            title="Copiar URL"
          >
            <CopyIcon />
          </button>
        </li>
        <li>
          <button
            className="cursor-pointer"
            onClick={handleCopyFileName}
            title="Copiar nombre de archivo"
          >
            .mp3
          </button>
        </li>
        <li>
            <a
              href={track.url}
              target="_blank"
              rel="noreferrer"
              title="Ver en Spotify"
            >
              <SpotifyIcon />
            </a>
        </li>
      </ul>
    </li>
  );
}
