import type { Metadata } from "next";
import { GuideSearch } from "@/components/guides/GuideSearch";
import { GuidesBreadcrumb } from "@/components/guides/GuidesBreadcrumb";
import { GuidesHomeSidebar } from "@/components/guides/GuidesHomeSidebar";
import { loadConfiguredContent } from "@/lib/content/config";
import { buildRoutes } from "@/lib/content/routes";
import { getGuidePublicationStatus } from "@/lib/content/publication-status";
import { buildSearchIndex } from "@/lib/content/search";
import { canonicalUrl, withBasePath } from "@/lib/site";

function guideCardDescription(guide: { id: string; intro: string }): string {
  const status = getGuidePublicationStatus(guide.id);
  return status ? `${status.label}. ${guide.intro}` : guide.intro;
}

function HomeCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={`Abrir: ${title}`}
      className="group flex min-h-[112px] items-start justify-between gap-16 rounded-[6px] border border-[#dce5eb] bg-white p-18 text-inherit no-underline transition-colors hover:border-[#005ce6] hover:bg-[#f7faff]"
    >
      <span className="min-w-0">
        <strong className="mb-6 block text-m-semibold text-[#103454]">{title}</strong>
        <span className="block text-s-regular leading-relaxed text-[#526779]">{description}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-xl text-[#005ce6]">→</span>
    </a>
  );
}

export const metadata: Metadata = {
  title: "Guias do utilizador",
  alternates: { canonical: canonicalUrl("/Guias-do-utilizador/") },
};
export default async function GuidesHome() {
  const content = await loadConfiguredContent();
  const routes = buildRoutes(content);
  const search = buildSearchIndex(content);

  const guideOptions = content.guides.map((guide) => {
    const route = routes.find((candidate) => candidate.kind === "guide" && candidate.guide?.id === guide.id)!;
    return { id: guide.id, title: guide.title, href: withBasePath(route.path) };
  });

  return (
    <>
      <GuidesBreadcrumb />
      <GuideSearch items={search} />

      <div className="grid border-x border-[#dce5eb] lg:grid-cols-[264px_minmax(0,1fr)]">
        <GuidesHomeSidebar
          guides={guideOptions}
          themes={content.themes.map((theme) => ({ id: theme.id, title: theme.title }))}
        />

        <div className="min-w-0 px-18 py-28 sm:px-24 lg:px-48 lg:py-40">
          <section aria-labelledby="guias-titulo" className="mb-32 max-w-4xl">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.12em] text-[#006a4c]">Guias práticos</p>
            <h1 id="guias-titulo" className="mb-12 text-3xl-bold text-[#103454]">Como podemos ajudar?</h1>
            <p className="text-m-regular leading-relaxed text-[#526779]">
              Escolha o tema relacionado com o que pretende fazer no dados.gov.pt. Dentro de cada tema encontra guias
              práticos organizados por tarefas.
            </p>
          </section>

          <section id="explorar-tema" aria-labelledby="explorar-tema-titulo" className="mb-40">
            <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
              <h2 id="explorar-tema-titulo" className="text-xl-bold text-[#103454]">Explorar por tema</h2>
              <p className="text-s-regular text-[#526779]">{content.themes.length} temas</p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
              {content.themes.map((theme) => (
                <a
                  key={theme.id}
                  href={`#theme-${theme.id}`}
                  className="flex min-h-[104px] flex-col gap-5 rounded-[6px] border border-[#dce5eb] bg-white p-16 text-inherit no-underline hover:border-[#005ce6] hover:bg-[#f7faff]"
                >
                  <strong className="text-m-semibold text-[#103454]">{theme.title}</strong>
                  <span className="text-s-regular leading-relaxed text-[#526779]">{theme.intro}</span>
                </a>
              ))}
            </div>
          </section>

          <section aria-labelledby="descobrir-guias">
            <div className="mb-24 max-w-4xl">
              <h2 id="descobrir-guias" className="mb-8 text-xl-bold text-[#103454]">Descobrir os guias</h2>
              <p className="text-[#526779]">Consulte directamente os guias disponíveis em cada tema.</p>
            </div>

            {content.themes.map((theme) => {
              const guides = theme.guideIds.map((id) => content.guides.find((guide) => guide.id === id)!);
              return (
                <section
                  key={theme.id}
                  id={`theme-${theme.id}`}
                  className="scroll-mt-40 border-b border-[#dce5eb] py-32 first:pt-0 last:border-b-0 last:pb-0"
                  aria-labelledby={`guias-${theme.id}`}
                >
                  <div className="mb-16">
                    <h3 id={`guias-${theme.id}`} className="mb-6 text-l-bold text-[#103454]">{theme.title}</h3>
                    <p className="text-s-regular leading-relaxed text-[#526779]">{theme.intro}</p>
                  </div>
                  <div className="grid gap-12 md:grid-cols-2">
                    {guides.map((guide) => {
                      const route = routes.find(
                        (candidate) => candidate.kind === "guide" && candidate.guide?.id === guide.id,
                      )!;
                      return (
                        <HomeCard
                          key={guide.id}
                          title={guide.title}
                          description={guideCardDescription(guide)}
                          href={withBasePath(route.path)}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}
