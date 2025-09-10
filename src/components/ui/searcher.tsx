"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { TrackList } from "@/components/ui";
import type { Result } from "@/types/result";
import { getTracks } from "@/utils/spotify";
import { Search } from "lucide-react";

export default function Searcher() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const results = (await getTracks(query)).slice(0, 12);
      setResults(results);
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

  return (
    <section className="grid gap-4 w-full mx-4">
      <h2 className="text-3xl text-center">Busca tus canciones favoritas</h2>
      <form
        className="flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full col-span-2 rounded-l-lg border-2 border-r-0 border-gray-300 p-2"
          id="search"
          name="search"
          type="text"
          placeholder="Título, artista, etc."
          onChange={handleChange}
          value={query}
        />
        <button
          className="flex items-center gap-2 rounded-r-lg border-4 sm:border-2 border-blue-500 bg-blue-500 px-4 py-2 text-white cursor-pointer"
          type="submit"
        >
          <Search className="w-5 h-5" />
          <span className="sr-only sm:not-sr-only">Buscar</span>
        </button>
      </form>
      <TrackList results={results} error={error} />
    </section>
  );
}
