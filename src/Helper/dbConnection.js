import mongodb from "mongodb";

const uri =
  "mongodb+srv://user0:00000000@cluster0.8tton.mongodb.net/music-feed?retryWrites=true&w=majority";
let client = null;

export const getDB = () => {
  try {
    if (!client)
      client = new mongodb.MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    return client;
  } catch (error) {
    console.log(error);
    return null;
  }
};
