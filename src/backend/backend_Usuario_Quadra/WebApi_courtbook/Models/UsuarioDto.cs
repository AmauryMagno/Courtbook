using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace WebApi_courtbook.Models
{
    public class UsuarioDto
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string NomeCompleto { get; set; }
        
        [BsonRequired]
        [Required(ErrorMessage = "O nome de usuário é obrigatório")]
        public string NomeUsuario { get; set; }
        public string Email { get; set; }
        [BsonRequired]
        [Required(ErrorMessage = "A senha é obrigatória")]
        public string Senha { get; set; }
        [BsonRequired]
        [Required(ErrorMessage = "O perfil é obrigatório")]
        public Perfil Perfil { get; set; }
    }
}
