using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductService.DTOs;
[ApiController]
[Route("api/v1/product")]
public class ProductController :  ControllerBase
{
    
    private readonly IProductService _productService;


    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productService.GetAllProducts();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var product = await _productService.GetProductById(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> CreateProduct(ProductDTO dto)
    {
        var product = await _productService.CreateProductAsyc(dto);
        // Enviar un evento a kafka
        //var message = System.Text.Json.JsonSerializer.Serialize(product);
        //await producer.SendMessageAsync("product_created", message);

        
        return Ok(product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(Guid id, ProductDTO dto)
    {
        try
        {
            var updatedProduct = _productService.UpdateProduct(id, dto);
            return Ok(updatedProduct);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(Guid id)
    {
        var result = _productService.DeleteProduct(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}