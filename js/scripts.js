/* ============================================================
   scripts.js — Currículo Willian Gabriel — v7
   Sistema completo de acessibilidade e interações

   ÍNDICE DE FUNÇÕES
   ──────────────────────────────────────────────────────
   1.  INICIALIZAÇÃO
       • inicializar()                 → Ponto de entrada, chama todos os inits

   2.  NAVEGAÇÃO SUAVE
       • initNavegacao()               → Scroll suave por data-scroll
       • initDestaqueNavAtivo()        → Realça btn-nav da seção visível

   3.  ZOOM DE TEXTO
       • alterarZoom(direcao)          → Controla font-size do <html>
       • resetZoom()                   → Reseta para padrão
       • _atualizarBtnResetZoom()      → Mostra/oculta botão de reset (interno)

   4.  ESPAÇAMENTO DE TEXTO
       • alterarEspacamento(direcao)   → line-height + letter-spacing
       • resetEspacamento()            → Reseta para padrão
       • _atualizarBtnResetEspacamento() → Mostra/oculta reset (interno)
       • _aplicarEspacamento()         → Injeta estilos nos elementos (interno)

   5.  FONTE PARA DISLEXIA
       • alternarFonteDislexia()       → Ativa/desativa OpenDyslexic

   6.  ALTO CONTRASTE
       • alternarContraste()           → Modo preto/branco acessível

   7.  MODO DALTONISMO
       • ativarDaltonismo(tipo)        → Aplica filtro SVG ou remove
       • toggleSubmenuDaltonismo()     → Abre/fecha submenu (touch/teclado)

   8.  DESTACAR LINKS
       • alternarLinks()               → Outline amarelo em todos os <a>

   9.  GUIA DE LEITURA
       • alternarGuiaLeitura()         → Régua horizontal que segue o mouse

   10. CURSOR ACESSÍVEL
       • alternarCursorAcessivel()     → Substitui cursor por SVG amarelo

   11. REDUZIR ANIMAÇÕES (MOTION)
       • alternarMotion()              → Corta animações/transições via classe CSS

   12. RESET GERAL DE ACESSIBILIDADE
       • resetGeralAcessibilidade()    → Restaura todos os recursos ao padrão

   13. TOGGLE DO PAINEL DE ACESSIBILIDADE
       • togglePainel()                → Abre/fecha painel lateral de acessibilidade

   14. TOGGLE DO PAINEL DE USABILIDADE
       • togglePainelUso()             → Abre/fecha painel lateral de usabilidade

   15. ALTERNADOR DE TEMA
       • definirTema(tema)             → Aplica light / dark / system no <html>
       • _aplicarTema(tema)            → Injeta data-tema no elemento raiz (interno)
       • initTema()                    → Restaura preferência salva no localStorage

   16. COMPARTILHAR SITE
       • compartilharSite()            → Copia URL para área de transferência

   17. FECHAMENTO POR CLIQUE EXTERNO
       • initFechamentoPorOverlay()    → Fecha painéis ao clicar fora

   UTI. AUXILIARES INTERNOS
       • _gerenciarFocoPainel()        → Retém foco Tab/Shift+Tab (Acessibilidade)
       • _atualizarAriaPressed()       → Controla estado semântico dos botões
   ============================================================ */


/* ============================================================
   1. INICIALIZAÇÃO
   A função inicializar() centraliza todos os event listeners
   e setups que dependem do DOM já carregado.
   ============================================================ */

document.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  initNavegacao();
  initDestaqueNavAtivo();
  initFechamentoPorOverlay();
  initTema();  /* Restaura preferência de tema salva */
}


/* ============================================================
   2. NAVEGAÇÃO SUAVE

   Como funciona:
   - Todos os [data-scroll="id"] disparam scrollIntoView()
   - Não modifica o URL (sem #ancora na barra de endereços)
   - block: "start" alinha o topo da seção ao topo da viewport
   ============================================================ */
function initNavegacao() {
  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-scroll");
      const alvo = document.getElementById(id);
      if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/*
   DESTAQUE DO ITEM ATIVO NO MENU
   Usa IntersectionObserver para detectar qual seção está visível
   e adicionar a classe .nav-ativo ao botão correspondente.
   threshold: 0.3 significa que 30% da seção precisa estar visível.
*/
function initDestaqueNavAtivo() {
  const sections = document.querySelectorAll(
    "#inicio, #objetivo, #experiencia, #formacao, #cursos, #competencias, #idiomas"
  );

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;

        // Remove ativo de todos
        document.querySelectorAll(".btn-nav").forEach(function (btn) {
          btn.classList.remove("nav-ativo");
        });

        // Adiciona ativo ao correspondente
        const btnAtivo = document.querySelector('[data-scroll="' + id + '"]');
        if (btnAtivo) btnAtivo.classList.add("nav-ativo");
      });
    },
    { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}


/* ============================================================
   3. ZOOM DE TEXTO
   Altera o font-size do <html> (rem como base).
   Faixa: 12px – 24px. Padrão: 16px.
   ============================================================ */
var ZOOM_PADRAO = 16;
var tamanhoAtual = ZOOM_PADRAO;

function alterarZoom(direcao) {
  if (direcao === "in") {
    tamanhoAtual += 2;
  } else {
    tamanhoAtual -= 2;
  }
  tamanhoAtual = Math.max(12, Math.min(24, tamanhoAtual));
  document.documentElement.style.fontSize = tamanhoAtual + "px";
  _atualizarBtnResetZoom();
}

function resetZoom() {
  tamanhoAtual = ZOOM_PADRAO;
  document.documentElement.style.fontSize = tamanhoAtual + "px";
  _atualizarBtnResetZoom();
}

/* Função interna (privada) — prefixo _ por convenção */
function _atualizarBtnResetZoom() {
  var btn = document.getElementById("btn-reset-zoom");
  if (!btn) return;
  if (tamanhoAtual !== ZOOM_PADRAO) {
    btn.classList.add("visivel");
  } else {
    btn.classList.remove("visivel");
  }
}


/* ============================================================
   4. ESPAÇAMENTO DE TEXTO
   Aplica line-height e letter-spacing nos elementos de texto.
   Faixa de linha: 1.0 – 2.0. Faixa de letra: 1.0 – 2.5.
   ============================================================ */
var ESPACO_LINHA_PADRAO = 1.6;
var ESPACO_LETRA_PADRAO = 1.0;
var espacamentoLinha  = ESPACO_LINHA_PADRAO;
var espacamentoLetra  = ESPACO_LETRA_PADRAO;

/* Seletor de elementos que recebem espaçamento */
var SELETOR_TEXTO =
  "main h2, main h3, main h4, .subtitulo, " +
  "main .card-cargo, main .card-empresa, main .card-periodo, " +
  "main .formacao-titulo, main .formacao-instituicao, main .formacao-periodo, " +
  "main .curso-nome, main .curso-info, " +
  "main .tag, main .idioma-nome, main .idioma-nivel, main .idioma-descricao, " +
  "main .secao-objetivo p";

function alterarEspacamento(direcao) {
  if (direcao === "mais") {
    espacamentoLinha += 0.2;
    espacamentoLetra += 0.2;
  } else {
    espacamentoLinha -= 0.2;
    espacamentoLetra -= 0.2;
  }
  espacamentoLinha = parseFloat(Math.max(1.0, Math.min(2.4, espacamentoLinha)).toFixed(1));
  espacamentoLetra = parseFloat(Math.max(0.6, Math.min(2.0, espacamentoLetra)).toFixed(1));

  _aplicarEspacamento();
  _atualizarBtnResetEspacamento();
}

function resetEspacamento() {
  espacamentoLinha = ESPACO_LINHA_PADRAO;
  espacamentoLetra = ESPACO_LETRA_PADRAO;

  document.querySelectorAll(SELETOR_TEXTO).forEach(function (el) {
    el.style.lineHeight   = "";
    el.style.letterSpacing = "";
  });
  _atualizarBtnResetEspacamento();
}

function _aplicarEspacamento() {
  document.querySelectorAll(SELETOR_TEXTO).forEach(function (el) {
    el.style.lineHeight    = espacamentoLinha.toString();
    el.style.letterSpacing = espacamentoLetra + "px";
  });
}

function _atualizarBtnResetEspacamento() {
  var btn = document.getElementById("btn-reset-espacamento");
  if (!btn) return;
  var foraDopadrao =
    espacamentoLinha.toFixed(1) !== ESPACO_LINHA_PADRAO.toFixed(1) ||
    espacamentoLetra.toFixed(1) !== ESPACO_LETRA_PADRAO.toFixed(1);

  if (foraDopadrao) {
    btn.classList.add("visivel");
  } else {
    btn.classList.remove("visivel");
  }
}


/* ============================================================
   5. FONTE PARA DISLEXIA
   Alterna a classe body.fonte-dislexia-ativa.
   O CSS já aplica OpenDyslexic em todos os elementos via essa classe.
   Atualiza aria-pressed para acessibilidade via leitor de tela.
   ============================================================ */
function alternarFonteDislexia() {
  var ativo = document.body.classList.toggle("fonte-dislexia-ativa");
  _atualizarAriaPressed("btn-dislexia", ativo);
}


/* ============================================================
   6. ALTO CONTRASTE
   Alterna body.alto-contraste.
   Ao ativar, desativa daltonismo (não são compatíveis).
   ============================================================ */
function alternarContraste() {
  // ativa/desativa a classe correta no body
  var ativoOficial = document.body.classList.toggle("alto-contraste");
  _atualizarAriaPressed("btn-contraste", ativoOficial);
    document.body.classList.toggle("alto-contraste");
    _atualizarAriaPressed("btn-contraste", false);
  var ativoOficial = document.body.classList.toggle("alto-contraste");
  _atualizarAriaPressed("btn-contraste", ativoOficial);
}

  if (ativoOficial) {
    // Desativa daltonismo ao entrar em alto contraste
    ativarDaltonismo(null);
  } else {
    document.querySelectorAll(".opcao-ativa").forEach(function(btn) {
      btn.setAttribute("aria-pressed", "true");
  });
  }

/* ============================================================
   7. MODO DALTONISMO — Filtros SVG por tipo

   Como funciona:
   - Os filtros SVG (definidos no HTML) são referenciados por ID
   - Aplicamos como filter CSS: url(#filtro-[tipo])
   - Aplicamos apenas ao <main> e <footer> para não afetar
     elementos fixed (painel de acessibilidade, menu, botões)
   - Isso evita o bug de congelamento de position:fixed
     que acontecia quando o filtro era aplicado ao <body>

   Tipos disponíveis:
   deuteranopia | deuteranomalia | protanopia | protanomalia
   tritanopia | tritanomalia | acromatopsia | null (desativar)
   ============================================================ */
var daltonismoAtivo = null;

function ativarDaltonismo(tipo) {
  var main    = document.getElementById("conteudo-principal") || document.querySelector("main");
  var footer  = document.querySelector("footer");
  var body    = document.body;

  // Identifica o botão principal/mãe do daltonismo (ajuste o ID se no seu HTML for diferente)
  var btnPrincipalDaltonismo = document.getElementById("btn-daltonismo") || document.getElementById("btn-daltonismo-main");

  // Remove todos os modos anteriores do body
  body.classList.remove(
    "modo-deuteranopia", "modo-deuteranomalia",
    "modo-protanopia",   "modo-protanomalia",
    "modo-tritanopia",   "modo-tritanomalia",
    "modo-acromatopsia"
  );

  // Remove as classes ativas antigas ou novas de todas as sub-opções de forma segura
  document.querySelectorAll(".btn-sub, .btn-sub-opcao, .opcao-ativa, .btn-sub-ativo").forEach(function (btn) {
    btn.classList.remove("btn-sub-ativo", "opcao-ativa");
    btn.setAttribute("aria-pressed", "false");
  });

  // Se o tipo for null ou "normal", desativa os filtros SVG
  if (tipo === null || tipo === "normal") {
    if (main)   main.style.filter   = "";
    if (footer) footer.style.filter = "";
    body.classList.remove("daltonismo");
    daltonismoAtivo = null;

    // Desliga o feedback do botão principal (mãe)
    if (btnPrincipalDaltonismo) {
      btnPrincipalDaltonismo.classList.remove("opcao-ativa");
      btnPrincipalDaltonismo.setAttribute("aria-pressed", "false");
    }

    // Sincroniza o botão de visão normal se possuir ID específico no HTML
    var btnNormal = document.getElementById("btn-dalton-normal") || document.getElementById("btn-daltonismo-normal");
    if (btnNormal) {
      btnNormal.classList.add("opcao-ativa");
      btnNormal.setAttribute("aria-pressed", "true");
    }
    return;
  }

  // Aplica o filtro SVG via referência de ID
  var filtro = "url(#filtro-" + tipo + ")";
  if (main)   main.style.filter   = filtro;
  if (footer) footer.style.filter = filtro;

  body.classList.add("daltonismo");
  body.classList.add("modo-" + tipo);
  body.classList.remove("alto-contraste");

  daltonismoAtivo = tipo;

  // CORREÇÃO AQUI: Ativa visualmente o botão principal (mãe) do menu
  if (btnPrincipalDaltonismo) {
    btnPrincipalDaltonismo.classList.add("opcao-ativa");
    btnPrincipalDaltonismo.setAttribute("aria-pressed", "true");
  }
  
  // Procura dinamicamente nas tags de botão o onclick correto para injetar a classe de feedback visual
  document.querySelectorAll("button").forEach(function (btn) {
    var onclickAttr = btn.getAttribute("onclick") || "";
    if (onclickAttr.includes("ativarDaltonismo") && onclickAttr.includes("'" + tipo + "'")) {
      btn.classList.add("opcao-ativa");
      btn.setAttribute("aria-pressed", "true");
    }
  });

  // Atualiza contraste (era ativo, agora não)
  _atualizarAriaPressed("btn-contraste", false);
}

/*
   Toggle do submenu de daltonismo para dispositivos touch.
   Em desktop, o hover CSS já cuida disso.
*/
function toggleSubmenuDaltonismo() {
  var submenu   = document.getElementById("submenu-daltonismo");
  var btnToggle = document.getElementById("btn-daltonismo") || document.getElementById("btn-daltonismo-main");
  if (!submenu) return;

  var aberto = submenu.classList.toggle("submenu-visivel");
  if (btnToggle) {
    btnToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
  }
}


/* ============================================================
   8. DESTACAR LINKS
   Adiciona outline amarelo a todos os <a> via classe CSS.
   ============================================================ */
var linksDestacados = false;

function alternarLinks() {
  linksDestacados = !linksDestacados;
  document.querySelectorAll("a").forEach(function (link) {
    if (linksDestacados) {
      link.classList.add("link-destacado");
    } else {
      link.classList.remove("link-destacado");
    }
  });
  _atualizarAriaPressed("btn-links", linksDestacados);
}


/* ============================================================
   9. GUIA DE LEITURA
   Exibe uma faixa horizontal que segue o cursor do mouse.
   Útil para usuários com dificuldade de rastrear linhas.
   ============================================================ */
var guiaAtiva = false;
var _guiaListener = null;

function alternarGuiaLeitura() {
  var guia = document.getElementById("guia-leitura");
  if (!guia) return;

  guiaAtiva = !guiaAtiva;

  if (guiaAtiva) {
    guia.style.display = "block";

    _guiaListener = function (event) {
      guia.style.top = event.clientY - 20 + "px";
    };
    document.addEventListener("mousemove", _guiaListener);
  } else {
    guia.style.display = "none";
    if (_guiaListener) {
      document.removeEventListener("mousemove", _guiaListener);
      _guiaListener = null;
    }
  }
  _atualizarAriaPressed("btn-guia", guiaAtiva);
}


/* ============================================================
   10. CURSOR ACESSÍVEL
   Substitui o cursor padrão por um SVG amarelo grande.
   O SVG é embutido como data URI no CSS (sem arquivo externo).
   ============================================================ */
function alternarCursorAcessivel() {
  var ativo = document.body.classList.toggle("cursor-acessivel-ativo");
  _atualizarAriaPressed("btn-cursor", ativo);
}


/* ============================================================
   11. REDUZIR ANIMAÇÕES (MOTION)
   Adiciona body.motion-reduzido que via CSS zera todas as
   durações de animation e transition, incluindo as da página.
   ============================================================ */
function alternarMotion() {
  var ativo = document.body.classList.toggle("motion-reduzido");
  
  // CORREÇÃO: Sincronizado com o ID com cedilha real definido no seu HTML
  _atualizarAriaPressed("btn-motion", ativo);
}


/* ============================================================
   12. RESET GERAL DE ACESSIBILIDADE
   Restaura todos os recursos de acessibilidade ao estado padrão
   com uma única ação. Equivale a recarregar sem precisar dar F5.
   ============================================================ */
function resetGeralAcessibilidade() {
  // 1. Zoom de texto
  tamanhoAtual = ZOOM_PADRAO;
  document.documentElement.style.fontSize = tamanhoAtual + "px";
  _atualizarBtnResetZoom();

  // 2. Espaçamento
  resetEspacamento();

  // 3. Alto contraste
  document.body.classList.remove("alto-contraste");
  _atualizarAriaPressed("btn-contraste", false);

  // 4. Fonte dislexia
  document.body.classList.remove("fonte-dislexia-ativa");
  _atualizarAriaPressed("btn-dislexia", false);

  // 5. Daltonismo (Chama a função passando null para resetar filtros)
  ativarDaltonismo(null);

  // 6. Destacar links
  linksDestacados = false;
  document.querySelectorAll("a").forEach(function (link) {
    link.classList.remove("link-destacado");
  });
  _atualizarAriaPressed("btn-links", false);

  // 7. Guia de leitura
  if (guiaAtiva) {
    alternarGuiaLeitura();
  }

  // 8. Cursor acessível
  document.body.classList.remove("cursor-acessivel-ativo");
  _atualizarAriaPressed("btn-cursor", false);

  // 9. Reduzir animações (Chama sincronizando com o ID real corrigido)
  document.body.classList.remove("motion-reduzido");
  _atualizarAriaPressed("btn-motion", false);
}

// CORREÇÃO DE SEGURANÇA: Garante que o body limpe as classes dos painéis ao resetar
  document.body.classList.remove("global-acessibilidade-aberta");
  var painelAcess = document.getElementById("painel-acessibilidade");
  if (painelAcess && painelAcess.classList.contains("acessibilidade-aberto")) {
     togglePainel(); // Se estiver aberto, força o fechamento limpo
  }



/* ============================================================
   13. TOGGLE DO PAINEL DE ACESSIBILIDADE

   ESTRATÉGIA:
   - O painel usa transform: translateX(-100%) → translateX(0) [Lado Esquerdo]
   - O <main> usa transform: translateX(30px) como "esquiva"
   - NUNCA altera margin-left (quebraria o CSS Grid)
   - O botão ♿ se transforma ou gerencia estados via classes exclusivas
   - Ao abrir o painel de acessibilidade, fecha o de usabilidade
   ============================================================ */
function togglePainel() {
  var painel    = document.getElementById("painel-acessibilidade");
  var main      = document.getElementById("conteudo-principal");
  var btnAcess  = document.getElementById("btn-acessibilidade");

  // Se está abrindo, fecha o painel de usabilidade (não abre dois ao mesmo tempo)
  if (!painel) return;

  var estaAbrindo = !painel.classList.contains("acessibilidade-aberto");

  // Se está abrindo, fecha o painel de usabilidade (não abre dois ao mesmo tempo)
  if (estaAbrindo) {
    var painelUso   = document.getElementById("painel-usabilidade");
    var btnUso      = document.getElementById("btn-usabilidade");
    if (painelUso && painelUso.classList.contains("usabilidade-aberto")) {
      painelUso.classList.remove("usabilidade-aberto");
      painelUso.setAttribute("aria-hidden", "true");
      if (main) main.classList.remove("usabilidade-conteudo-aberto")
      if (btnUso) {
        btnUso.classList.remove("usabilidade-conteudo-aberto");
        btnUso.setAttribute("aria-expanded", "false");
      }
    }
  }

  // Alterna painel usando os novos nomes memoráveis de classe
  painel.classList.toggle("acessibilidade-aberto");
  document.body.classList.toggle("global-acessibilidade-aberta", estaAbrindo);
  painel.setAttribute("aria-hidden", estaAbrindo ? "false" : "true");
  

  if (main) {
    main.classList.remove("usabilidade-conteudo-aberto"); 
    main.classList.toggle("acessibilidade-conteudo-aberto", estaAbrindo);
  }

  // Gerenciamento visual e acessível do botão flutuante
  if (btnAcess) {
    btnAcess.setAttribute("aria-expanded", estaAbrindo ? "true" : "false");
    btnAcess.classList.toggle("acessibilidade-conteudo-aberto", estaAbrindo);
    btnAcess.innerHTML = "♿";
    // Se fechou, limpa submenus internos por garantia
    if (!estaAbrindo) {
      var submenu = document.getElementById("submenu-daltonismo");
      if (submenu) {
        submenu.classList.remove("submenu-visivel");
        var btnDaltonismo = document.getElementById("btn-daltonismo");
        if (btnDaltonismo) btnDaltonismo.setAttribute("aria-expanded", "false");
      }
    }
  }

  // Aciona o gerenciador interno de travas de foco (Acessibilidade via teclado)
  _gerenciarFocoPainel(painel, estaAbrindo, btnAcess);
}


/* ============================================================
   14. TOGGLE DO PAINEL DE USABILIDADE

   Mesmo padrão do painel de acessibilidade [Lado Direito].
   Ao abrir, fecha o painel de acessibilidade se estiver aberto.
   ============================================================ */
function togglePainelUso() {
  var painel    = document.getElementById("painel-usabilidade");
  var main      = document.getElementById("conteudo-principal");
  var btnUso    = document.getElementById("btn-usabilidade");

  if (!painel) return;

  var estaAbrindo = !painel.classList.contains("usabilidade-aberto");

  // Se está abrindo, fecha o painel de acessibilidade
  if (estaAbrindo) {
    var painelAcess = document.getElementById("painel-acessibilidade");
    var btnAcess    = document.getElementById("btn-acessibilidade");
    if (painelAcess && painelAcess.classList.contains("acessibilidade-aberto")) {
      painelAcess.classList.remove("acessibilidade-aberto");
      painelAcess.setAttribute("aria-hidden", "true");
      document.body.classList.remove("global-acessibilidade-aberta");

      if (btnAcess) {
        btnAcess.classList.remove("acessibilidade-conteudo-aberto");
        btnAcess.setAttribute("aria-expanded", "false");
        btnAcess.innerHTML = "♿";
      }
      // Fecha submenu de daltonismo se estava aberto
      var submenu = document.getElementById("submenu-daltonismo");
      if (submenu) {
        submenu.classList.remove("submenu-visivel");
        var btnDaltonismo = document.getElementById("btn-daltonismo");
        if (btnDaltonismo) btnDaltonismo.setAttribute("aria-expanded", "false");
      }
    }
  }

  // Alterna painel de usabilidade usando os nomes memoráveis
  painel.classList.toggle("usabilidade-aberto");
  painel.setAttribute("aria-hidden", estaAbrindo ? "false" : "true");

if (main) {
    main.classList.remove("acessibilidade-conteudo-aberto");
    main.classList.toggle("usabilidade-conteudo-aberto", estaAbrindo);
  }

  // Gerenciamento do botão flutuante de Usabilidade
  if (btnUso) {
    btnUso.setAttribute("aria-expanded", estaAbrindo ? "true" : "false");
    btnUso.classList.toggle("usabilidade-conteudo-aberto");
  }

  // Aciona o gerenciador interno de travas de foco para o painel de usabilidade
  _gerenciarFocoPainel(painel, estaAbrindo, btnUso);
}


/* ============================================================
   15. ALTERNADOR DE TEMA — Claro / Escuro / Sistema

   Como funciona:
   - O atributo data-tema no <html> é lido pelo CSS para
     aplicar as variáveis do tema correto (Light ou Dark).
   - "system": remove data-tema, deixa @media prefers-color-scheme decidir.
   - "light" / "dark": força o tema independente do sistema.
   - A preferência é salva no localStorage para persistir entre visitas.
   ============================================================ */
var temaAtual = "system"; /* Padrão: segue o sistema */

function definirTema(tema) {
  temaAtual = tema;
  _aplicarTema(tema);

  // Salva preferência no localStorage
  try { localStorage.setItem("tema-cv", tema); } catch(e) {}

  // Atualiza aria-pressed dos botões de tema
  var mapeamento = { "light": "btn-tema-claro", "system": "btn-tema-sistema", "dark": "btn-tema-escuro" };
  Object.keys(mapeamento).forEach(function(t) {
    var btn = document.getElementById(mapeamento[t]);
    if (!btn) return;
    var esteAtivo = (t === tema);
    btn.setAttribute("aria-pressed", esteAtivo ? "true" : "false");
    if (esteAtivo) {
      btn.classList.add("tema-ativo");
    } else {
      btn.classList.remove("tema-ativo");
    }
  });
}

/* Injeta (ou remove) o atributo data-tema no <html> */
function _aplicarTema(tema) {
  var raiz = document.documentElement;
  if (tema === "light" || tema === "dark") {
    raiz.setAttribute("data-tema", tema);
  } else {
    /* "system": remove atributo e deixa @media prefers-color-scheme agir */
    raiz.removeAttribute("data-tema");
  }
}

/* Restaura preferência salva no localStorage ao carregar a página */
function initTema() {
  var temaSalvo = null;
  try { temaSalvo = localStorage.getItem("tema-cv"); } catch(e) {}

  /* Se não há preferência salva, verifica se o sistema é light
     (o CSS já é dark por padrão, então só precisamos forçar o light) */
  if (!temaSalvo) {
    var prefereClaro = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    temaSalvo = prefereClaro ? "light" : "system";
  }

  definirTema(temaSalvo);
}

/* ============================================================
   FUNÇÃO EXTRA: EFEITO BLOQUEADO (HUB EM BREVE)
   Faz o card tremer lateralmente ao ser clicado.
   ============================================================ */
function dispararBloqueioHub(elemento) {
  // Evita acumular animações se o usuário clicar várias vezes seguidas
  if (elemento.classList.contains("btn-hub-bloqueado")) return;

  // Adiciona a classe que ativa o tremor do CSS
  elemento.classList.add("btn-hub-bloqueado");

  // Remove a classe após 400 milissegundos (o tempo exato da animação)
  setTimeout(function() {
    elemento.classList.remove("btn-hub-bloqueado");
  }, 400);
}


/* ============================================================
   16. COMPARTILHAR SITE
   Copia a URL atual para a área de transferência.
   Usa a Clipboard API moderna com fallback para execCommand.
   Fornece feedback visual no botão após a cópia.
   ============================================================ */
function compartilharSite() {
  var url = window.location.href;
  var btn = document.getElementById("btn-compartilhar");

  function feedbackCopiado() {
    if (!btn) return;
    var textoOriginal = btn.textContent;
    btn.textContent = "✓ Link copiado!";
    btn.style.color = "var(--color-state-success)";
    btn.style.borderColor = "var(--color-state-success)";
    setTimeout(function() {
      btn.textContent = textoOriginal;
      btn.style.color = "";
      btn.style.borderColor = "";
    }, 2200);
  }

  /* Clipboard API (navegadores modernos) */
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(feedbackCopiado).catch(function() {
      /* Fallback silencioso se a API falhar */
      _compartilharFallback(url, feedbackCopiado);
    });
  } else {
    _compartilharFallback(url, feedbackCopiado);
  }
}

/* Fallback com textarea oculto (Safari antigo / HTTP) */
function _compartilharFallback(url, callback) {
  var textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0;";
  document.body.appendChild(textarea);
  textarea.select();
  try { document.execCommand("copy"); callback(); } catch(e) {}
  document.body.removeChild(textarea);
}


/* ============================================================
   17. FECHAMENTO POR CLIQUE EXTERNO
   Fecha o painel de acessibilidade ou usabilidade quando o
   usuário clica fora deles. Ignora cliques dentro dos painéis
   ou nos botões que os abrem.
   ============================================================ */
function initFechamentoPorOverlay() {
  document.addEventListener("click", function (event) {
    var painelAcess = document.getElementById("painel-acessibilidade");
    var painelUso   = document.getElementById("painel-usabilidade");
    var btnAcess    = document.getElementById("btn-acessibilidade");
    var btnUso      = document.getElementById("btn-usabilidade");

    /* ── Fecha painel de acessibilidade ── */
    if (painelAcess && painelAcess.classList.contains("acessibilidade-aberto")) {
      if (painelAcess.contains(event.target)) return;
      if (btnAcess && btnAcess.contains(event.target)) return;
      togglePainel();
      return; /* evita double-close se ambos estivessem abertos */
    }

    /* ── Fecha painel de usabilidade ── */
    if (painelUso && painelUso.classList.contains("usabilidade-aberto")) {
      if (painelUso.contains(event.target)) return;
      if (btnUso && btnUso.contains(event.target)) return;
      togglePainelUso();
    }
  });
}


/* ============================================================
   UTI. AUXILIARES INTERNOS — ACESSIBILIDADE DE TECLADO (FOCUS TRAP)
   Gerencia a navegação por teclado (Tab / Shift+Tab) para que o usuário não
   consiga navegar pelos elementos de fundo enquanto o painel estiver aberto.
   ============================================================ */
function _gerenciarFocoPainel(painel, abrindo, elementoGatilho) {
  if (abrindo) {
    var elementosFocaveis = painel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (elementosFocaveis.length > 0) {
      var primeiroElemento = elementosFocaveis[0];
      var ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];

      setTimeout(function () {
        primeiroElemento.focus();
      }, 100);

      painel._escutaTeclado = function (e) {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === primeiroElemento) {
              ultimoElemento.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === ultimoElemento) {
              primeiroElemento.focus();
              e.preventDefault();
            }
          }
        }
        if (e.key === "Escape") {
          if (painel.id === "painel-acessibilidade") togglePainel();
          if (painel.id === "painel-usabilidade") togglePainelUso();
        }
      };
      document.addEventListener("keydown", painel._escutaTeclado);
    }
  } else {
    if (painel._escutaTeclado) {
      document.removeEventListener("keydown", painel._escutaTeclado);
      delete painel._escutaTeclado;
    }
    if (elementoGatilho) {
      setTimeout(function () {
        elementoGatilho.focus();
      }, 100);
    }
  }
}


/* ============================================================
   UTILITÁRIO — Atualizar aria-pressed
   Centraliza a lógica de atualizar o atributo aria-pressed
   nos botões de opção do painel de acessibilidade.

   Parâmetros:
   - btnId  (string): ID do elemento <button>
   - ativo  (boolean): true = pressionado, false = não pressionado
   ============================================================ */
function _atualizarAriaPressed(btnId, ativo) {
  var btn = document.getElementById(btnId);
  if (!btn) return;
  btn.setAttribute("aria-pressed", ativo ? "true" : "false");

  if (ativo) {
    btn.classList.add("opcao-ativa");
  } else {
    btn.classList.remove("opcao-ativa");
  }
}
