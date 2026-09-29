import { GuideCard } from "@/components/agora/GuideCard";
import { GuidesBreadcrumb } from "@/components/guides/GuidesBreadcrumb";
import { loadContent } from "@/lib/content/repository";
import { getGuidePublicationStatus } from "@/lib/content/publication-status";
import {
  routeForGuide,
  routeForTask,
  type GuideRoute,
} from "@/lib/content/routes";
import { withBasePath } from "@/lib/site";

function guideCardDescription(guide: { id: string; intro: string }): string {
  const status = getGuidePublicationStatus(guide.id);
  return status ? `${status.label}. ${guide.intro}` : guide.intro;
}

function GuidePublicationNotice({ guideId }: { guideId: string }) {
  const status = getGuidePublicationStatus(guideId);
  if (!status) return null;

  return (
    <aside
      className="my-24 rounded border border-l-4 border-primary-500 p-16"
      aria-labelledby={`guide-publication-status-${guideId}`}
    >
      <h2 id={`guide-publication-status-${guideId}`} className="text-l-semibold mb-8">
        {status.label}
      </h2>
      <p>{status.message}</p>
    </aside>
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
        <GuidesBreadcrumb route={route} />
        <h1 className="text-3xl-bold my-16">{route.theme.title}</h1>
        <p className="mb-32">{route.theme.intro}</p>
        <div className="grid gap-24 md:grid-cols-2">
          {guides.map((guide) => {
            const guideRoute = routeForGuide(content, guide.id);
            return (
              <GuideCard
                key={guide.id}
                title={guide.title}
                description={guideCardDescription(guide)}
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
        <GuidesBreadcrumb route={route} />
        <h1 className="text-3xl-bold my-16">{guide.title}</h1>
        <p className="mb-8">{guide.intro}</p>
        <p className="mb-24">{guide.audience}</p>
        <GuidePublicationNotice guideId={guide.id} />
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
                    description={guideCardDescription(item)}
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
        <GuidesBreadcrumb route={route} />
        {task.roles ? <p className="mt-24 text-s-semibold">{task.roles}</p> : null}
        <h1 className="text-3xl-bold my-16">{task.title}</h1>
        <p className="text-l-regular mb-32">{task.intro}</p>
        <GuidePublicationNotice guideId={route.guide.id} />

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
