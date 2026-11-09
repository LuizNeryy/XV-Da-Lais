# Documentação Técnica e de Produto: Convite Web Interativo — XV da Laís

## 1. Visão Geral e Objetivo
Desenvolvimento de uma **Single-Page Application (SPA) mobile-first ultraleve**, criada exclusivamente em **HTML5, CSS3 e JavaScript Vanilla** (sem frameworks ou dependências pesadas, garantindo carregamento instantâneo em conexões 4G/5G).

O projeto substitui o convite estático tradicional em PDF por uma experiência interativa audiovisual para smartphones. O convidado acessa um link direto (enviado via WhatsApp/redes sociais), inicia a experiência através de um toque que desbloqueia as permissões de multimídia, assiste a uma transição cinematográfica em vídeo e acessa a tela final com os botões de ação (Localização, Confirmação RSVP, PIX e Dress Code).

---

## 2. Direção de Arte e Identidade Visual
* **Conceito:** Noite Estelar Clássica / Gala Imperial (visual sóbrio, formal e luxuoso, evitando elementos 3D infantis ou excesso de ornamentos pesados).
* **Paleta de Cores:**
  * Fundo: Azul-noite profundo (`#030712` / `#020612`).
  * Acentos Metálicos: Ouro champagne metálico (`#dfba73`, `#fff2cb`, `#926f34`) aplicado via gradientes lineares simulando folheado a ouro.
  * Texto Secundário: Ouro suave, branco perolado e cinzas discretos (`#f8fafc`, `#cbd5e1`, `#94a3b8`).
* **Tipografia (Google Fonts):**
  * `Cinzel`: Tipografia romana imperial para títulos, datas, detalhes institucionais e botões em caixa alta.
  * `Pinyon Script`: Caligrafia fina estilo bico de pena para o nome da debutante (**Laís**) e frases poéticas.
  * `Montserrat`: Textos auxiliares e dados informativos secundários.

---

## 3. Arquitetura de Camadas e Máquina de Estados
A aplicação possui viewport fixo para visualização mobile (`max-width: 440px`, `100vh`, `overflow: hidden`) composto por 4 camadas empilhadas via `z-index`:

```text
[ Camada 4: UI Interativa ]   -> z-index: 5 (Textos, Lua SVG, Divisores, Botões de Ação e Modais)
[ Camada 1: Capa Inicial ]    -> z-index: 4 (Background: capa.png + Botão de entrada com áudio unlock)
[ Camada 2: Player de Vídeo ] -> z-index: 3 (Elemento <video playsinline> com video.mp4)
[ Camada 3: Fundo Estático ]  -> z-index: 1 (Background: fundo.png idêntico ao último frame do vídeo)
```

### Ciclo de Estados da Aplicação:
1. **Estado 1 (Capa Inicial):**
   * Exibe `capa.png` com o botão *"Entrar no Convite"*.
   * O clique do usuário desbloqueia as restrições de *autoplay* com som dos navegadores móveis (iOS Safari / Chrome Android).
2. **Estado 2 (Vídeo em Execução):**
   * A capa faz transição suave de fade-out (`opacity: 0`).
   * O elemento `<video>` inicia com áudio em tela cheia via `playsinline` e `webkit-playsinline` para impedir a abertura do player padrão do iOS.
3. **Estado 3 (Tela Final Interativa):**
   * O evento JavaScript `video.addEventListener('ended')` dispara um fade-out suave do player de vídeo.
   * A camada inferior expõe `fundo.png`, que já estava pré-carregada na memória da página, eliminando qualquer cintilação (*flicker*).
   * A Camada 4 (UI Interativa) recebe a classe `.active` (`opacity: 1`), liberando a interação do convidado.

---

## 4. Recursos e Integrações da Interface Final
* **Topo:** Lua crescente vetorial em SVG dourado com filtro de glow e frases poéticas de introdução.
* **Monograma e Nome:** Símbolo "XV" imperial ladeado por arabescos caligráficos (`~`) e o nome "Laís" em caligrafia dourada de destaque.
* **Barra de Detalhes:**
  * Bloco 1: Data do evento (17 de Outubro de 2026).
  * Bloco 2: Horário de início (21H00).
  * Bloco 3: Link de localização configurado para abrir diretamente no Google Maps / Waze.
* **Sugestão de Presente:** Bloco clicável que dispara modal com a chave PIX e botão de cópia rápida (`navigator.clipboard.writeText`).
* **Rodapé de Ações:**
  * Botão de confirmação estilo cápsula clássica (`CONFIRMAR`), acionando a API do WhatsApp (`wa.me`) com texto pré-definido.
  * Botão discreto `DRESS CODE` que abre modal com instruções formais sobre as cores reservadas para a debutante.

---

## 5. Estrutura de Diretórios
```text
C:\Programs\XV-Da-Lais\
├── assets\
│   ├── capa.png       # Imagem estática do portal/início
│   ├── fundo.png      # Cenário noturno estelar do frame final
│   ├── video.mp4      # Arquivo MP4 vertical otimizado (~10s)
│   └── musica.mp3     # Trilha sonora em áudio contínuo (opcional)
├── app.js             # Lógica de controle de estados, modais e clipboard
├── index.html         # Estrutura semântica e vetores SVG inline
├── style.css          # Estilos de gala, tipografia e animações
└── README.md          # Documentação técnica completa
```

---

## 6. Checklist para Produção
- [ ] Colocar os arquivos `capa.png`, `fundo.png` e `video.mp4` dentro da pasta `assets/`.
- [ ] Atualizar o link do Google Maps no `index.html` (atributo `href` do elemento de Localização).
- [ ] Configurar o número de WhatsApp no botão de confirmação (`wa.me/55...`).
- [ ] Inserir a chave PIX real no input do modal de presentes.
- [ ] Publicar a pasta na Vercel, Netlify Drop ou Cloudflare Pages com HTTPS ativo.