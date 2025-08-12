using System.ComponentModel.DataAnnotations;
namespace StockService.model;
public class Stock{

    public Guid ProductId { get; set; }
    [Required]
    public int Quantity { get; set; }
    public string StorageLocation { get; set; }

}