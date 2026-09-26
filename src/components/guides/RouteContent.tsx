import { GuideCard } from "@/components/agora/GuideCard";
import { loadContent } from "@/lib/content/repository";
import {
  buildRoutes,
  routeForGuide,
  routeForTask,
  type GuideRoute,
} from "@/lib/content/routes";
import { withBasePath } from "@/lib/site";

function Breadcrumb({ route }: { route: GuideRoute }) {
  const content = loadContent();
  const routes = buildRoutes(content);
  const items: Array<{ label: string; href?: string }> = [
    { label: "Guias do utilizador", href: withBasePath("/Guias-do-utilizador/") },
  ];

  if (route.theme) {
    const themeRoute = routes.find(
      (candidate) => candidate.kind === "theme" && candidate.theme?.id === route.theme?.id,
    );
    if (route.kind === "theme") items.push({ label: route.theme.title });
    else if (themeRoute) items.push({ label: route.theme.title, href: withBasePath(themeRoute.path) });
  }

  if (route.guide) {
    if (route.kind === "guide") items.push({ label: route.guide.title });
    else if (route.kind === "task") {
      items.push({
        label: route.guide.title,
        href: withBasePath(routeForGuide(content, route.guide.id).path),
      });
    }
  }

  if (route.kind === "task" && route.task) items.push({ label: route.task.title });

  return (
    <nav aria-label="Breadcrumb" className="mb-24 text-sm">
      <ol className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-8">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <a className="inline-flex min-h-[24px] items-center underline underline-offset-4" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function TaskNavigation({ route }: { route: GuideRoute }) {
  if (!route.guide || !route.task) return null;
  const content = loadContent();
  const overview = routeForGuide(content, route.guide.id);
  const ref = route.task.nextRef;
  const next =
    ref.type === "task"
      ? routeForTask(content, ref.id)
      : routeForGuide(content, ref.id);

  return (
    <nav
      aria-label="Navegação da tarefa"
      className="mt-40 flex flex-col gap-16 border-t pt-24 sm:flex-row sm:items-center sm:justify-between"
    >
      <a className="underline underline-offset-4" href={withBasePath(overview.path)}>
        Visão geral do guia
      </a>
      <a className="font-bold underline underline-offset-4" href={withBasePath(next.path)}>
        {next.title} →
      </a>
    </nav>
  );
}

export function RouteContent({ route }: { route: GuideRoute }) {
  const content = loadContent();

  if (route.kind === "theme" && route.theme) {
    const guides = route.theme.guideIds.map((id) => content.guides.find((guide) => guide.id === id)!);
    return (
      <>
        <Breadcrumb route={route} />
        <h1 className="text-3xl-bold my-16">{route.theme.title}</h1>
        <p className="mb-32">{route.theme.intro}</p>
        <div className="grid gap-24 md:grid-cols-2">
          {guides.map((guide) => {
            const guideRoute = routeForGuide(content, guide.id);
            return (
              <GuideCard
                key={guide.id}
                title={guide.title}
                description={guide.intro}
                href={withBasePath(guideRoute.path)}
              />
            );
          })}
        </div>
      </>
    );
  }

  if (route.kind === "guide" && route.guide) {
    const guide = route.guide;
    const related = guide.relatedGuideIds.map((id) => content.guides.find((item) => item.id === id)!).filter(Boolean);
    const pdfName = `${guide.slug.toLocaleLowerCase("pt-PT")}.pdf`;

    return (
      <>
        <Breadcrumb route={route} />
        <h1 className="text-3xl-bold my-16">{guide.title}</h1>
        <p className="mb-8">{guide.intro}</p>
        <p className="mb-24">{guide.audience}</p>
        <p className="mb-32">
          <a
            className="font-bold underline underline-offset-4"
            href={withBasePath(`/assets/pdf/${pdfName}`)}
            download
          >
            Descarregar este guia em PDF
          </a>
        </p>

        <h2 className="text-xl-bold mb-16">O que pretende fazer?</h2>
        <div className="grid gap-24 md:grid-cols-2">
          {guide.fichas.map((task) => {
            const taskRoute = routeForTask(content, task.id);
            return (
              <GuideCard
                key={task.id}
                title={task.title}
                description={task.intro}
                href={withBasePath(taskRoute.path)}
              />
            );
          })}
        </div>

        {related.length > 0 ? (
          <section className="mt-40" aria-labelledby="guias-relacionados">
            <h2 id="guias-relacionados" className="text-xl-bold mb-16">
              Guias relacionados
            </h2>
            <div className="grid gap-24 md:grid-cols-2">
              {related.map((item) => {
                const relatedRoute = routeForGuide(content, item.id);
                return (
                  <GuideCard
                    key={item.id}
                    title={item.title}
                    description={item.intro}
                    href={withBasePath(relatedRoute.path)}
                  />
                );
              })}
            </div>
          </section>
        ) : null}

        {guide.resources?.length ? (
          <section className="mt-40" aria-labelledby="recursos-uteis">
            <h2 id="recursos-uteis" className="text-xl-bold mb-16">
              Recursos úteis
            </h2>
            <ul className="list-disc space-y-8 pl-24">
              {guide.resources.map((resource) => (
                <li key={resource.url}>
                  <a className="underline underline-offset-4" href={resource.url}>
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </>
    );
  }

  if (route.kind === "task" && route.guide && route.task) {
    const task = route.task;
    return (
      <article>
        <Breadcrumb route={route} />
        {task.roles ? <p className="mt-24 text-sm-semibold">{task.roles}</p> : null}
        <h1 className="text-3xl-bold my-16">{task.title}</h1>
        <p className="text-l mb-32">{task.intro}</p>

        <h2 className="text-xl-bold mb-16">Como fazer</h2>
        <ol className="list-decimal space-y-12 pl-24">
          {task.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {task.table?.length ? (
          <div className="my-32 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {task.table[0].map((cell, index) => (
                    <th key={index} scope="col" className="border p-12 text-left">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {task.table.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border p-12">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {task.example ? (
          <section className="my-32" aria-labelledby="exemplo-tarefa">
            <h2 id="exemplo-tarefa" className="text-xl-bold">
              Exemplo
            </h2>
            <p>{task.example}</p>
          </section>
        ) : null}

        {task.media ? (
          <section className="my-32 rounded border p-16" aria-labelledby="media-previsto">
            <h2 id="media-previsto" className="text-xl-bold mb-8">
              Imagem ou vídeo previsto
            </h2>
            <p>{task.media}</p>
          </section>
        ) : null}

        {task.tip ? (
          <aside className="my-32 border-l-4 border-primary-500 pl-16">
            <strong>Dica</strong>
            <p>{task.tip}</p>
          </aside>
        ) : null}

        <TaskNavigation route={route} />
      </article>
    );
  }

  return <h1>Conteúdo não encontrado</h1>;
}
