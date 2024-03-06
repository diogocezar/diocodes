# Diocodes Website

Olá, bem vindo ao repositório do site da Diocodes. Aqui você encontrará o código fonte do site, bem como instruções para rodar o projeto localmente.

## 📝 Sumário

- [Diocodes Website](#diocodes-website)
  - [📝 Sumário](#-sumário)
  - [✅ Tarefas](#-tarefas)
  - [📦 Instalação](#-instalação)
  - [🚀 Rodando o projeto localmente](#-rodando-o-projeto-localmente)

## ✅ Tarefas

- [x] Criar sistema de autenticação;
- [x] Permitir apenas login de usuários específicos;
- [x] Criar layout da página de login;
- [x] Layout do login responsivo;
- [x] Criar layout do Dashboard;
- [x] Separar Menu do Dashboard;
- [x] Menu selecionado de acordo com a rota;
- [x] Criar layout básico de uma data table;
- [x] Criação de Tags;
- [x] Loading da tabela;
- [x] Desabilitar componentes enquanto carrega tabela;
- [x] Exclusão de Tags;
- [x] Edição de Tags;
- [x] Layout do modal de confirmação;
- [x] Organização dos Componentes no CRUD;
- [x] Confirmação ao excluir;
- [x] Criar services;
- [x] Ajustar updatedAt e removedAt;
- [x] Criar curd de pessoas;
- [x] Criar crud de usuários;
- [x] Permitir login apenas de usuários cadastrados;
- [x] Estilo para o loading do select;
- [x] Ajustar layout do select (opções);
- [x] Procurar por pessoa no cadastro de usuário;
- [x] Criar crud de mentorias;
- [x] Criar layout base para sistema de administração;
- [x] Ajustar bug do check encima do select;
- [x] Ajustar layout do datepicker;
- [x] Criar componente de tempo;
- [x] Salvar a data e hora no banco de dados;
- [x] Mostrar data e hora na tablela de mentorias;
- [x] Erro ao editar data e hora;
- [x] Data de término não pode ser menor que a data de início;
- [x] Criar crud de avaliações;
  - [x] Alterar a nota para um slider;
  - [x] Aparência do slider;
  - [x] Editar deve puxar as tags cadastradas;
  - [x] Comentários como textarea;
  - [x] Lista com os campos das avaliações;
- [x] Criar crud de invites;
- [x] Fazer uma marcação ✅ nas mentorias que já possuem convite;
- [x] Definir tags e deixá-las no seed;
- [x] Definir o máximo de tags por avaliação;
- [ ] Criar sistema de sincronização com Cal.com acionado por um botão em metorias;
- [ ] Criar um registro já excluído;
- [ ] Conferir todos os filtros;
- [ ] Sonner de erros na tentativa de cadastrar os formulários;
- [ ] Criar layout da página de avaliação (para preenchimento);
- [ ] Criar funcionalidade de enviar avaliação por e-mail;
- [ ] Criar back-end para popular dados do Dashboard;
- [ ] Separar componentes do Dashboard;
- [ ] Obter as informações do Dashboard do Backend;
- [ ] Criar layout da página de avaliações;
- [ ] Criar aplicação para PRD do GitHub;
- [ ] Criar service para Cal.com;
- [ ] Criar proteção das rotas em `/admin`;
- [ ] Criar página de erros;
- [ ] Tratar erros na página de login `http://localhost:3000/admin?error=AccessDenied`

## 🖥️ Tecnologias

https://time.openstatus.dev/
https://craft.mxkaske.dev/post/fancy-multi-select

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
