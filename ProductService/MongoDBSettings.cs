using Microsoft.EntityFrameworkCore;
using ProductService.models;

namespace ProductServiceContext
{

 public class MongoDBSettings
 {
     public string ConnectionString { get; set; } = string.Empty;
     public string DatabaseName { get; set; } = string.Empty;
     public string ProductsCollectionName { get; set; } = "Products";

   
 }
}