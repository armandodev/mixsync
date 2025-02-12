import type { Result as ResultType } from "../../types/result";
import Track from "./Track";

export default function Tracks({
  results,
  error,
}: {
  results: ResultType[];
  error: string | null;
}) {
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
