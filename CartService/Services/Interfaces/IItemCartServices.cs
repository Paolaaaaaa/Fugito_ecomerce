using CartService.DTOs;
using CartService.models;

public interface IItemCartServices
{
    Task<ItemCart> AddItemToCart(AddToCartRequest itemCart);
    Task<List<ItemCart>> GetItemsInCart(Guid cartId);
    Task<bool> RemoveItemFromCart(Guid cartId, Guid itemId);
    Task<ItemCart> UpdateItemInCart(AddToCartRequest itemCart);

}