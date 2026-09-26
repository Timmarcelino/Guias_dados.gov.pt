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
    <section aria-labelledby="pesquisa-guias" className="my-32">
      <h2 id="pesquisa-guias" className="text-xl-bold mb-16">
        Pesquisar nos guias
      </h2>
      <SearchInput
        label="Pesquisar nos guias"
        hideLabel
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Ex.: publicar dados"
      />
      <p className="mt-8 text-sm" role="status" aria-live="polite">
        {query ? `${hits.length} ${hits.length === 1 ? "resultado" : "resultados"}` : ""}
      </p>
      {hits.length > 0 ? (
        <ul className="mt-16 flex flex-col gap-12">
          {hits.map((item) => (
            <li key={item.id}>
              <a className="underline" href={withBasePath(item.url)}>
                <strong>{item.title}</strong>
                <span className="block">{item.intro}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
