"use client";

type GuideOption = { id: string; title: string; href: string };
type ThemeOption = { id: string; title: string };

export function GuidesHomeSidebar({
  guides,
  themes,
}: {
  guides: GuideOption[];
  themes: ThemeOption[];
}) {
  return (
    <aside
      aria-label="Navegação dos guias"
      className="border-b border-[#dce5eb] bg-[#f4f7f9] px-16 py-24 lg:min-h-full lg:border-b-0 lg:border-r lg:px-20 lg:py-32"
    >
      <label
        htmlFor="home-guide-select"
        className="mb-8 block text-xs font-bold uppercase tracking-[0.08em] text-[#526779]"
      >
        Escolher guia
      </label>
      <select
        id="home-guide-select"
        defaultValue=""
        className="min-h-[44px] w-full rounded border border-[#a7bac8] bg-white px-12 py-8 text-sm"
        onChange={(event) => {
          if (event.currentTarget.value) window.location.assign(event.currentTarget.value);
        }}
      >
        <option value="">Seleccione um guia</option>
        {guides.map((guide) => (
          <option key={guide.id} value={guide.href}>{guide.title}</option>
        ))}
      </select>
      <div className="mt-16 lg:hidden">
        <label
          htmlFor="home-theme-select"
          className="mb-8 block text-xs font-bold uppercase tracking-[0.08em] text-[#526779]"
        >
          Temas
        </label>
        <select
          id="home-theme-select"
          defaultValue=""
          className="min-h-[44px] w-full rounded border border-[#a7bac8] bg-white px-12 py-8 text-sm"
          onChange={(event) => {
            if (event.currentTarget.value) window.location.assign(event.currentTarget.value);
          }}
        >
          <option value="">Escolher tema</option>
          {themes.map((theme) => (
            <option key={theme.id} value={`#theme-${theme.id}`}>{theme.title}</option>
          ))}
        </select>
      </div>

      <nav className="mt-20 hidden lg:block" aria-label="Temas dos guias">
        <ul className="flex flex-col gap-2">
          {themes.map((theme) => (
            <li key={theme.id}>
              <a
                className="block min-h-[44px] border-l-3 border-transparent px-12 py-10 text-sm leading-snug hover:border-[#005ce6] hover:bg-[#eaf0f5]"
                href={`#theme-${theme.id}`}
              >
                {theme.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className="mt-16 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#005ce6] underline underline-offset-4"
        href="#explorar-tema"
      >
        Ver todos os temas
      </a>
    </aside>
  );
}
