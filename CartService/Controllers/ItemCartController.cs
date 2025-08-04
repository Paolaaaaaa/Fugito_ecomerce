using CartService.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/ItemCart")]
public class ItemCartController : ControllerBase
{


    private readonly IItemCartServices _service;

    public ItemCartController(IItemCartServices service)
    {
        _service = service;
    }





    [HttpPost("add")]
    public async Task<IActionResult> AddItemCart([FromBody] AddToCartRequest request)
    {
        var newItemCart = await _service.AddItemToCart(request);
        return Ok( newItemCart);
    }
    [HttpPut]
    public async Task<IActionResult> UpdateItemCart([FromBody] AddToCartRequest request)
    {
        var updatedItemCart = await _service.UpdateItemInCart(request);
        return Ok(updatedItemCart);
    }

    [HttpGet("{cartId}")]
    public async Task<IActionResult> GetItemsInCart(Guid cartId)
    {
        var items = await _service.GetItemsInCart(cartId);
        return Ok(items);
    }


[HttpDelete("{id_product}/cart/{id_cart}")]
public async Task<IActionResult> RemoveItemFromCart(Guid id_cart, Guid id_product)
{
    var response = await _service.RemoveItemFromCart(id_cart, id_product);
    return response  ? Ok(response) : BadRequest("Invalid product id or cart id");
}




}
