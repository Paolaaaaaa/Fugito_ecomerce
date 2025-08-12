using CartService.models;
using Microsoft.EntityFrameworkCore;


public class CartContext : DbContext
{
    public CartContext(DbContextOptions<CartContext> options) : base(options) { }

    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<ItemCart> ItemCart => Set<ItemCart>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ItemCart>()
            .HasOne(c => c.Cart)
            .WithMany()
            .HasForeignKey(i => i.CartId)
            .IsRequired();


            base.OnModelCreating(modelBuilder);





    }
}
    
