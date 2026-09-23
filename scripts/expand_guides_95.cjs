const fs = require('fs');
const path = require('path');

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, s) => {
  const file = path.join(root, p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, s, 'utf8');
};
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const guides = JSON.parse(read('content/guides.json'));
const oldSearch = JSON.parse(read('assets/js/search-index.json'));
const urlByTitle = new Map(oldSearch.map((x) => [x.title, x.url]));
const D13 = guides.find((g) => g.code === 'D13');
const D14 = guides.find((g) => g.code === 'D14');

D13.intro = 'Actualize a informação do seu perfil e da conta, gira as Chaves da API, encontre os seus conteúdos e consulte a actividade apresentada na sua área pessoal.';

const emailPass = {
  title: 'Alterar o email e a palavra-passe da conta',
  intro: 'Actualize os dados de acesso da conta quando o portal disponibiliza essas opções no seu perfil.',
  roles: 'Utilizador autenticado com conta aplicável',
  steps: [
    'Inicie sessão e abra Meu perfil.',
    'Na área Perfil, localize a opção para alterar o endereço de email ou a palavra-passe.',
    'Escolha a alteração pretendida e preencha os campos apresentados.',
    'Conclua a confirmação solicitada pelo portal, incluindo a consulta da caixa de correio quando for enviado um link de validação.',
    'Volte ao perfil ou ao acesso à conta e confirme que a alteração ficou concluída.'
  ],
  example: 'Uma utilizadora altera o endereço de email da conta e conclui a validação através da mensagem recebida.',
  tip: 'Não partilhe palavras-passe nem links de validação. Se a conta estiver associada a CMD ou eIDAS, siga apenas o percurso apresentado pelo portal para a alteração pretendida.',
  table: null,
  media: 'Área de Perfil com as opções de alteração de email e palavra-passe, usando dados de demonstração.',
  next: 'Gerir Chaves da API.'
};

const apiKeys = {
  title: 'Gerir Chaves da API',
  intro: 'Crie e elimine Chaves da API a partir da sua área pessoal quando precisar de autenticar pedidos programáticos.',
  roles: 'Utilizador autenticado',
  steps: [
    'Inicie sessão e abra Meu perfil.',
    'Abra a área Chaves da API.',
    'Para criar uma chave, utilize a acção de geração apresentada pelo portal.',
    'Guarde a chave de forma segura quando o portal a apresentar e utilize-a apenas nas integrações autorizadas.',
    'Para deixar de utilizar uma chave, identifique-a na listagem, utilize a acção de eliminação e confirme o resultado apresentado.'
  ],
  example: 'Uma pessoa cria uma Chave da API para uma integração e elimina-a quando deixa de ser necessária.',
  tip: 'Trate a Chave da API como uma credencial. Não a inclua em capturas, exemplos públicos, repositórios ou pedidos de apoio.',
  table: null,
  media: 'Área Chaves da API com dados de demonstração e sem expor uma chave real.',
  next: 'Consultar o perfil de outro utilizador.'
};

const feedback = {
  title: 'Enviar feedback sobre o dados.gov.pt',
  intro: 'Utilize o formulário Envie o seu feedback para partilhar uma sugestão ou comentário sobre o portal.',
  roles: 'Pessoa que pretende enviar feedback',
  steps: [
    'Aceda à página Ajuda e contactos e seleccione Envie o seu feedback.',
    'Preencha os campos apresentados, incluindo o endereço de email, o assunto e o detalhe.',
    'Descreva de forma clara a sugestão, comentário ou experiência que pretende partilhar.',
    'Reveja a informação e submeta o formulário.',
    'Confirme a mensagem apresentada após o envio.'
  ],
  example: 'Uma pessoa envia uma sugestão para tornar mais clara a informação apresentada numa página do portal.',
  tip: 'Não inclua palavras-passe, Chaves da API ou dados pessoais desnecessários no feedback.',
  table: null,
  media: 'Formulário Envie o seu feedback preenchido com dados de demonstração.',
  next: 'Pedir informação ou sugerir um conjunto de dados.'
};

D13.fichas = D13.fichas.filter((f) => ![emailPass.title, apiKeys.title].includes(f.title));
D13.fichas[0].next = emailPass.title + '.';
D13.fichas.splice(1, 0, emailPass, apiKeys);
D14.fichas = D14.fichas.filter((f) => f.title !== feedback.title);
D14.fichas[1].next = feedback.title + '.';
D14.fichas.splice(2, 0, feedback);

write('content/guides.json', JSON.stringify(guides, null, 2) + '\n');
write('assets/js/data.js', '// Dados de conteúdo do protótipo.\n// Mantém os conteúdos editoriais separados da lógica de apresentação.\n\nexport const guides = ' + JSON.stringify(guides.filter((g) => g.code !== 'D01'), null, 2) + ';\n');

const routes = {
  'Alterar o email e a palavra-passe da conta': '/Guias_dados.gov.pt/Guias-do-utilizador/Acesso-perfil-e-participacao/Perfil-e-actividade/Alterar-o-email-e-a-palavra-passe-da-conta/',
  'Gerir Chaves da API': '/Guias_dados.gov.pt/Guias-do-utilizador/Acesso-perfil-e-participacao/Perfil-e-actividade/Gerir-Chaves-da-API/',
  'Enviar feedback sobre o dados.gov.pt': '/Guias_dados.gov.pt/Guias-do-utilizador/Ajuda-e-contactos/Ajuda-e-contactos/Enviar-feedback-sobre-o-dados-gov-pt/'
};
for (const [title, url] of urlByTitle) if (!routes[title]) routes[title] = url;

const search = [];
for (const g of guides) {
  for (const f of g.fichas) {
    const url = routes[f.title];
    if (!url) throw new Error('Sem rota para: ' + f.title);
    search.push({
      title: f.title,
      intro: f.intro,
      text: [f.title, f.intro, ...(f.steps || []), f.tip].filter(Boolean).join(' '),
      url
    });
  }
}
write('assets/js/search-index.json', JSON.stringify(search) + '\n');

const configs = {
  D13: {
    theme: 'Acesso, perfil e participação',
    themeUrl: '/Guias_dados.gov.pt/Guias-do-utilizador/Acesso-perfil-e-participacao/',
    guideUrl: '/Guias_dados.gov.pt/Guias-do-utilizador/Acesso-perfil-e-participacao/Perfil-e-actividade/',
    dir: 'Guias-do-utilizador/Acesso-perfil-e-participacao/Perfil-e-actividade',
    template: 'Actualizar-o-perfil-e-a-fotografia/index.html'
  },
  D14: {
    theme: 'Ajuda e contactos',
    themeUrl: '/Guias_dados.gov.pt/Guias-do-utilizador/Ajuda-e-contactos/',
    guideUrl: '/Guias_dados.gov.pt/Guias-do-utilizador/Ajuda-e-contactos/Ajuda-e-contactos/',
    dir: 'Guias-do-utilizador/Ajuda-e-contactos/Ajuda-e-contactos',
    template: 'Consultar-Ajuda-e-contactos/index.html'
  }
};
const routeFor = (f) => routes[f.title];
const slugFromUrl = (u) => u.split('/').filter(Boolean).at(-1);

function guideNav(g, c, current) {
  let html = '<nav aria-label="Assuntos do guia"><a class="dg-nav-item" href="' + c.guideUrl + '"' + (current === 'overview' ? ' aria-current="page"' : '') + '>Visão geral</a>';
  for (const f of g.fichas) {
    html += '<a class="dg-nav-item" href="' + routeFor(f) + '"' + (current === f.title ? ' aria-current="page"' : '') + '>' + esc(f.title) + '</a>';
  }
  return html + '</nav>';
}

function bottom(g, c, i) {
  const left = i === 0
    ? '<a class="dg-text-button" href="' + c.guideUrl + '">Visão geral do guia</a>'
    : '<a class="dg-text-button" href="' + routeFor(g.fichas[i - 1]) + '">← ' + esc(g.fichas[i - 1].title) + '</a>';
  const right = i === g.fichas.length - 1
    ? '<a class="dg-primary" href="' + c.guideUrl + '">Voltar à visão geral</a>'
    : '<a class="dg-primary" href="' + routeFor(g.fichas[i + 1]) + '">' + esc(g.fichas[i + 1].title) + ' →</a>';
  return '<nav class="dg-bottom" aria-label="Assunto anterior e seguinte">' + left + right + '</nav>';
}

function taskMain(g, c, f, i) {
  const crumbs = '<nav class="dg-breadcrumb" aria-label="Breadcrumb"><ol><li><a class="" href="https://dados.gov.pt/pt">Início</a></li><li><a class="" href="https://dados.gov.pt/pt/recursos">Recursos</a></li><li><a class="" href="/Guias_dados.gov.pt/Guias-do-utilizador/">Guias do utilizador</a></li><li><a class="" href="' + c.themeUrl + '">' + esc(c.theme) + '</a></li><li><a class="" href="' + c.guideUrl + '">' + esc(g.title) + '</a></li><li><span aria-current="page">' + esc(f.title) + '</span></li></ol></nav>';
  const steps = '<h2>Como fazer</h2><ol class="dg-steps">' + f.steps.map((x) => '<li><span>' + esc(x) + '</span></li>').join('') + '</ol>';
  const example = f.example ? '<div class="dg-example"><h2>Exemplo</h2><p>' + esc(f.example) + '</p></div>' : '';
  const media = f.media ? '<div class="dg-media"><div><div class="dg-media-label">Imagem ou vídeo previsto</div><p>' + esc(f.media) + '</p></div></div>' : '';
  const tip = f.tip ? '<div class="dg-tip"><strong>Dica</strong><p>' + esc(f.tip) + '</p></div>' : '';
  return '<main id="conteudo" tabindex="-1">' + crumbs + '<h1>' + esc(f.title) + '</h1><p class="dg-lead">' + esc(f.intro) + '</p><p class="dg-role">' + esc(f.roles) + '</p>' + steps + example + media + tip + bottom(g, c, i) + '</main>';
}

function updateTaskPage(g, c, f, i, isNew) {
  const rel = c.dir + '/' + slugFromUrl(routeFor(f)) + '/index.html';
  let html = isNew ? read(c.dir + '/' + c.template) : read(rel);
  html = html.replace(/<title>.*?<\/title>/, '<title>' + esc(f.title) + ' | Guias do utilizador | dados.gov.pt</title>');
  html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + esc(f.intro) + '">');
  html = html.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="https://timmarcelino.github.io' + routeFor(f) + '">');
  html = html.replace(/<nav aria-label="Assuntos do guia">.*?<\/nav>/, guideNav(g, c, f.title));
  html = html.replace(/<main id="conteudo" tabindex="-1">.*?<\/main>/, taskMain(g, c, f, i));
  write(rel, html);
}

function updateGuidePage(g, c) {
  const rel = c.dir + '/index.html';
  let html = read(rel);
  html = html.replace(/<nav aria-label="Assuntos do guia">.*?<\/nav>/, guideNav(g, c, 'overview'));
  html = html.replace(/<p class="dg-lead">.*?<\/p>/, '<p class="dg-lead">' + esc(g.intro) + '</p>');
  const grid = '<div class="dg-grid">' + g.fichas.map((f) => '<a class="dg-choice" href="' + routeFor(f) + '"><span><strong>' + esc(f.title) + '</strong><small>' + esc(f.intro) + '</small></span></a>').join('') + '</div>';
  html = html.replace(/<div class="dg-grid">.*?<\/div><div class="dg-example">/, grid + '<div class="dg-example">');
  write(rel, html);
}

for (const code of ['D13', 'D14']) {
  const g = guides.find((x) => x.code === code);
  const c = configs[code];
  updateGuidePage(g, c);
  for (let i = 0; i < g.fichas.length; i++) {
    updateTaskPage(g, c, g.fichas[i], i, [emailPass.title, apiKeys.title, feedback.title].includes(g.fichas[i].title));
  }
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
const htmlRoot = path.join(root, 'Guias-do-utilizador');
const urls = walk(htmlRoot)
  .filter((f) => f.endsWith('index.html'))
  .map((f) => 'https://timmarcelino.github.io/Guias_dados.gov.pt/' + path.relative(root, f).replace(/\\/g, '/').replace(/index\.html$/, ''))
  .sort();
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map((u) => '<url><loc>' + u + '</loc></url>').join('') + '</urlset>\n');

write('scripts/validate_guides_consistency.py', read('scripts/validate_guides_consistency.py').replace('EXPECTED_TASK_COUNT = 92', 'EXPECTED_TASK_COUNT = 95'));

let s = read('README.md');
s = s.replace(/15 guias e 92 fichas/g, '15 guias e 95 fichas')
  .replace(/\*\*92\*\*/g, '**95**')
  .replace(/# 115 rotas publicadas/g, '# 118 rotas publicadas')
  .replace(/índice das 92 fichas/g, 'índice das 95 fichas');
write('README.md', s);

s = read('docs/MEDIA_PLAN.md');
s = s.replace('Última actualização: 22/09/2026', 'Última actualização: 23/09/2026')
  .replace('nas 92 fichas', 'nas 95 fichas')
  .replace('| PRD público | **25** |', '| PRD público | **26** |')
  .replace('| PRD autenticado | **39** |', '| PRD autenticado | **41** |')
  .replace('| **Total** | **92** |', '| **Total** | **95** |')
  .replace('As cinco fichas estão em **PRD autenticado**.\n\nOs perfis de utilizador exigem autenticação no PRD actual.', 'As sete fichas estão em **PRD autenticado**. As novas fichas `Alterar o email e a palavra-passe da conta` e `Gerir Chaves da API` exigem sessão e devem ser capturadas sem expor credenciais ou chaves reais.\n\nOs perfis de utilizador exigem autenticação no PRD actual.')
  .replace('As seis fichas podem ser preparadas em **PRD público**:', 'As sete fichas podem ser preparadas em **PRD público**:')
  .replace('2. Enviar uma pergunta à equipa do dados.gov.pt;\n3. Pedir informação ou sugerir um conjunto de dados;\n4. Reportar uma questão sobre um conjunto de dados;\n5. Solicitar atribuição ou alteração de um emblema;\n6. Reportar um problema técnico.', '2. Enviar uma pergunta à equipa do dados.gov.pt;\n3. Enviar feedback sobre o dados.gov.pt;\n4. Pedir informação ou sugerir um conjunto de dados;\n5. Reportar uma questão sobre um conjunto de dados;\n6. Solicitar atribuição ou alteração de um emblema;\n7. Reportar um problema técnico.')
  .replace('cada uma das 92 fichas', 'cada uma das 95 fichas');
write('docs/MEDIA_PLAN.md', s);

s = read('CHANGELOG.md');
s = s.replace('* Evolução da colecção para **15 guias e 92 fichas**, com inclusão da sexta ficha de D14, `Reportar um problema técnico`.', '* Evolução da colecção para **15 guias e 95 fichas**. Em 23/09/2026 foram acrescentadas duas fichas a D13, `Alterar o email e a palavra-passe da conta` e `Gerir Chaves da API`, e uma ficha a D14, `Enviar feedback sobre o dados.gov.pt`.')
  .replace('* Publicação de **115 rotas estáticas** com sitemap, canonicals, pesquisa transversal e página 404 dedicada.', '* Publicação de **118 rotas estáticas** com sitemap, canonicals, pesquisa transversal e página 404 dedicada.')
  .replace('* Publicação e validação estrutural de **15 PDFs**, cobrindo as 92 fichas.', '* Publicação e validação estrutural de **15 PDFs**, cobrindo as 95 fichas após a expansão de 23/09/2026.');
write('CHANGELOG.md', s);

s = read('docs/PROJECT_STATUS.md');
s = s.replace('Última actualização validada: 22/09/2026', 'Última actualização validada: 23/09/2026')
  .replace('| Fichas na branch activa | 92 |', '| Fichas na branch activa | 95 |')
  .replace('Regra: a baseline estável v0.4 mantém 91 fichas. A branch activa evolui para 92 fichas após a validação da 6.ª ficha de D14, “Reportar um problema técnico”.', 'Regra: a baseline estável v0.4 mantém 91 fichas. Em 22/09/2026 a branch activa evoluiu para 92 fichas após a validação da 6.ª ficha de D14, “Reportar um problema técnico”. Em 23/09/2026 foi aprovada a expansão para 95 fichas: duas novas fichas em D13 e uma nova ficha em D14.')
  .replace('contagem diferente de 15 guias ou 92 fichas', 'contagem diferente de 15 guias ou 95 fichas')
  .replace('sitemap divergente de 115 URLs', 'sitemap divergente de 118 URLs')
  .replace('15 guias, 92 fichas, 115 URLs e 15 PDFs controlados', '15 guias, 95 fichas, 118 URLs e 15 PDFs controlados')
  .replace('Estado: documentação corrente alinhada com 15 guias, 92 fichas, 115 rotas e 15 PDFs.', 'Estado: documentação corrente alinhada com 15 guias, 95 fichas, 118 rotas e 15 PDFs.');
const expansionSection = '\n### Expansão D13/D14 em 23/09/2026\n\nDecisão aprovada: ampliar a branch activa de 92 para **95 fichas**, sem alterar os 15 guias nem os 7 temas.\n\n* D13 recebe `Alterar o email e a palavra-passe da conta` e `Gerir Chaves da API`.\n* D14 recebe `Enviar feedback sobre o dados.gov.pt`.\n* O sitemap passa de 115 para **118 rotas**.\n* O índice de pesquisa passa para **95 entradas**.\n* O guardrail passa a exigir 15 guias, 95 fichas e 118 rotas.\n* Os 15 PDFs são regenerados no mesmo workflow da expansão e validados quanto a presença integral das fichas.\n\nFonte da decisão: validação funcional em PPR, confrontada com o comportamento existente, LEDG-1422/LEDG-1656 para Feedback e evidência técnica/funcional de Perfil e Chaves da API. A promoção PPR para PRD não é assumida; diferenças de ambiente continuam a ser tratadas como evidência de implementação.\n';
if (!s.includes('### Expansão D13/D14 em 23/09/2026')) s = s.replace('## 3. Branch activa', expansionSection + '\n## 3. Branch activa');
write('docs/PROJECT_STATUS.md', s);

s = read('docs/CONTENT_VALIDATION.md');
s = s.replace('15 guias e 92 fichas', '15 guias e 95 fichas')
  .replace('| Fichas | 92 |', '| Fichas | 95 |')
  .replace('| Entradas no índice de pesquisa | 92 |', '| Entradas no índice de pesquisa | 95 |')
  .replace('| URLs no sitemap | 115 |', '| URLs no sitemap | 118 |')
  .replace('Esta fonte contém os 15 guias e as 92 fichas, incluindo as seis fichas de D14.', 'Esta fonte contém os 15 guias e as 95 fichas, incluindo sete fichas em D13 e sete fichas em D14.')
  .replace('| Perfil e actividade | 8 | 5 | 5 |', '| Perfil e actividade | 8 | 7 | 7 |')
  .replace('| Ajuda e contactos | 9 | 6 | 6 |', '| Ajuda e contactos | 9 | 7 | 7 |')
  .replace('* D14 contém as 6 fichas, incluindo `Reportar um problema técnico`.', '* D13 contém 7 fichas e D14 contém 7 fichas, incluindo as três fichas acrescentadas em 23/09/2026.')
  .replace('| D13 | Perfil e actividade | 5 | **Parcialmente validado** |', '| D13 | Perfil e actividade | 7 | **Parcialmente validado** |')
  .replace('| D14 | Ajuda e contactos | 6 | **Validado no âmbito actual** |', '| D14 | Ajuda e contactos | 7 | **Parcialmente validado após expansão** |');
const validationNote = '\n## 4.1 Expansão validada em 23/09/2026\n\nA expansão aprovada acrescenta três fichas: duas em D13 e uma em D14. A consistência técnica é verificada no mesmo workflow que publica a alteração, com contrato de **15 guias, 95 fichas, 95 entradas de pesquisa, 118 rotas e 15 PDFs**.\n\nA nova ficha de Feedback é suportada por LEDG-1422 e LEDG-1656 e foi observada no PPR. As novas fichas de D13 correspondem a capacidades observadas no perfil autenticado do PPR. A equivalência final com PRD deve ser novamente confirmada antes da publicação oficial dos Guides.\n';
if (!s.includes('## 4.1 Expansão validada em 23/09/2026')) s = s.replace('## 5.', validationNote + '\n## 5.');
write('docs/CONTENT_VALIDATION.md', s);

console.log(JSON.stringify({
  guides: guides.length,
  tasks: guides.reduce((n, g) => n + g.fichas.length, 0),
  search: search.length,
  routes: urls.length,
  D13: D13.fichas.length,
  D14: D14.fichas.length
}, null, 2));
