import type { Metadata } from "next";
import { GuideCard } from "@/components/agora/GuideCard";
import { GuideSearch } from "@/components/guides/GuideSearch";
import { loadContent } from "@/lib/content/repository";
import { buildRoutes } from "@/lib/content/routes";
import { canonicalUrl, withBasePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guias do utilizador",
  alternates: { canonical: canonicalUrl("/Guias-do-utilizador/") },
};

export default function GuidesHome() {
  const content = loadContent();
  const routes = buildRoutes(content);
  const search = routes
    .filter((route) => route.kind === "task")
    .map((route) => ({
      id: route.task!.id,
      guideId: route.guide!.id,
      title: route.task!.title,
      intro: route.task!.intro,
      text: [route.task!.title, route.task!.intro, ...route.task!.steps, route.task!.tip].join(" "),
      url: route.path,
    }));

  return (
    <>
      <h1 className="text-3xl-bold mb-16">Como podemos ajudar?</h1>
      <p className="mb-32">Escolha o tema relacionado com o que pretende fazer no dados.gov.pt.</p>
      <GuideSearch items={search} />
      <h2 className="text-xl-bold mb-16">Explorar por tema</h2>
      <div className="grid gap-24 md:grid-cols-2">
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
    </>
  );
}
