using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WebApi_courtbook.Models;

namespace WebApi_courtbook.Services
{
    public class CourtBookService
    {
        private readonly IMongoCollection<Usuario> _usuariosCollection;
        private readonly IMongoCollection<Quadra> _quadrasCollection;

        public CourtBookService(
            IOptions<CourtBookDataBaseSettings> CourtBookDataBaseSettings)
        {
            var mongoclient = new MongoClient(
                CourtBookDataBaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoclient.GetDatabase(
                CourtBookDataBaseSettings.Value.DatabaseName);
            _usuariosCollection = mongoDatabase.GetCollection<Usuario>(
                CourtBookDataBaseSettings.Value.UsuarioCollectionName);
            _quadrasCollection = mongoDatabase.GetCollection<Quadra>(
                CourtBookDataBaseSettings.Value.QuadraCollectionName);
        }

        public async Task<List<Usuario>> GetUsuariosAsync() =>
            await _usuariosCollection.Find(_=>true).ToListAsync();

        public async Task<Usuario> GetUsuariosAsync(string id) =>
            await _usuariosCollection.Find(c =>  c.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Usuario newUsuario) =>
            await _usuariosCollection.InsertOneAsync(newUsuario);

        public async Task UpdateAsync(string id, Usuario updateUsuario) =>
            await _usuariosCollection.ReplaceOneAsync(x => x.Id == id, updateUsuario);
        
        public async Task RemoveAsync(string id)=>
            await _usuariosCollection.DeleteOneAsync(x => x.Id == id);
    }
}
