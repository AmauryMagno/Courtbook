using MongoDB.Bson.Serialization.Attributes;

namespace WebApi_courtbook.Models
{
    public class IEntity
    {
        [BsonIgnore]
        public string Id { get; set; }
    }
}
