using CartService;
using CartService.DTOs;
using CartService.models;
using Microsoft.EntityFrameworkCore;
namespace CartService.Services;

public class CartServices: ICartService
{



    private readonly CartContext _context;
    private readonly IConfiguration configuration;


    public CartServices(CartContext context, IConfiguration configuration)
    {
        _context = context;
        this.configuration = configuration;
    }

    public async Task<Cart> CreateCartAsync(CartDTO cart)
    {
        var newCart = new Cart
        {
            UserId = cart.UserId,
        };
        _context.Carts.Add(newCart);
        await _context.SaveChangesAsync();
        return newCart;
    }

    public async Task<Cart> UpdateCart(Cart cart)
    {
        _context.Carts.Update(cart);
        await _context.SaveChangesAsync();
        return cart;
    }


    public async Task<Cart> GetCart(Guid id)
    {
        return await _context.Carts.FindAsync(id);
    }


       public async Task<List<Cart>> GetCartByUser(Guid id_user)
    {
        return await _context.Carts.Where(i => i.UserId == id_user).ToListAsync();
    }

    public async Task<List<Cart>> GetCarts()
    {
        return await _context.Carts.ToListAsync();
    }


}