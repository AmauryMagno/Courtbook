using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WebApi_courtbook.Models;

namespace WebApi_courtbook.Services
{

    public class MongoService<T> where T : IEntity
    {
        private readonly IMongoCollection<T> _collection;

        public MongoService(IOptions<CourtBookDataBaseSettings> CourtBookDataBaseSettings) { }

        public MongoService(IOptions<CourtBookDataBaseSettings> settings, string collectionName)
        {
            var mongoclient = new MongoClient(settings.Value.ConnectionString);
            var mongoDatabase = mongoclient.GetDatabase(settings.Value.DatabaseName);
            _collection = mongoDatabase.GetCollection<T>(collectionName);
        }

        public async Task<List<T>> GetAsync() =>
            await _collection.Find(_ => true).ToListAsync();

        public async Task<T> GetAsync(string id)
        {
            return await _collection.Find(item => item.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(T newItem) =>
            await _collection.InsertOneAsync(newItem);

        public async Task UpdateAsync(string id, T newItem) =>
            await _collection.ReplaceOneAsync(item => item.Id == id, newItem);

        public async Task RemoveAsync(string id) =>
            await _collection.DeleteOneAsync(item => item.Id == id);
    }
}
