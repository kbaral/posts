using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System; 

namespace ReactCore.Models
{
    public class Post
    {
        [BsonElement("_id")]
        [JsonProperty("_id")]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }
        public string Preview { get; set; }
        public string Contents { get; set; }
        public DateTime CreatedOn { get; set; }

      
    }
}
