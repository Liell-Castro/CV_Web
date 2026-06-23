```⚠️ Projeto em desenvolvimento. Novas funcionalidades e refatorações de código sendo implementadas.```

# Currículo Web — Willian Gabriel

> Portfólio front-end construído do zero como projeto de aprendizado contínuo.<br>
> Da v1 ao código que você está lendo agora.

---

## Sobre o Projeto

Este repositório contém o código-fonte do meu currículo online — um projeto que nasceu como exercício prático de HTML e CSS e evoluiu, versão por versão, para uma arquitetura front-end madura com sistema de acessibilidade real, internacionalização e design profissional.

Não é um template baixado. Cada linha foi escrita, quebrada e reescrita durante o processo de aprendizado. O histórico de versões conta essa trajetória melhor do que qualquer texto.

---

## História e Motivação

Entrei na faculdade de Sistemas de Informação em 2025, depois de economizar pelo primeiro emprego formal. Antes disso, havia estudado marketing, design, inglês e informática por conta própria desde 2021.

Quando comecei a aprender desenvolvimento web, percebi que precisava de um projeto real — não de exercícios isolados. Um currículo online resolvia dois problemas ao mesmo tempo: me forçava a aplicar o que estava aprendendo e, ao mesmo tempo, construía algo que eu poderia usar de verdade.

A primeira versão era basicamente um `<div>` com texto. A versão atual tem sistema de acessibilidade com suporte a 7 tipos de daltonismo, internacionalização PT/EN, layout responsivo de 360px a 4K e arquitetura CSS baseada em design tokens.

O projeto também é material de estudo. Os comentários no código explicam as decisões, não apenas o que o código faz.

---

## Evolução das Versões

| Versão | Foco principal |
|--------|---------------|
| v1 | Estrutura HTML básica, primeiros estilos |
| v2 | Flexbox, tipografia e cores |
| v3 | Menu de navegação fixo, scroll suave |
| v4 | Cards de experiência, grid de cursos, cards 3D de idiomas |
| v5 | Painel de acessibilidade (zoom, espaçamento, contraste, dislexia) |
| v6 | Daltonismo com filtros SVG, guia de leitura, cursor acessível, painel direito, timeline pessoal |
| **v7** | **Refatoração arquitetural completa: dark mode nativo, CSS Grid layout, design tokens, HTML semântico, IntersectionObserver, internacionalização PT/EN, documentação profissional** |

---

## Funcionalidades

- **Navegação suave** entre seções via JavaScript, sem modificar o URL
- **Cards 3D** de idiomas com flip animado no hover (CSS puro)
- **Timeline pessoal** interativa no painel direito
- **Widget de status profissional** com indicador pulsante
- **Botão de salvar PDF** via impressão do navegador
- **Seletor de idioma PT | EN** integrado ao menu de navegação
- **Integração com Tally** para coleta de feedback anônimo com campo oculto

---

## Sistema de Acessibilidade

O painel de acessibilidade é retrátil e acessível via teclado. Inclui:

### Tipografia
- Aumentar / diminuir tamanho do texto (faixa: 12px – 24px)
- Aumentar / diminuir espaçamento entre linhas e letras
- Reset individual para cada controle (botão ↺ aparece somente quando modificado)

### Visual
- **Alto contraste** — modo preto/branco com amarelos para destaques
- **Fonte para dislexia** — substitui toda a tipografia por OpenDyslexic

### Daltonismo (7 tipos via filtros SVG)
| Tipo | Deficiência simulada |
|------|---------------------|
| Deuteranopia | Ausência total de cones verdes |
| Deuteranomalia | Sensibilidade reduzida de cones verdes |
| Protanopia | Ausência total de cones vermelhos |
| Protanomalia | Sensibilidade reduzida de cones vermelhos |
| Tritanopia | Ausência total de cones azuis |
| Tritanomalia | Sensibilidade reduzida de cones azuis |
| Acromatopsia | Visão completamente em escala de cinza |

Os filtros são aplicados via `filter: url(#filtro-tipo)` apenas no `<main>` e `<footer>`, preservando os elementos `position: fixed` sem o bug de congelamento de layout.

### Recursos extras
- **Destacar links** — outline amarelo em todos os `<a>` da página
- **Guia de leitura** — régua horizontal que segue o cursor do mouse
- **Cursor acessível** — substitui o cursor padrão por SVG amarelo ampliado
- Todos os botões do painel mantêm estado `aria-pressed` atualizado via JavaScript

---

## Tecnologias

- **HTML5 semântico** — `<main>`, `<section>`, `<article>`, `<aside>`, `<address>`, `<figure>`, roles ARIA explícitos
- **CSS3 moderno** — CSS Grid, Custom Properties (design tokens), `clamp()`, `perspective 3D`, `@keyframes`, `IntersectionObserver`-friendly
- **JavaScript Vanilla** — sem frameworks, sem dependências. `IntersectionObserver`, `DOMContentLoaded`, event delegation
- **SVG inline** — filtros de matriz de cor para daltonismo
- **Google Fonts** — DM Serif Display + DM Sans
- **OpenDyslexic** — carregado sob demanda via CDN

---

## Estrutura de Pastas

```
cv-liell-v7/
│
├── index.html              ← Versão PT-BR (página principal)
├── redirect.html           ← Redirecionamento com seletor de idioma
│
├── css/
│   └── style.css           ← Folha de estilo compartilhada (PT + EN)
│
├── js/
│   └── scripts.js          ← Script compartilhado (PT + EN)
│
├── assets/
│   └── img/
│       └── JavaScript_black-icon.jpg
│
└── en/
    └── index.html          ← Versão EN (inglês)
```

**Sobre o compartilhamento de arquivos:**
A versão EN (`/en/index.html`) referencia o CSS e o JS via caminhos relativos (`../css/style.css` e `../js/scripts.js`). Qualquer alteração no estilo ou nas funções de acessibilidade reflete automaticamente nas duas versões.

---

## Como Executar Localmente

### Opção 1 — VS Code Live Server (recomendado para estudo)

1. Instale a extensão **Live Server** no VS Code
2. Abra a **pasta raiz** (`cv-liell-v7/`) no editor
3. Clique em **Go Live** no canto inferior direito
4. Acesse `http://127.0.0.1:5500/index.html`

### Opção 2 — Python HTTP Server

```bash
# Na pasta raiz do projeto
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Opção 3 — Node.js serve

```bash
npx serve .
```

> **Importante:** Sempre abra via servidor local (não diretamente como arquivo). O protocolo `file://` pode bloquear fontes externas e causar comportamentos inesperados.

---

## Como Publicar

### GitHub Pages (gratuito)

1. Faça push do projeto para um repositório público no GitHub
2. Acesse: **Settings → Pages**
3. Em "Source", selecione o branch `main` e a pasta `/ (root)`
4. Salve. O GitHub publicará em `https://seu-usuario.github.io/nome-do-repo/`

### Vercel (recomendado para portfólio)

```bash
npm i -g vercel
vercel --prod
```

### Netlify (arraste e solte)

Acesse [netlify.com](https://netlify.com), crie uma conta e arraste a pasta do projeto para a área de deploy. Pronto.

---

## Internacionalização PT/EN

O projeto mantém duas versões de conteúdo separadas (`/index.html` e `/en/index.html`) que compartilham os mesmos arquivos de estilo e lógica. Isso evita duplicação de código e garante que qualquer melhoria de acessibilidade ou visual seja aplicada automaticamente nas duas línguas.

O seletor `PT | EN` fica no menu de navegação lateral, discreto mas sempre acessível. Em mobile (bottom navigation), o seletor de idioma fica oculto para não poluir a barra — pode ser exposto futuramente via modal ou página dedicada.

---

## Google Analytics (opcional)

Para ativar rastreamento com GA4:

1. Acesse [analytics.google.com](https://analytics.google.com) e crie uma conta
2. Crie uma **propriedade** do tipo Web
3. Em **Data Streams**, configure o stream para seu domínio
4. Copie o **Measurement ID** (formato `G-XXXXXXXXXX`)
5. No `<head>` de **ambos** os arquivos `index.html` e `en/index.html`, descomente e preencha o bloco de script:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
</script>
```

**Boas práticas LGPD:**
- O GA4 anonimiza IPs por padrão — verifique nas configurações da propriedade
- Se o site coletar dados de terceiros, adicione um aviso de cookies
- Para máxima conformidade, considere o **Consent Mode v2** do Google

---

## Integração Tally (Feedback)

O botão de feedback usa a plataforma Tally com um campo oculto para identificação:

```
https://tally.so/r/Gxbk9O?senha=castro
```

**Como funciona o campo oculto:**
1. No painel do Tally, edite o formulário
2. Adicione um campo do tipo **Hidden Field**
3. Defina o parâmetro como `senha`
4. O valor `castro` será preenchido automaticamente em todas as submissões
5. Nas respostas, você verá o campo `senha` com o valor preenchido — útil para filtrar envios externos indesejados

---

## Documentação Técnica

### Arquitetura Front-End

O layout usa **CSS Grid de três colunas** no `.layout-wrapper`:

```
[aside-esquerdo — nav] [conteudo-principal] [painel-direito]
```

Isso resolve o bug do v6, onde abrir o painel de acessibilidade alterava o `margin-left` do `<main>` via JavaScript, quebrando o `margin: 0 auto`. Na v7, o painel usa `transform: translateX()` e o conteúdo usa uma "esquiva" suave também via `transform` — nenhuma modificação de margem ou largura.

### Convenções de Nomenclatura

**Classes HTML** seguem o padrão **BEM-lite** (sem separadores duplos):

| Padrão | Exemplo |
|--------|---------|
| Seção | `.secao-experiencia` |
| Card de conteúdo | `.card-experiencia` |
| Elemento interno do card | `.card-cargo`, `.card-periodo` |
| Bloco do painel lateral | `.bloco-lateral`, `.bloco-status` |
| Estado dinâmico (JS) | `.painel-aberto`, `.nav-ativo`, `.opcao-ativa` |

### Organização CSS

O CSS segue **exatamente a mesma ordem do HTML**. Cada seção é comentada com seu número e nome. O bloco de **Alto Contraste** fica isolado no final, com o mesmo espelhamento estrutural — tornando trivial encontrar a sobrescrita correspondente a qualquer elemento.

Todas as cores são **variáveis semânticas** — nenhum hex, rgb ou hsl solto. As variáveis seguem o prefixo `--color-[categoria]-[modificador]`.

### Organização JavaScript

O JS usa o padrão **módulo procedural simples** (sem ES Modules) para compatibilidade máxima. Funções privadas (usadas apenas internamente) têm prefixo `_`. O ponto de entrada é `inicializar()`, chamado em `DOMContentLoaded`.

O `IntersectionObserver` em `initDestaqueNavAtivo()` detecta qual seção está visível e atualiza o item ativo do menu sem `scroll events` — mais performático e sem jank.

### Sistema de Acessibilidade

Cada recurso de acessibilidade tem:
- Função JavaScript com nome claro (`alternarContraste`, `ativarDaltonismo`)
- Classe CSS correspondente no `<body>` ou no elemento alvo
- Atributo `aria-pressed` atualizado via `_atualizarAriaPressed()`
- Estado visual claro (borda verde, fundo destacado) quando ativo

### Estratégia de Responsividade

| Breakpoint | Comportamento |
|------------|--------------|
| `> 1100px` | Layout 3 colunas (nav + conteúdo + painel direito) |
| `≤ 1100px` | Layout 2 colunas (nav + conteúdo), painel direito oculto |
| `≤ 768px` | Layout 1 coluna, menu lateral vira bottom navigation |
| `≤ 480px` | Ajustes finos para celulares pequenos (360px) |
| `≥ 2560px` | Container ampliado, font-size base 18px |

### Estratégia de Internacionalização

Sem bibliotecas — duas versões HTML independentes compartilhando CSS e JS. A troca de idioma é uma navegação simples entre `index.html` e `en/index.html`. O seletor `PT | EN` no menu usa `aria-current="page"` para indicar o idioma ativo para leitores de tela.

---

## Roadmap

- [ ] Modo Light Theme (toggle pelo painel de acessibilidade)
- [ ] Persistência de preferências via `localStorage`
- [ ] Animações de entrada scroll-triggered via `IntersectionObserver`
- [ ] Página de portfólio/biografia separada
- [ ] Seção de projetos com links e screenshots
- [ ] Modo de impressão refinado com QR code de contato
- [ ] Service Worker para funcionamento offline
- [ ] Consent Mode v2 para conformidade LGPD total

---

## Contribuições

Este é um projeto pessoal de portfólio. Sugestões, issues e pull requests são bem-vindos para:

- Correções de acessibilidade
- Melhorias de performance
- Correções ortográficas na versão EN
- Bugs de layout em dispositivos específicos

Abra uma issue descrevendo o problema ou a sugestão antes de enviar um PR.

---

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

---

<p align="center">
  Feito com disciplina e curiosidade por
  <a href="https://github.com/Liell-Castro">Willian Gabriel</a>
  · Porto Real – RJ · 2026
</p>
