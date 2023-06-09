using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MongoDB.Driver;

namespace Persistence
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
        public MongoDbContext(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Message> Messages => _database.GetCollection<Message>("Messages");
    }
}