using Microsoft.EntityFrameworkCore;
using CartService.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CartContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("CartConnection"));
});

builder.Services.AddScoped<ICartService, CartServices>();
builder.Services.AddScoped<IItemCartServices, ItemCartService>();

var app = builder.Build();

app.MapControllers();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();


app.Run();
