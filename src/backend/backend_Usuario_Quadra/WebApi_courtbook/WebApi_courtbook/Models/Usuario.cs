using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace WebApi_courtbook.Models
{
    public class Usuario : IEntity
    {
        [BsonId]
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

    public enum Perfil
    {
        [Display(Name = "Administrador")]
        Administrador,
        [Display(Name = "Locador")]
        Locador,
        [Display(Name = "Locatario")]
        Locatario,
        [Display(Name = "LocadorLocatario")]
        LocadorLocatario

    }
}
