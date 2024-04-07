# Diocodes Website

Olá, bem vindo ao repositório do site da Diocodes. Aqui você encontrará o código fonte do site, bem como instruções para rodar o projeto localmente.

## Objetivo

Este projeto tem como objetivo ser um sistema de gerenciamento de mentorias, onde é possível cadastrar mentorias, avaliações, pessoas e usuários.

Além disse serve como um repositório de estudos, onde é possível usar como exemplo as implementações realizadas aqui para a construção de um sistema completo utilizando algumas das tecnologias mais utilizadas no mercado.

Neste projeto utilizou-se as seguintes tecnologias:

- NextJS;
- ReactJS;
- TypeScript;
- Shadcn;
- Prisma;
- MongoDB;
- TailwindCSS;
- Axios;
- Zod;
- NextAuth;

## Sistemas de terceiros

- Cal.com - É o sistema utilizado para realizar os agendamentos de mentorias;
- Stripe - É o sistema utilizado para a realização de pagamentos;
- Resend.io - É o sistema utilizado para o envio de e-mails;

## Variáveis de Ambiente

Todas as variáveis de ambiente utilizadas neste projeto estão no arquivo `.env.example`. Para rodar o projeto localmente é necessário criar um arquivo `.env` e adicionar as variáveis de ambiente necessárias.

## Emails

O sistema de e-emails utilizado neste projeto utiliza o Resend.io. Para configurar o envio de e-mails é necessário criar uma conta no Resend.io e adicionar as variáveis de ambiente necessárias.

A pasta `emails` contém os templates de e-mails utilizados no projeto.

Nesta pasta também é possível executar um projeto no ambiente de desenvolvimento que mostra uma preview de como os templates de e-mails ficarão.

Para rodar o projeto de e-mails basta utilizar o comando `pnpm dev` na pasta `emails`.

## Prisma

O Prisma é o ORM utilizado neste projeto. Para rodar o projeto localmente é necessário rodar o comando `pnpm prisma:generate` para gerar os arquivos necessários para o Prisma.

O arquivo de seed do Prisma está na pasta `prisma/seed.ts`. Para rodar o seed basta utilizar o comando `pnpm prisma:seed`.

Caso queira enviar a estrutura do banco de dados para o MongoDB é necessário rodar o comando `pnpm prisma:push`.

Caso queira analisar os dados com o Prisma Studio é necessário rodar o comando `pnpm prisma:studio`.

## Deploy

Este projeto utiliza a Vercel para a realização de seu deploy.

Adicionalmente, configura-se o Dockerfile e o Github actions para uma possível subida no Google Cloud Run.

## Banco de Dados

Este projeto utiliza o Atlas MongoDB para o armazenamento de seus dados.

### Como realizar o Backup do MongoDB?

Caso precise realizar um backup do seu banco de dados:

```bash
mongodump --uri "mongodb://mongodb0.example.com:27017" --gzip -d nomedobanco
mongorestore --uri "mongodb://mongodb0.example.com:27017" --gzip ./dump/
mongorestore --uri "mongodb://mongodb0.example.com:27017" --gzip ./dump/nomedobanco -d nomedobanco
```

### Script para realizar backup do Banco de Dados

Caso queira gerar um script para realizar o backup do banco de dados, basta utilizar o seguinte script:

```bash
mongodump --uri "mongodb://mongodb0.example.com:27017" --gzip
D=$(date '+%Y-%m-%d-%H')
zip -r $D.zip ./dump/
aws s3 cp $D.zip s3://<s3-bucket-name>/$D --profile michels
rm -rf ./dump/
rm -f $D.zip
```

## Autenticação

Para a autenticação deste projeto, utiliza-se o NextAuth. Para configurar a autenticação é necessário adicionar as variáveis de ambiente necessárias.

Neste projeto estão configuradas as seguintes autenticações:

- GitHub;
- Google;

## Webhook de Pagamentos

Para a realização de pagamentos, utiliza-se o Stripe.

Este sistema expõe um webhook para que quando um pagamento seja efetuado, um email seja enviado para o administrador.

## Webhook de Agendamentos

Sempre que um agendamento é realizado, um webhook é enviado para o sistema que realiza a sincronização de pessoas e agendamentos.

## Funcionalidades

### Dashboard

O dashboard é a página inicial do sistema. Nela é possível visualizar as as estatísticas das mentorias, bem como um calendário com as mentorias agendadas.

### Mentorias

Nesta página é possível visualizar todas as mentorias cadastradas no sistema.

### Avaliações

Nesta página é possível visualizar todas as avaliações cadastradas no sistema.

### Convites

Nesta página é possível visualizar todos os convites cadastrados no sistema.

### Tags

Nesta página é possível visualizar todas as tags cadastradas no sistema.

### Pessoas

Nesta página é possível visualizar todas as pessoas cadastradas no sistema.

### Usuários

Nesta página é possível visualizar todos os usuários cadastrados no sistema.

## 🖥️ Links Úteis

https://time.openstatus.dev/
https://craft.mxkaske.dev/post/fancy-multi-select
https://dev.to/marcelomichels/criando-e-restaurando-backup-no-mongodb-5f41
https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

## 📦 Instalação

Para instalar basta utilizar o pnpm para instalar as dependências do projeto.

```bash
pnpm install
```

## 🚀 Rodando o projeto localmente

Para rodar o projeto localmente basta utilizar o comando `pnpm dev`.

```bash
pnpm dev
```
