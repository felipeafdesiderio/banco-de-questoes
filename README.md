# Banco de Questões PMESP

Plataforma web de preparação estratégica para concursos da **Polícia Militar do Estado de São Paulo (PMESP)** — carreiras de **Praça (Soldado)** e **Oficialato (CFO)**. Este documento consolida visão de produto, design system, rotas, arquitetura, padrões de Git e instruções para desenvolvimento local.

---

# 📌 1. Visão Geral do Projeto

- **Nome:** Banco de Questões PMESP
- **Descrição:** Plataforma web focada na preparação estratégica e de alta performance para os concursos da Polícia Militar do Estado de São Paulo (PMESP), cobrindo carreiras de **Praça (Soldado)** e **Oficialato (CFO)**.
- **Diferencial competitivo:**
  - Foco **100% no edital** mapeado tópico a tópico.
  - Avalanches de questões **direcionadas e inéditas** (roadmap Pro).
  - **Teoria objetiva gratuita indicada** (YouTube / bases públicas), sem depender de cursinho caro.
  - Flexibilidade para o aluno **montar o próprio cronograma** — sem rotinas engessadas do tipo “matéria X na segunda, Y na terça”.
- **Público-alvo:** candidatos que buscam método claro, volume de prática e transparência de planos antes de investir no Pro.

---

# 🎨 2. Identidade Visual e Design System

## Tema principal

- **Dark Mode nativo:** a aplicação é servida com `class="dark"` em `index.html`, priorizando a experiência noturna operacional.
- **Paleta Operacional Navy / Slate Blue:** tons frios de azul e slate; **sem** acentos alaranjados ou avermelhados no layout principal (exceção pontual: ícone `✕` de restrição em vermelho esmaecido nos planos).

## Paleta de cores (Tailwind CSS)

| Uso | Classes / tokens | Referência |
|-----|------------------|------------|
| Fundo principal (body / app) | `bg-slate-950`, token `canvas` (`--ds-canvas: 2 6 23`) | `#020617` |
| Cards, header, seções | `bg-slate-900`, token `surface` / `card` | `#0f172a` |
| Bordas | `border-slate-800`, token `line` | `#1e293b` |
| Títulos | `text-slate-50` / `text-white`, token `title` | — |
| Texto secundário | `text-slate-400`, token `muted` | — |
| CTAs, badges, acentos | `bg-blue-600`, `hover:bg-blue-500`, `shadow-blue-950/50` | — |
| Botões secundários | `bg-slate-800/80`, `border-slate-700/80`, `hover:bg-slate-700` | — |

## Tipografia

- **Fonte:** Inter (Google Fonts), aplicada via `index.css` e `fontFamily.sans` no `tailwind.config.js`.

## Tokens reutilizáveis

- Variáveis CSS em `src/index.css` (`--ds-*`) espelhadas como cores Tailwind (`canvas`, `surface`, `accent`, etc.).
- Constantes de UI centralizadas em `src/lib/ui-styles.ts` (`cardBase`, `btnPrimaryLg`, `btnSecondaryLg`, `badgeClass`, `pillarCardClass`, etc.) para consistência entre páginas.

## Animações e UX

- **Microinterações nos cards de planos:** `hover:-translate-y-1.5`, elevação de borda e sombra (`hover:shadow-lg`, sombra azul no Pro).
- **Transições:** `transition-all duration-200` (CTAs) e `duration-300` (cards).
- **Layout de planos:** grid compacto, listas com `line-clamp` e altura flexível — objetivo de **cabimento confortável na viewport** sem scroll interno nos cards.
- **Acessibilidade:** ícones decorativos com `aria-hidden`; headings com `aria-labelledby` na seção de pricing.

---

# 🛠️ 3. Tecnologias Utilizadas

| Camada | Tecnologia | Versão / nota |
|--------|------------|----------------|
| **UI** | React | 19.x |
| **Linguagem** | TypeScript | 6.x |
| **Build & dev server** | Vite | 8.x |
| **Roteamento** | React Router DOM | 7.x (SPA, rotas em `src/routes/app-routes.tsx`) |
| **Estilização** | Tailwind CSS + PostCSS | 3.4.x |
| **Ícones** | Lucide React | Check, X, ArrowLeft, Sparkles, etc. |
| **Formulários** | React Hook Form + Zod | Validação por página (`*-schema.ts`) |
| **Backend-as-a-Service** | Supabase | Auth, PostgreSQL, migrations em `supabase/` |
| **Lint** | Oxlint | `npm run lint` |
| **Versionamento** | Git & GitHub | Fluxo Git Flow (seção 5) |

> **Nota arquitetural:** o frontend é uma **SPA React + Vite**, não Next.js. O roteamento é declarativo via React Router; páginas ficam em `src/pages/` e componentes em `src/components/`.

---

# 📂 4. Estrutura e Rotas da Aplicação

## Mapa de rotas

| Rota | Página / componente | Observação |
|------|---------------------|------------|
| `/` | `Home` → `HeroManifest` | Landing + manifesto |
| `/planos` | `Plans` → `PricingPlans` | Planos isolados |
| `/login` | `Login` | Redireciona se já autenticado |
| `/register`, `/cadastro` | `Register` | Alias `/cadastro` para CTAs de plano |
| `/forgot-password` | `ForgotPassword` | Recuperação de senha |
| `/reset-password` | `ResetPassword` | Token de redefinição |
| `/complete-profile` | `CompleteProfile` | Rota protegida pós-cadastro |

Shell global (`App.tsx`): **Header** + **main** (rotas) + **Footer**. Se Supabase não estiver configurado, exibe `SupabaseConfigAlert` em vez do shell completo.

## Estrutura de pastas (resumo)

```text
banco-de-questoes/
├── public/                 # Assets estáticos (imagens PMESP, favicon)
├── src/
│   ├── components/         # UI por feature (header, pricing, hero-manifest, …)
│   ├── contexts/           # AuthProvider (Supabase session)
│   ├── hooks/              # useAuth
│   ├── lib/                # supabase, cpf, ui-styles, form-styles
│   ├── pages/              # Telas + schemas Zod
│   ├── routes/             # app-routes.tsx
│   └── types/              # database.ts (tipos Supabase)
├── supabase/
│   ├── config.toml
│   └── migrations/         # profiles, hardening RLS/funções
├── index.html              # `lang="pt-BR"`, tema dark
└── vite.config.ts
```

### **A. Home (`/`)**

- **Header global:** marca “Banco de Questões” + ações **Entrar** / **Cadastrar** (ou e-mail + Sair quando logado).
- **Hero:** headline *“Sua farda na PMESP começa aqui”*; copy para **Praça e Oficialato**; CTAs lado a lado — **“Começar a Estudar”** (`/register`) e **“Conhecer Planos”** (`/planos`).
- **Manifesto (“Somente o Papiro liberta”):** metodologia teoria objetiva + prática constante; palavras-chave em **negrito/branco**; blockquote de impacto:
  > *Disciplina bate sorte. Faça o básico bem feito, todos os dias, sem procurar atalho — quem dá mais o gás, vence. É assim que a farda chega.*
- **Pilares:** Teoria + Prática, Foco PMESP, Sem Atalhos (cards com hover).
- **Decisão de layout:** a grade de planos **não** aparece na Home — redirecionamento explícito para `/planos`.

### **B. Página isolada de planos (`/planos`)**

- Header e Footer globais (via `AppShell`).
- Botão **“← Voltar”** no canto superior esquerdo: `navigate(-1)` com fallback para `/` (equivalente prático a `router.back()` quando há histórico).
- **Plano Gratuito (R$ 0/mês):**
  - Transparência para testar o método antes de pagar.
  - 5 itens na lista: **1 incluso** (`Check`) e **4 restrições** (`X` em tom esmaecido / vermelho sutil).
  - CTA: **“Criar Conta Grátis”** → `/cadastro`.
- **Plano Pro (R$ 19,90/mês — destaque):**
  - Badge **“Mais Recomendado”**.
  - Borda / ring azul e CTA `bg-blue-600`.
  - 5 recursos inclusos com `Check` azul (questões ilimitadas, exclusivas, métricas, perfil com ranking/tempo, filtros avançados).
  - CTA: **“Assinar Pro”** → `/cadastro?plan=pro`.

### **C. Autenticação e perfil**

- Login e cadastro com validação Zod; opção **Google OAuth** (`GoogleOAuthButton`) quando habilitado no Supabase.
- Campo **CPF** com máscara/validação (`src/lib/cpf.ts`).
- Requisitos de senha documentados na UI (`password-requirements`).
- Perfil persistido via migrations Supabase (`profiles`, políticas RLS).

---

# 🌿 5. Padrões de Git e Fluxo de Trabalho (Git Flow)

## Estrutura de branches

| Branch | Propósito |
|--------|-----------|
| `main` | **Produção** — código estável e testado |
| `develop` | **Integração** — entregas semanais unificadas |
| `feature/DD-MM-YYYY` | Features da semana (ex.: `feature/28-09-2026`) |
| `fix/DD-MM-YYYY` | Correções operacionais pontuais |

## Padrão de commits (Conventional Commits — inglês)

- `feat(scope): description`
- `fix(scope): description`
- `refactor(scope): description`

**Exemplo:**

```text
feat(plans): add standalone pricing page and update dark theme palette
```

## Processo de deploy e code review

1. Desenvolver sempre em branch derivada de `develop` (ex.: `feature/28-09-2026`).
2. Garantir que `node_modules/`, `.env*`, caches e builds estejam no `.gitignore` (manter apenas `.env.example` versionado).
3. Push para o GitHub e **Pull Request para `develop`**.
4. Revisão visual e técnica **antes** do merge; `main` recebe releases a partir de `develop` quando estável.

**Repositório remoto:** [https://github.com/felipeafdesiderio/banco-de-questoes](https://github.com/felipeafdesiderio/banco-de-questoes)

---

# 🚀 6. Como Rodar o Projeto Localmente

### Pré-requisitos

- **Node.js** 20+ (recomendado LTS)
- **npm** 10+
- Conta e projeto **Supabase** (URL + anon key)
- *(Opcional)* [Supabase CLI](https://supabase.com/docs/guides/cli) para migrations (`npm run db:push`)

### 1. Clonar o repositório

```bash
git clone https://github.com/felipeafdesiderio/banco-de-questoes.git
cd banco-de-questoes
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com os valores do painel Supabase (**Settings → API**):

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

> Apenas variáveis com prefixo `VITE_` são expostas ao browser. **Nunca** commite `.env` ou `.env.local`.

### 4. Subir o servidor de desenvolvimento

```bash
npm run dev
```

Abra a URL exibida no terminal (geralmente `http://localhost:5173`).

### 5. Build de produção e preview

```bash
npm run build
npm run preview
```

### 6. Banco de dados (Supabase)

```bash
npm run db:status   # listar migrations
npm run db:push     # aplicar migrations no projeto linkado
```

### Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Vite dev server + HMR |
| `npm run build` | `tsc -b` + bundle de produção em `dist/` |
| `npm run build:gh-pages` | Build com `base` `/banco-de-questoes/` para GitHub Pages |
| `npm run preview` | Servir build local |
| `npm run typecheck` | TypeScript (`tsc -b`) sem emitir arquivos |
| `npm run lint` | Oxlint no código |
| `npm run db:push` | Push de migrations Supabase |
| `npm run db:status` | Status das migrations |

### Deploy (Vercel — recomendado)

1. Importe o repositório na [Vercel](https://vercel.com) (framework **Vite** detectado via `vercel.json`).
2. Configure **Environment Variables** (Production e Preview):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_MOCK_AUTH=true` (já sugerido no `vercel.json` para conta demo; desative em produção real se preferir)
3. Build: `npm run build` · Output: `dist` · Rewrites SPA já definidos em `vercel.json`.

**Conta demo (mock):** `teste@pmesp.com` / `Teste123!` — requer `VITE_MOCK_AUTH=true` no build.

### Deploy (GitHub Pages)

1. Em **Settings → Pages**, source **GitHub Actions**.
2. Secrets do repositório: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
3. Push em `main` dispara `.github/workflows/github-pages.yml` (`npm run build:gh-pages`).

> **Nota:** este projeto é **Vite + React (SPA)**, não Next.js. Não há `next.config` — use `vite.config.ts` e `vercel.json`.

---

# 🏗️ 7. Decisões Arquiteturais e Padrões de Desenvolvimento

## Camadas do frontend

1. **Rotas** (`app-routes.tsx`) — definem URLs e guards (`ProtectedRoute`).
2. **Páginas** (`src/pages/*`) — composição de layout e formulários.
3. **Componentes** (`src/components/<feature>/`) — UI reutilizável, um diretório por feature.
4. **Lib / hooks** — integração Supabase, estilos, CPF, auth (`useAuth` + `AuthProvider`).

## Autenticação

- Cliente Supabase em `src/lib/supabase.ts`; sessão reativa via `AuthContext`.
- Rotas públicas de auth usam `redirectIfAuth`; `/complete-profile` exige `requireAuth`.

## Formulários

- Schema **Zod** por fluxo (`login-schema.ts`, `register-schema.ts`, …).
- **React Hook Form** + `@hookform/resolvers/zod` para validação e UX de erro.

## Design system no código

- Preferir tokens de `ui-styles.ts` e classes `dark:*` alinhadas à paleta slate/blue.
- Imagens institucionais em `public/images/` (`pmesp-hero.jpg`, `pmesp-manifesto.jpg`).

## Segurança

- RLS e funções endurecidas nas migrations Supabase.
- Chave anon no frontend **somente** com políticas RLS corretas; segredos de service role **nunca** no Vite.

## Qualidade

- Execute `npm run lint` antes de abrir PR.
- Commits pequenos e escopados (`feat`, `fix`, `refactor`).

---

# 📄 Licença e contribuição

Projeto **privado** (`"private": true` no `package.json`). Contribuições seguem o fluxo de PR para `develop` descrito na seção 5.

---

**Branch de trabalho atual (exemplo):** `feature/28-09-2026` — desenvolvimento contínuo sem merge imediato até revisão do PR.
