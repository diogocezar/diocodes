import { connect } from "@/database/connection";

const COLLECTION = "avaliation";

export async function POST(request: Request) {
  const data = await request.json();
  const db = await connect();
  const collection = db.collection(COLLECTION);
  try {
    const result = await collection.insertOne(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
