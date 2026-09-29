import type { Metadata } from "next";
import { GuideCard } from "@/components/agora/GuideCard";
import { GuideSearch } from "@/components/guides/GuideSearch";
import { GuidesBreadcrumb } from "@/components/guides/GuidesBreadcrumb";
import { loadConfiguredContent } from "@/lib/content/config";
import { buildRoutes } from "@/lib/content/routes";
import { buildSearchIndex } from "@/lib/content/search";
import { canonicalUrl, withBasePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guias do utilizador",
  alternates: { canonical: canonicalUrl("/Guias-do-utilizador/") },
};

export default async function GuidesHome() {
  const content = await loadConfiguredContent();
  const routes = buildRoutes(content);
  const search = buildSearchIndex(content);

  return (
    <>
      <GuidesBreadcrumb />
      <section aria-labelledby="guias-titulo" className="mb-32">
        <p className="mb-8 text-s-regular uppercase tracking-wider text-brand-blue-primary">Guias práticos</p>
        <h1 id="guias-titulo" className="mb-12 text-3xl-bold">Como podemos ajudar?</h1>
        <p className="max-w-4xl text-m-regular">
          Escolha o tema relacionado com o que pretende fazer no dados.gov.pt. Dentro de cada tema encontra guias
          práticos organizados por tarefas.
        </p>
      </section>

      <GuideSearch items={search} />

      <section aria-labelledby="explorar-tema">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <h2 id="explorar-tema" className="text-xl-bold">Explorar por tema</h2>
          <p className="text-s-regular text-gray-medium">{content.themes.length} temas</p>
        </div>
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {content.themes.map((theme) => {
            const route = routes.find((candidate) => candidate.kind === "theme" && candidate.theme?.id === theme.id)!;
            return (
              <GuideCard
                key={theme.id}
                title={theme.title}
                description={theme.intro}
                href={withBasePath(route.path)}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
