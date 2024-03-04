import {
  getAllInvites,
  createInvite,
  removeInvite,
  updateInvite,
} from "@/database/invite";

export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await createInvite(data);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  const data = await req.json();
  const { id, ...dataToUpdate } = data;
  try {
    const result = await updateInvite(data.id, dataToUpdate);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const GET = async () => {
  try {
    const result = await getAllInvites();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.json();
  try {
    const result = await removeInvite(data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
