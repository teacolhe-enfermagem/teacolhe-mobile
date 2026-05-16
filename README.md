# TEAcolhe

## Visão geral

O **TEAcolhe** é um aplicativo que auxilia profissionais de enfermagem (auxiliares, técnicos e enfermeiros) no atendimento humanizado a pacientes com **Transtorno do Espectro Autista (TEA)**, considerando os níveis de suporte 1, 2 e 3, no ambiente hospitalar.

## Estrutura do projeto

```
src/
├── app/
└── features/
```

**app/** → apenas rotas

**features/** → funcionalidades do app (telas, componentes próprios, schemas)

## Como rodar o projeto

### Pré-requisitos:

**Node.js 20+**

**npm 10+**

Clone o repositório
```
git clone https://github.com/teacolhe-enfermagem/teacolhe-mobile.git
cd teacolhe-mobile
```

Instale as dependências

```
npm install
```

> [!WARNING]
> ATENÇÃO: é preciso ter o node e o npm instalado em sua máquina


Rode o projeto com

```
npx expo start
```

Escaneie o QR Code pelo aplicativo do Expo Go pelo seu celular