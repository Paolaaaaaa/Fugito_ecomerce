using StockService.DTOS;
using StockService.model;
public interface IStockService
{


    Task<Stock> AddStockAsync(UpdateStockRequest request);
          Task<List<Stock>> GetAllStocksAsync();

        Task<List<Stock>> GetStockByLocationAsync(Guid productId, string storageLocation);

    Task<List<Stock>> GetStockByProductAsync(Guid productId);
        Task<Stock> UpdateStockAsync(UpdateStockRequest request);
}