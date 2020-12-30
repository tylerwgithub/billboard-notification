import { getDB } from "../Helper/dbConnection.js";
const client = getDB();

const doc = { email: "wangtongyuu@hotmail.com" };

export const createUserService = async (userEmail) => {
  try {
    if (!client.isConnected()) await client.connect();
    const database = client.db("music-feed");
    const collection = database.collection("user");
    const createdUser = await collection.insertOne(userEmail);
    console.log(
      `${createdUser.insertedCount} documents were inserted with the _id: ${createdUser.insertedId}`
    );
    return createdUser;
  } finally {
    await client.close();
  }
};

export const getAllEmailsService = async () => {
  try {
    if (!client.isConnected()) await client.connect();
    const database = client.db("music-feed");
    const collection = database.collection("user");
    const emails = await collection.distinct("email");
    const stringEmails = emails.toString();
    return stringEmails;
  } finally {
    await client.close();
  }
};
// getAllEmails();
