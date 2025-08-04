using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CartService.models;

public class ItemCart
{


    [Key]
    public Guid Id { get; set; }= Guid.NewGuid();

    [Required]
    public Guid CartId { get; set; }
[Required]
    public Guid ProductId { get; set; } // está en mongo db
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
    public int Quantity { get; set; } = 1;
    [ForeignKey("CartId")]
    public  Cart Cart { get; set; }




    

}