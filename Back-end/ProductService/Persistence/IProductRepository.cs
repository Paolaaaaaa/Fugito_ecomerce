using MongoDB.Driver;
using ProductService.models;

public interface IProductRepository
{

    Task<List<Product>> GetProducts();
    Task<Product?> GetProductById(Guid id);
    Task<Product> CreateProduct(Product product);
    Task<ReplaceOneResult> UpdateProduct(Guid id, Product product);
    Task<DeleteResult> DeleteProduct(Guid id);

}
