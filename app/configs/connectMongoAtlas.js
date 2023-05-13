// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string                                                                                                                                        
// const client = new MongoClient(process.env.MONGODB_ATLAS_URL);
// module.exports = async function connectMongoAtlas(){
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// connectMongoAtlas().catch(console.dir);