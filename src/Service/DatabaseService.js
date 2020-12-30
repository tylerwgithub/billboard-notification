import { getDB } from "../Helper/dbConnection.js";
const client = getDB();
console.log(client);
export const createUserService = async (email) => {
  try {
    if (!client.isConnected()) await client.connect();
    const database = client.db("music-feed");
    const collection = database.collection("user");
    const query = { email: email };
    const res = await collection.findOne(query);
    if (!res) {
      const createdUser = await collection.insertOne(query);
      console.log(
        `${createdUser.insertedCount} documents were inserted with the _id: ${createdUser.insertedId}`
      );
      return "Thanks for your subscription!";
    }
    return "You are already subscribed!";
  } finally {
    // await client.close();
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
    // await client.close();
  }
};

export const createWeekService = async (week) => {
  try {
    if (!client.isConnected()) await client.connect();
    const database = client.db("music-feed");
    const collection = database.collection("chart");
    const query = { week: week };
    // const createdUser = await collection.insertOne(query);
    const res = await collection.findOne(query);
    if (!res) {
      const createdWeek = await collection.insertOne(query);
      console.log(
        `${createdWeek.insertedCount} documents were inserted with the _id: ${createdWeek.insertedId}`
      );
      return true;
    }
    return false;
  } finally {
    // await client.close();
  }
};
// createWeekService("1223");
// getAllEmails();
