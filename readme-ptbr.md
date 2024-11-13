# Outsera Assessment Movie API

Esta é uma API simples de filmes construída com NestJS, que inclui recursos para gerenciar filmes e calcular intervalos de prêmios com base nos produtores. O projeto está configurado para suportar ambientes de desenvolvimento e produção, além de testes de integração.

## Índice

- [Link para o README em Ingles / English README](README.md)
- [Pré-requisitos](#pré-requisitos)
- [Instalação do Projeto](#instalação-do-projeto)
- [Executando a Aplicação](#compilar-e-executar-o-projeto)
- [Executando Testes](#executar-testes)
- [Executando em Produção](#executando-em-produção)

## Pré-requisitos

Antes de começar, verifique se você tem os seguintes itens instalados:

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação do Projeto

```bash
$ npm install
```
O arquivo csv opcional está localizado em ./db/movielist.csv. Se fornecido, o servidor importará cada linha para a tabela de filmes.

## Compilar e executar o projeto
```bash
# modo desenvolvimento
$ npm run start

# modo observação (watch mode)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

O projeto roda em localhost:3000
a rota GET na raiz localhost:3000 deve retornar 'Hello World!' caso o projeto rode normalmente.

Existe uma documentação das rotas e do CRUD com exemplos na rota:
localhost:3000/doc


## Executar testes
```bash
# testes unitários
$ npm run test

# testes de integração (e2e)
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Executando em Produção
Para rodar o servidor:
```bash
$ npm install -g pm2
# executa o servidor
$ pm2 start dist/src/main.js --name "nest-app"
```
Para matar o servidor:
```bash
# mata o servidor
$ pm2 stop nest-app
```

## Deployment
Quando estiver pronto para implantar sua aplicação NestJS em produção, existem algumas etapas importantes que você pode seguir para garantir que ela seja executada da forma mais eficiente possível. Consulte a documentação de deployment para mais informações.

Se você está procurando uma plataforma baseada em nuvem para implantar sua aplicação NestJS, confira o Mau, nossa plataforma oficial para implantar aplicações NestJS na AWS. O Mau torna o deployment simples e rápido, exigindo apenas alguns passos simples:

Quando estiver pronto para implantar sua aplicação NestJS em produção, existem algumas etapas importantes que você pode seguir para garantir que ela seja executada da forma mais eficiente possível. Consulte a documentação de deployment para mais informações.

Se você está procurando uma plataforma baseada em nuvem para implantar sua aplicação NestJS, confira o Mau, nossa plataforma oficial para implantar aplicações NestJS na AWS. O Mau torna o deployment simples e rápido, exigindo apenas alguns passos simples:

```bash
$ npm install -g mau
$ mau deploy
```

Com o Mau, você pode implantar sua aplicação em apenas alguns cliques, permitindo que você se concentre em construir recursos em vez de gerenciar infraestrutura.
