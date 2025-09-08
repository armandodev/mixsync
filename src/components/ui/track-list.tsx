import type { Result } from "@/types/result";
import { Track } from "@/components/ui";

export default function TrackList({
  results,
  error,
}: {
  results: Result[];
  error: string | null;
}) {
  if (!results) {
    console.log("Error cargando los resultados", error);
  }
  return (
    <ul className="flex flex-wrap gap-4">
      {error && (
        <li
          key={error}
          className="w-full border border-red-500 bg-red-200 text-red-500 p-2 rounded-lg"
        >
          {error}
        </li>
      )}
      {results.length > 0 &&
        results.map((track) => <Track key={track.id} track={track} />)}
    </ul>
  );
}
