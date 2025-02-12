import { ChangeEvent, FormEvent, useState } from "react";
import Tracks from "../ui/Tracks";
import type { Result } from "../../types/result";
import getSearchResults from "../../utils";

export default function Searcher() {
  const [query, setQuery] = useState("");
  const [server, setServer] = useState("all");
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await getSearchResults(query, server);
      setResults(res);
      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ha ocurrido un error desconocido";
      setError(message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleServerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };

  return (
    <section className="grid gap-4 w-full">
      <h2 className="text-3xl">Busca tus canciones favoritas</h2>
      <form
        className="grid grid-cols-2 sm:flex items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full col-span-2 rounded-lg border-2 border-gray-300 p-2"
          type="text"
          placeholder="Título, artista, etc."
          onChange={handleChange}
          value={query}
        />
        <select
          className="rounded-lg border-2 border-gray-300 p-2"
          value={server}
          onChange={handleServerChange}
        >
          <option value="all">Todos</option>
          <option value="spotify">Spotify</option>
          <option value="youtube">YouTube</option>
        </select>
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white cursor-pointer"
          type="submit"
        >
          Buscar
        </button>
      </form>
      <Tracks results={results} error={error} />
    </section>
  );
}
