import { notFound } from "next/navigation";
import { getTrackById } from "@/utils/spotify";
import { Result } from "@/types/result";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const track: Result = await getTrackById(params.id);
  if (!track) {
    notFound();
  }

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
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function Track({ params }: PageProps) {
  let track: Result;
  try {
    track = await getTrackById(params.id);
  } catch (error) {
    console.error("Error fetching track:", error);
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <img
          src={track.image}
          alt={track.title}
          className="w-48 h-48 rounded-lg shadow-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{track.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{track.artist}</p>
        <a
          href={track.url}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Escuchar
        </a>
      </div>
    </div>
  );
}
