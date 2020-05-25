using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System; 

namespace ReactCore.Models
{
    public class Comment
    {
        [BsonElement("_id")]
        [JsonProperty("_id")]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("postId")]
        [JsonProperty("postId")]
        public string PostId { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }       
        public DateTime CreatedOn { get; set; }

      
    }
}
