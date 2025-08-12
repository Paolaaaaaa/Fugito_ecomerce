


using CartService.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/[controller]")]
public class CartController : ControllerBase
{


    private readonly ICartService _cartService;
    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }


    [HttpPost]
    public async Task<IActionResult> createCart([FromBody] CartDTO cartDTO)
    {
        var response = await _cartService.CreateCartAsync(cartDTO);
        return Ok(response);
    }

    [HttpGet("{id_cart}")]
    public async Task<IActionResult> getCartById(Guid id_cart)
    {
        var response = await _cartService.GetCart(id_cart);
        return Ok(response);
    }

    [HttpGet("user/{id_user}")]
    public async Task<IActionResult> getCartByUserId(Guid id_user)
    {
        var response = await _cartService.GetCartByUser(id_user);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> getCarts()
    {
        var response = await _cartService.GetCarts();
        return Ok(response);
    }
 






}