using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi_courtbook.Models
{
    public class UsuarioDto
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string NomeCompleto { get; set; }
        [BsonRequired]
        public string NomeUsuario { get; set; }
        public string Email { get; set; }
        [BsonRequired]
        public string Senha { get; set; }
        [BsonRequired]
        public Perfil Perfil { get; set; }
    }
}
