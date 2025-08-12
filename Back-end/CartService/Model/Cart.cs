using System.ComponentModel.DataAnnotations;

namespace CartService.models;
public class Cart
{



[Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public Guid UserId { get; set; }
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Required]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public List<ItemCart> CartItems { get; set; } = new List<ItemCart>();



}