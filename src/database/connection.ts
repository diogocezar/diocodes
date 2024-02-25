import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.URI_MONGODB || "";
const DATABASE = "diocodes";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect() {
  await client.connect();
  return client.db(DATABASE);
}
