using Microsoft.EntityFrameworkCore;
using StockService.DTOS;
using StockService.model;

namespace StockService.services;

public class StockServices : IStockService



{

    private readonly StockContext _stockRepository;
    private readonly IConfiguration configuration;
    public StockServices(StockContext stockRepository, IConfiguration configuration)
    {
        _stockRepository = stockRepository;
        this.configuration = configuration;
    }



    public async Task<Stock> AddStockAsync(UpdateStockRequest request)
    {

        var current_stock = await _stockRepository.Stocks
                            .Where(i => i
                            .ProductId == request.ProductId &&
                            i.StorageLocation == request.StorageLocation).FirstOrDefaultAsync();

    if(current_stock!=null)
    {
            throw new StockConflictExeption("Stock already exists");
    }
    if(request.Quantity<=0)
        {
            throw new InvalidStockQuantityException("Quantity must be negative");
        }

        var stock = new Stock
        {
            ProductId = request.ProductId,
            StorageLocation = request.StorageLocation,
            Quantity = request.Quantity
        };

        _stockRepository.Stocks.Add(stock);
        await _stockRepository.SaveChangesAsync();
        return stock;
    }

    public async Task<List<Stock>> GetAllStocksAsync()
    {
        return await _stockRepository.Stocks.ToListAsync();
    }

    public async Task<List<Stock>> GetStockByLocationAsync(Guid productId, string storageLocation)
    {
        return await _stockRepository.Stocks.Where(i => i.StorageLocation == storageLocation && i.ProductId == productId).ToListAsync();
    }

    public async Task<List<Stock>> GetStockByProductAsync(Guid productId)
    {
        return await _stockRepository.Stocks.Where(i => i.ProductId == productId).ToListAsync();
    }

    public async Task<Stock> UpdateStockAsync(UpdateStockRequest request)
    {

        var current_stock = await _stockRepository.Stocks
                            .Where(i => i
                            .ProductId == request.ProductId &&
                            i.StorageLocation == request.StorageLocation).FirstOrDefaultAsync();

        if (current_stock == null)
        {
            throw new IvalidStockIDException("Stock not found");
        }
        if(current_stock.Quantity + request.Quantity<0)
        {
            throw new InvalidStockQuantityException("There is not enough Stock");
        }


        current_stock.Quantity+= request.Quantity;
        await _stockRepository.SaveChangesAsync();
        return current_stock;
    }
}