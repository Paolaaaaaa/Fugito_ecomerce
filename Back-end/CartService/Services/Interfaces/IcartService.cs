using CartService.DTOs;
using CartService.models;

public interface ICartService
{
    Task<Cart> CreateCartAsync(CartDTO cart);
    Task<Cart> UpdateCart(Cart cart);
    Task<Cart> GetCart(Guid id);
    Task<List<Cart>> GetCarts();
      Task<List<Cart>> GetCartByUser(Guid id_user);
}