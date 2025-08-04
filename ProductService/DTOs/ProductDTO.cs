namespace ProductService.DTOs;

public class ProductDTO
{

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public int Price { get; set; }
    public int stock { get; set; } 
    
    public string Image { get; set; } = string.Empty;
}