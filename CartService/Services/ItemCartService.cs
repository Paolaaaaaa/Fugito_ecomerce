

using CartService;
using CartService.DTOs;
using CartService.models;
using Microsoft.EntityFrameworkCore;
namespace CartService.Services;

public class ItemCartService : IItemCartServices
{

    private readonly CartContext _context;
    private readonly IConfiguration configuration;

    public ItemCartService(CartContext context, IConfiguration configuration)
    {
        _context = context;
        this.configuration = configuration;
    }

    public async Task<ItemCart> AddItemToCart(AddToCartRequest itemCart)
    {
        var newItem = new ItemCart
        {
            CartId = itemCart.CartId,
            ProductId = itemCart.ProductId,
            Quantity = itemCart.Quantity

        };
        _context.ItemCart.Add(newItem);

        await _context.SaveChangesAsync();
        return newItem;
    }

    public async Task<List<ItemCart>> GetItemsInCart(Guid cartId)
    {

        return await _context.ItemCart.Where(i => i.CartId == cartId).ToListAsync();

    }

    public async Task<bool> RemoveItemFromCart(Guid cartId, Guid itemId)
    {
        var item = await _context.ItemCart.FirstOrDefaultAsync(i => i.CartId == cartId && i.ProductId == itemId);
        if (item == null)
        {
            return await Task.FromResult(false);
        }
        _context.ItemCart.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<ItemCart> UpdateItemInCart(AddToCartRequest itemCart)
    {

        var existingItem = await _context.ItemCart.FirstOrDefaultAsync(i => i.CartId == itemCart.CartId && i.ProductId == itemCart.ProductId);
        if (existingItem == null)
        {
            throw new InvalidOperationException("Item not found in cart.");
        }
        existingItem.Quantity = itemCart.Quantity;
        await _context.SaveChangesAsync();
        return existingItem;
    }
    
}