"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/agora/SearchInput";
import type { SearchItem } from "@/lib/content/search";
import { withBasePath } from "@/lib/site";

export function GuideSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const hits = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-PT");
    return normalized
      ? items.filter((item) => item.text.toLocaleLowerCase("pt-PT").includes(normalized)).slice(0, 12)
      : [];
  }, [query, items]);

  return (
    <section
      aria-labelledby="pesquisa-guias"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#dce5eb] bg-white"
    >
      <div className="container mx-auto px-16 py-16 sm:px-24 lg:px-0">
        <div className="ml-auto w-full max-w-[420px]">
          <h2 id="pesquisa-guias" className="sr-only">Pesquisar nos guias</h2>
          <form
            role="search"
            className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto]"
            onSubmit={(event) => event.preventDefault()}
          >
            <SearchInput
              label="Pesquisar nos guias"
              hideLabel
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Pesquisar nestes guias"
            />
            <button type="submit" className="min-h-[44px] rounded-sm bg-[#005ce6] px-18 font-semibold text-white hover:bg-[#004aaa]">
              Pesquisar
            </button>
          </form>
          <p className="mt-8 text-s-regular" role="status" aria-live="polite">
            {query ? `${hits.length} ${hits.length === 1 ? "resultado" : "resultados"}` : ""}
          </p>
          {hits.length > 0 ? (
            <ul className="mt-12 flex flex-col gap-8 border-t border-[#dce5eb] pt-12">
              {hits.map((item) => (
                <li key={item.id}>
                  <a className="block rounded-sm px-8 py-8 hover:bg-[#f4f7f9]" href={withBasePath(item.url)}>
                    <strong>{item.title}</strong>
                    <span className="block text-s-regular text-gray-medium">{item.intro}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
