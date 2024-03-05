import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const person = await prisma.person.upsert({
    where: { email: "diogo@diogocezar.com" },
    update: {},
    create: {
      name: "Diogo Cezar",
      email: "diogo@diogocezar.com",
      removedAt: null,
      updatedAt: null,
    },
  });
  const user = await prisma.user.upsert({
    where: { personId: person.id, person: { email: "diogo@diogocezar.com" } },
    update: {},
    create: {
      role: "ADMIN",
      personId: person.id,
      removedAt: null,
      updatedAt: null,
    },
    include: { person: true },
  });
  const tags = [
    "Bons exemplos",
    "Boa explicação",
    "Clareza",
    "Repetitivo",
    "Confuso",
    "Chato",
    "Fácil entendimento",
    "Difícil entendimento",
    "Faltou Tempo",
    "Engajado",
    "Carreira",
    "Estudos",
    "Ferramentas",
    "Produtividade",
    "Segurança",
    "Vida e Trabalho",
    "Tecnologia",
    "Comunicação",
    "Liderança",
    "Gestão",
    "Organização",
    "Planejamento",
    "Estratégia",
    "Inovação",
    "Criatividade",
    "programação",
    "Banco de Dados",
    "Front-end",
    "Back-end",
    "Mobile",
    "Cloud",
    "Devops",
    "Qualidade",
    "Testes",
    "Automação",
    "Segurança",
    "Privacidade",
    "Compliance",
    "Governança",
    "Ética",
    "Sustentabilidade",
    "Diversidade",
    "Inclusão",
    "Acessibilidade",
    "Educação e Ensino",
    "Treinamento",
    "Capacitação",
    "Certificação",
    "Graduação",
    "Pós-graduação",
    "Mestrado",
    "Doutorado",
    "Especialização",
    "MBA",
    "Idioma",
  ];
  const createTagArray = tags.map((tag) => {
    return {
      name: tag,
      removedAt: null,
      updatedAt: null,
    };
  });
  await prisma.tag.createMany({
    data: createTagArray,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
