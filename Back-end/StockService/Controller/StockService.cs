using Microsoft.AspNetCore.Mvc;
using StockService.DTOS;

namespace StockService.Controllers;

[ApiController]
[Route("api/v1/[Controller]")]
public class StockService : ControllerBase
{
    private IStockService stockService;

    public StockService(IStockService stockService)
    {
        this.stockService = stockService;
    }

    [HttpGet]
    public async Task<IActionResult> GetStocks()
    {
        var stocks = await stockService.GetAllStocksAsync();
        return Ok(stocks);
    }

    [HttpPost]
    public async Task<IActionResult> AddStock([FromBody] UpdateStockRequest stock)
    {
        try
        {
            var stockCreated = await stockService.AddStockAsync(stock);
            return Ok(stockCreated);


        }
        catch (InvalidStockQuantityException e)
        {
            return BadRequest(e.Message);
        }
        catch (StockConflictExeption e)
        {
            return Conflict(e.Message);
        }
    }

    [HttpGet("product/{id}")]
    public async Task<IActionResult> GetStockById(Guid id)
    {
        var stock = await stockService.GetStockByProductAsync(id);
        return Ok(stock);
    }


    [HttpGet("product/{idProduct}/location/{location}")]
    public async Task<IActionResult> GetStockByIdprodLocation(Guid idProduct, string location)
    {
        var stock = await stockService.GetStockByLocationAsync(idProduct, location);
        return Ok(stock);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateStock([FromBody] UpdateStockRequest stock)
    {
        try
        {
            var stockUpdated = await stockService.UpdateStockAsync(stock);
            return Ok(stockUpdated);

        }
        catch (InvalidStockQuantityException e)
        {
            return BadRequest(e.Message);
        }
        catch (IvalidStockIDException e)
        {
            return NotFound(e.Message);
        }
    }



}