import { createAvaliation } from "@/database/avaliation";
import { logger } from "@/lib/logger";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const result = await createAvaliation({
      comment: "Testando um comentário",
      rating: 5,
      wasSent: false,
      removedAt: null,
      createdAt: new Date(),
      id: randomUUID(),
      bookingId: randomUUID(),
      updatedAt: null,
    });
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    logger.error("Error creating avaliation", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
