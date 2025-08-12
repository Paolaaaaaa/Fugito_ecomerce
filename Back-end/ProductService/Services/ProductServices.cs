using Microsoft.EntityFrameworkCore;
using ProductServiceContext;
using ProductService.DTOs;
using ProductService.interfaces;
using ProductService.models;

public class ProductServices : IProductService
{

    private readonly IProductRepository dBContext;
    public ProductServices(IProductRepository dBContext)
    {
        this.dBContext = dBContext;
    }


    public async Task<Product> CreateProductAsyc(ProductDTO dto)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Price = dto.Price,
            Description = dto.Description,
            Image = dto.Image,
            stock =dto.stock
        };
        await dBContext.CreateProduct(product);
        return product;
    }

    public bool DeleteProduct(Guid id)
    {
        var product = dBContext.GetProductById(id);
        if (product == null)
        {
            return false;
        }
        _ = dBContext.DeleteProduct(id);

        return true;
    }

    public async Task<List<Product>> GetAllProducts()
    {
        return await dBContext.GetProducts();
    }

    public async Task<Product?> GetProductById(Guid id)
    {
        return await dBContext.GetProductById(id);
    }

    public Product UpdateProduct(Guid id, ProductDTO dto)
    {
        var product = dBContext.GetProductById(id);
        if (product == null)
        {
            throw new Exception("Product not found");
        }

        var product_c = new Product
        {
            Id = id,
            Name = dto.Name,
            Price = dto.Price,
            Description = dto.Description,
            Image = dto.Image,
            stock = dto.stock
        };


        _ = dBContext.UpdateProduct(id, product_c);
        return product_c;

    }
}