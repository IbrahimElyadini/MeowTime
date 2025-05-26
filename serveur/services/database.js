require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

class DatabaseService {
  async connectToServer() {
    try {
      const uri = process.env.MONGODB_URI;
      const dbName = process.env.MONGODB_DB;

      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log('Connexion à MongoDB réussie.');
    } catch (err) {
      console.error('Erreur de connexion MongoDB :', err);
    }
  }
}

const dbService = new DatabaseService();
module.exports = { dbService };
