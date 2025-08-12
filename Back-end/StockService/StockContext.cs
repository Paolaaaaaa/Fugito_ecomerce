using Microsoft.EntityFrameworkCore;
using StockService.model;

public class StockContext : DbContext
{

    public StockContext(DbContextOptions<StockContext> options) : base(options)
    {

    }

    public DbSet<Stock> Stocks => Set<Stock>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Stock>().ToTable("Stock");

        modelBuilder.Entity<Stock>().HasKey(p => new {p.ProductId , p.StorageLocation});
        base.OnModelCreating(modelBuilder);
    }
    
}