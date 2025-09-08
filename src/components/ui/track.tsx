"use client";

import type { Result } from "@/types/result";
import { SpotifyIcon } from "@/components/icons";
import { Copy, Download, File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrackProps {
  track: Result;
  copyUrl: () => void;
  copyFileName: () => void;
  download: () => void;
}

export default function Track({
  track,
  copyUrl,
  copyFileName,
  download,
}: TrackProps) {
  const UTILS = [
    { name: "Copiar URL", icon: Copy, action: copyUrl },
    {
      name: "Copiar nombre de archivo",
      icon: File,
      action: copyFileName,
    },
    { name: "Descargar", icon: Download, action: download },
  ];

  return (
    <li className="grid gap-4 justify-between p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 w-full">
      <Link
        className="grid gap-2 hover:scale-105 transition-transform duration-200"
        href={`/track/${track.id}`}
      >
        <Image
          className="w-full aspect-square object-center object-cover rounded-lg mb-2 shadow-md"
          width={150}
          height={150}
          src={track.image || "/default.png"}
          alt={track.title || "Imagen de la canción"}
          loading="lazy"
        />
        <div role="text">
          <h3 className="text-sm sm:text-normal md:text-lg font-semibold">
            {track.title}
          </h3>
          <p className="text-sm sm:text-normal md:text-lg text-gray-500">
            {track.artist}
          </p>
        </div>
      </Link>
      <ul className="flex flex-wrap items-end justify-evenly gap-2">
        {UTILS.map((util) => (
          <li key={util.name}>
            <button
              className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={util.action}
              aria-label={util.name}
            >
              <util.icon className="w-5 h-5" />
            </button>
          </li>
        ))}
        <li>
          <Link
            className="flex items-center bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all duration-200 hover:scale-105"
            href={track.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Escuchar en Spotify"
          >
            <SpotifyIcon />
          </Link>
        </li>
      </ul>
    </li>
  );
}
