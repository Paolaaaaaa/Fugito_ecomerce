using ProductService.DTOs;
using ProductService.models;
namespace ProductService.interfaces;

public interface IProductService
{
    //get all products
    Task<List<Product>> GetAllProducts();
    //get product by id
    Task<Product?> GetProductById(Guid id);
    //create a new product
    Task<Product> CreateProductAsyc(ProductDTO dto);
    //update a product
   Product UpdateProduct(Guid id, ProductDTO dto);
    //delete a product
       bool DeleteProduct(Guid id);



}