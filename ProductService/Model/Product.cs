using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductService.models;

public class Product
{


    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; } = Guid.NewGuid();

    [BsonElement("Name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("Description")]
    public string Description { get; set; } = string.Empty;
    [BsonElement("Price")]
    public int Price { get; set; }
    [BsonElement("Stock")]
    public int stock { get; set; }

    //imagestore
    [BsonElement("Image")]
    public string Image { get; set; } = string.Empty;

}