using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProductService.models;
using ProductServiceContext;

public class ProductRepository:IProductRepository
{
    private readonly IMongoCollection<Product> _context;
    public
    ProductRepository(IOptions<MongoDBSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
        _context = database.GetCollection<Product>(settings.Value.ProductsCollectionName);
    }

    public async Task<List<Product>> GetProducts()
    {
        return await _context.Find(_ => true).ToListAsync();
    }
    public async Task<Product?> GetProductById(Guid id)
    {
        return await _context.Find(product => product.Id == id).FirstOrDefaultAsync();
    }
    public async Task<Product> CreateProduct(Product product)
    {
        await _context.InsertOneAsync(product);
        return product;
    }
    public async Task<ReplaceOneResult> UpdateProduct(Guid id,Product product)
    {
        
        return await _context.ReplaceOneAsync(p => p.Id == id, product);
    }
    public async Task<DeleteResult> DeleteProduct(Guid id)
    {
        return await _context.DeleteOneAsync(product => product.Id == id);
    }




    
}