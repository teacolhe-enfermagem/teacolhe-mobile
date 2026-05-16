# ORIENTAÇÕES DO PROJETO

# Estrutura do projeto

```txt
src/
├── app/
└── features/
```

---

# Regras da arquitetura

## app/

A pasta `app/` contém APENAS:
- chamada de telas dentro de `features/`
- rotas (navegação do Expo Router)

Não colocar:
- lógica
- hooks
- componentes grandes
- chamadas de API

Exemplo correto:

```tsx
import { LoginScreen } from "@/features/auth/screens/LoginScreen";

export default function Login() {
  return <LoginScreen />;
}
```

---

## features/

Cada feature representa uma funcionalidade do app.

Exemplo:

```
features/
├── auth/
├── chat/
└── patient/
```

Dentro das features podem existir:
- screens
- components
- hooks
- services
- schemas
- types


# Convenções de nomenclatura

## Componentes e telas

Usar PascalCase:

```txt
LoginScreen.tsx
ChatMessage.tsx
LevelCard.tsx
```

---

## Hooks

Usar camelCase iniciando com `use`

```txt
useAuth.ts
useChat.ts
```

---

## Rotas do Expo Router

Usar kebab-case:

```txt
select-level.tsx
```

---

# Organização do código

## Evitar componentes gigantes

Se um componente começar a ficar muito grande:
- dividir em componentes menores
- mover lógica para hooks
- separar responsabilidades

---

## Evitar duplicação

Antes de criar:
- componente
- hook
- util
- service

verifique se já existe algo parecido.

---

# Commits (Git Flow)

## Regras importantes

- Nunca fazer push direto na `main`

---

# Fluxo de trabalho

## 1. Atualizar a branch develop

Antes de começar qualquer tarefa:

```bash
git checkout develop
git pull origin develop
```

Isso pega as alterações recentes para evitar possíveis conflitos

---

## 2. Criar uma branch da feature

Padrão:

```bash
git checkout -b feature/nome-da-feature
```

Exemplos:

```bash
git checkout -b feature/login-screen
git checkout -b feature/chat-ui
git checkout -b feature/select-level
```

---

## 3. Fazer as alterações

Após finalizar:

```bash
git add .
git commit -m "feat: adiciona tela de login"
```

---

# Padrão de commits

Usar commits simples e descritivos.

## Tipos mais usados

```txt
feat: nova funcionalidade
fix: correção de bug
refactor: reorganização de código
style: alteração visual/estilo
docs: documentação
```

## Exemplos

```txt
feat: adiciona tela de login
fix: corrige navegação do chat
refactor: reorganiza feature auth
style: ajusta responsividade da home
docs: atualiza README
```

---

## 4. Enviar a branch para o GitHub

```bash
git push origin feature/nome-da-feature
```

Exemplo:

```bash
git push origin feature/login-screen
```

---

## 5. Abrir Pull Request

A Pull Request deve ser:
- da sua branch → para `develop`
- nunca diretamente para `main`

---

# Antes de abrir PR

Verificar:
- se o app está funcionando
- se não existem erros no terminal
- se o TypeScript não possui erros
- se o código segue a estrutura do projeto

---

# Branches do projeto

## main

Branch de produção.

Nunca fazer commit diretamente nela.

---

## develop

Branch principal de desenvolvimento.

Todas as features devem ser integradas nela via Pull Request.

---

## feature/*

Branches de funcionalidades.

Exemplos:

```txt
feature/login
feature/chat-ui
feature/select-level
```

# Dicas de boas práticas

- manter componentes pequenos
- reutilizar componentes quando possível
