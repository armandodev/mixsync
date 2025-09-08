"use client";

import { useState } from "react";
import type { Result } from "@/types/result";
import { Track } from "@/components/ui";
import { X } from "lucide-react";

const DIALOG_TIMEOUT = 5000;

export default function TrackList({
  results,
  error,
}: {
  results: Result[];
  error: string | null;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMessage = (msg: string) => {
    setMessage(msg);
    setIsDialogOpen(true);
    setTimeout(() => {
      setIsDialogOpen(false);
    }, DIALOG_TIMEOUT - 500);
    setTimeout(() => {
      setMessage(null);
    }, DIALOG_TIMEOUT);
  };
  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    handleMessage("URL copiada al portapapeles");
  };
  const copyFileName = (name: string, artist: string) => {
    navigator.clipboard.writeText(`${name} - ${artist}.mp3`);
    handleMessage("Nombre de archivo copiado al portapapeles");
  };
  const download = (url: string) => {
    window.open(url, "_blank");
    handleMessage("Descarga iniciada");
  };
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full align-baseline">
      <div
        role="alert"
        className={`fixed w-full inset-x-0 bottom-4 rounded-lg px-4 z-50 opacity-0 scale-0 transition-all duration-500 ${
          isDialogOpen ? "opacity-100 scale-100" : ""
        }`}
      >
        <p className="flex gap-2 justify-between items-center w-full max-w-screen-lg mx-auto border border-green-500 bg-green-200 text-green-500 p-2 rounded-lg">
          {message}
          <button
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Cerrar"
          >
            <X />
          </button>
        </p>
      </div>
      {error && (
        <p className="col-span-2 sm:col-span-3 lg:col-span-4 text-red-500 p-4 rounded-lg shadow-md border border-red-500 bg-red-200">
          {error}
        </p>
      )}
      {results.length > 0 &&
        !error &&
        results.map((track) => (
          <Track
            key={track.id}
            track={track}
            copyUrl={() => copyUrl(track.url)}
            copyFileName={() => copyFileName(track.title, track.artist)}
            download={() => download(track.url)}
          />
        ))}
    </ul>
  );
}
