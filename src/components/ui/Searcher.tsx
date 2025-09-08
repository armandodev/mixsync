"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { TrackList } from "@/components/ui";
import type { Result } from "@/types/result";
import { getTracks } from "@/utils/spotify";

export default function Searcher() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const results = await getTracks(query);
      setResults(results);
      setError(null);
      console.log(results);
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
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white cursor-pointer"
          type="submit"
        >
          Buscar
        </button>
      </form>
      <TrackList results={results} error={error} />
    </section>
  );
}
