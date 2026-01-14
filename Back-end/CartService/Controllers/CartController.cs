


using CartService.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/cart")]
public class CartController : ControllerBase
{


    private readonly ICartService _cartService;
    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }


    [HttpPost]
    public async Task<IActionResult> CreateCart([FromBody] CartDTO cartDTO)
    {
        var response = await _cartService.CreateCartAsync(cartDTO);
        return Ok(response);
    }

    [HttpGet("{id_cart}")]
    public async Task<IActionResult> GetCartById(Guid id_cart)
    {
        var response = await _cartService.GetCart(id_cart);
        return Ok(response);
    }

    [HttpGet("user/{id_user}")]
    public async Task<IActionResult> GetCartByUserId(Guid id_user)
    {
        var response = await _cartService.GetCartByUser(id_user);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetCarts()
    {
        var response = await _cartService.GetCarts();
        return Ok(response);
    }
 






}