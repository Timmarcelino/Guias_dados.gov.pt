import { loadContent } from "@/lib/content/repository";
import { buildRoutes, routeForGuide, type GuideRoute } from "@/lib/content/routes";
import { withBasePath } from "@/lib/site";

type Item = { label: string; href?: string };

export function GuidesBreadcrumb({ route }: { route?: GuideRoute }) {
  const items: Item[] = [
    { label: "Início", href: "https://dados.gov.pt/pt" },
    { label: "Recursos", href: "https://dados.gov.pt/pt/recursos" },
    route
      ? { label: "Guias do utilizador", href: withBasePath("/Guias-do-utilizador/") }
      : { label: "Guias do utilizador" },
  ];

  if (route?.theme) {
    const content = loadContent();
    const routes = buildRoutes(content);
    const themeRoute = routes.find(
      (candidate) => candidate.kind === "theme" && candidate.theme?.id === route.theme?.id,
    );    if (route.kind === "theme") items.push({ label: route.theme.title });
    else if (themeRoute) items.push({ label: route.theme.title, href: withBasePath(themeRoute.path) });
  }

  if (route?.guide) {
    if (route.kind === "guide") items.push({ label: route.guide.title });
    else if (route.kind === "task") {
      const content = loadContent();
      items.push({
        label: route.guide.title,
        href: withBasePath(routeForGuide(content, route.guide.id).path),
      });
    }
  }

  if (route?.kind === "task" && route.task) items.push({ label: route.task.title });

  return (
    <div className="mb-32 rounded-sm bg-accent-light px-16 py-20 sm:px-24">
      <nav aria-label="Breadcrumb" className="text-s-regular">
        <ol className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-8">
              {index > 0 ? <span aria-hidden="true">›</span> : null}
              {item.href ? (
                <a className="inline-flex min-h-[44px] items-center underline underline-offset-4" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
