import express from "express";
import router from "./Router/router.js";
// import mongodb from "mongodb";

const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.use("/", router);

// const uri =
//   "mongodb+srv://user0:00000000@cluster0.8tton.mongodb.net/music-feed?retryWrites=true&w=majority";
// const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });

// const connectDB = async () => {
//   try {
//     const uri =
//       "mongodb+srv://user0:00000000@cluster0.8tton.mongodb.net/music-feed?retryWrites=true&w=majority";
//     const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
//     await client.connect();
//     return client;
//   } catch (err) {
//     console.log("unable to connect to DB!", err);
//   }
// };

// const doc = { email: "wangtongyuu@hotmail.com" };

// const createUser = async (userEmail) => {
//   try {
//     await client.connect();
//     const database = client.db("music-feed");
//     const collection = database.collection("user");
//     const user = await collection.insertOne(userEmail);
//     console.log(
//       `${user.insertedCount} documents were inserted with the _id: ${result.insertedId}`
//     );
//   } finally {
//     await client.close();
//   }
// };

// const getAllEmails = async () => {
//   try {
//     console.log(client.isConnected());
//     await client.connect();
//     console.log(client.isConnected());
//     const database = client.db("music-feed");
//     const collection = database.collection("user");
//     const emails = await collection.distinct("email");
//     const stringEmails = emails.toString();
//     console.log(stringEmails);
//   } finally {
//     await client.close();
//   }
// };
// getAllEmails();
