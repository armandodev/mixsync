import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrackById } from "@/utils/spotify";
import { Result } from "@/types/result";
import Image from "next/image";
import Link from "next/link";

type TrackRouteParams = { id: string };
type MaybePromise<T> = T | Promise<T>;
interface ParamsArg {
  params: MaybePromise<TrackRouteParams>;
}

export async function generateMetadata({
  params,
}: ParamsArg): Promise<Metadata> {
  const { id } = await params;
  const track: Result = await getTrackById(id);
  if (!track) notFound();

  const title = `${track.title} - ${track.artist}`;
  const description = `Descarga ${track.title} de ${track.artist} fácilmente.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: track.url,
      images: [
        {
          url: track.image,
          alt: title,
        },
      ],
    },
  };
}

export default async function TrackPage({ params }: ParamsArg) {
  const { id } = await params;
  let track: Result;
  try {
    track = await getTrackById(id);
  } catch (error) {
    console.error("Error fetching track:", error);
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <Image
          className="w-48 h-48 rounded-lg shadow-lg mb-4"
          width={150}
          height={150}
          src={track.image || "/default.png"}
          alt={track.title || "Imagen de la canción"}
        />
        <h1 className="text-2xl font-bold mb-2">{track.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{track.artist}</p>
        <Link
          href={track.url}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Escuchar
        </Link>
      </div>
    </div>
  );
}
