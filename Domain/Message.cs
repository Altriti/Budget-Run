using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("SenderUserId")]
        public string SenderUserId { get; set; }
        [BsonElement("Sender")]
        public AppUser Sender { get; set; }
        [BsonElement("RecieverUserEmail")]
        public string RecieverUserEmail { get; set; }
        [BsonElement("RecieverUserId")]
        public string RecieverUserId { get; set; }
        [BsonElement("Reciever")]
        public AppUser Reciever { get; set; }

        [BsonElement("Content")]
        public string Content { get; set; }
        [BsonElement("Time")]
        public DateTime Time { get; set; }
        [BsonElement("Approved")]
        public bool Approved { get; set; }
        [BsonElement("ApprovedTime")]
        public DateTime ApprovedTime { get; set; }
    }
}