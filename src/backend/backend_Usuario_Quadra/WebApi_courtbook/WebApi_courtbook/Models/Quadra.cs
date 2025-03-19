using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_courtbook.Models
{
    public class Quadra
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        public string Nome { get; set; }
        [BsonRequired]
        public string Categoria { get; set; }
        [BsonRequired]
        public string Detalhes { get; set; }
        [BsonRequired]
        public string Localizacao { get; set; }
    }
}
