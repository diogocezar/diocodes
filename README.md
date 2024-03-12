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
- [x] Criar sistema de sincronização com Cal.com acionado por um botão em metorias;
- [x] Botão de sincronizar deve ficar carregando;
- [x] Lista deve ser atualizada depois da sincronização;
- [x] Layout do toast;
- [x] Remover o participante do convite, deixando apenas a mentoria;
- [x] Trazer apenas mentorias que já aconteceram para invite;
- [x] Aumentar a bolinha da mentoria;
- [x] Incluir mensagem na mentoria;
- [x] Layout da Página de Avaliação Pública;
- [x] Finalização da página de Avaliação Pública;
- [x] Página de Agradescimento pela Avaliação;
- [x] Carregando enquanto tudo não está oks na avaliação;
- [x] Destacar as mentorias que já ocorreram;
- [x] Criar aplicação para PRD do GitHub;
- [x] Criar o login em PRD;
- [x] Criar service para Cal.com;
- [x] Horário da mentoria no email está errado;
- [x] Revisar todas as remoções;
- [x] Sinalizar como verde somente se não tiver excluído; (Mentoria)
- [x] Criar um registro já excluído;
  - [x] Avaliations;
  - [x] Mentoring;
- [x] Não mostrar as tags nas avaliações que possuem relacionamento de AvaliationTags como removed;
- [x] Ordenar os select por ordem alfabética;
- [x] Conferir todos os filtros;
- [x] Criar back-end para popular dados do Dashboard;
- [x] Layout do Dashboard;
- [x] Obter as informações do Dashboard do Backend;
- [x] Criar lista de últimos agendamentos;
- [x] Puxar dados de Mentoring, ao invés do Cal.com (na home);
- [x] Permitir o envio das avaliações para os e-mails originais;
- [x] Criar cron que atualiza os dados do Cal.com a cada hora;
- [x] Resolver a sincronização;
- [x] Criar proteção das rotas privadas;
- [x] Separar todos os filtros das colunas em funções;
- [x] Sonner de erros na tentativa de cadastrar os formulários;
- [x] Tratar erros na página de login `http://localhost:3000/admin?error=AccessDenied`
- [x] Próxima semana disponível na página principal;
- [x] Criar botão de mentoria pro;
- [x] Destacar mentorias pro na página principal;
- [x] Criar botão de reenvio do convite;
- [x] Diferenciar mentorias que já foram avaliadas;
- [x] Ordenar os convites pela data (DESC);
- [x] Colocar Dots de Avaliação Realizada nos Convites;
- [x] Padronizar ações dos botões de editar, criar e excluir;
- [x] Destacar linhas que são PRO;
- [x] Colocar badge PRO;
- [x] Colocar a quantidade de vezes em que uma tag apareceu nas avaliações em sua listagem;
- [ ] Enviar e-mail quando avaliação for respondida;
- [ ] Menu Fixed e Scroll somente na parte do conteúdo;
- [ ] Colocar a média de avaliações na página principal;
- [ ] Colocar depoimentos na página principal;

## 🖥️ Tecnologias

https://time.openstatus.dev/
https://craft.mxkaske.dev/post/fancy-multi-select
https://dev.to/marcelomichels/criando-e-restaurando-backup-no-mongodb-5f41

## Backup do Mongo

```bash
mongodump --uri "mongodb://mongodb0.example.com:27017" --gzip -d nomedobanco

mongorestore --uri "mongodb://mongodb0.example.com:27017" --gzip ./dump/

mongorestore --uri "mongodb://mongodb0.example.com:27017" --gzip ./dump/nomedobanco -d nomedobanco
```

### Script para realizar backup do Banco de Dados

```bash
mongodump --uri "mongodb://mongodb0.example.com:27017" --gzip
D=$(date '+%Y-%m-%d-%H')
zip -r $D.zip ./dump/
aws s3 cp $D.zip s3://<s3-bucket-name>/$D --profile michels
rm -rf ./dump/
rm -f $D.zip
```

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
