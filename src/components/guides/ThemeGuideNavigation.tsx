import { loadContent } from "@/lib/content/repository";
import { routeForGuide, type GuideRoute } from "@/lib/content/routes";
import { withBasePath } from "@/lib/site";

export function ThemeGuideNavigation({ route }: { route: GuideRoute }) {
  if (!route.theme) return null;

  const content = loadContent();
  const guides = route.theme.guideIds.map(
    (id) => content.guides.find((guide) => guide.id === id)!,
  );

  return (
    <nav
      aria-labelledby="escolher-guia"
      className="rounded-sm border bg-accent-light p-16"
    >
      <h2 id="escolher-guia" className="mb-12 text-l-semibold">
        Escolher guia
      </h2>
      <ul className="flex flex-col gap-4">
        {guides.map((guide) => {
          const guideRoute = routeForGuide(content, guide.id);
          const isCurrentGuide = guide.id === route.guide?.id;
          const isCurrentPage = isCurrentGuide && route.kind === "guide";
          return (
            <li key={guide.id}>
              <a
                href={withBasePath(guideRoute.path)}
                aria-current={isCurrentPage ? "page" : undefined}
                className={`block min-h-[44px] rounded-sm px-12 py-12 underline-offset-4 hover:underline ${
                  isCurrentGuide ? "bg-white font-bold" : ""
                }`}
              >
                {guide.title}
                {isCurrentGuide && route.kind === "task" ? (
                  <span className="sr-only"> (guia actual)</span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
