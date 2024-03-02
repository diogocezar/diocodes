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
  console.log({ user });
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
