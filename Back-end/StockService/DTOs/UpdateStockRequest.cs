namespace StockService.DTOS;
public class UpdateStockRequest
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public string StorageLocation { get; set; }
}