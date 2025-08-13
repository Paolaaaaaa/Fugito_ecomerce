using Confluent.Kafka;
using StockService.DTOS;

public class KafkaConsumerService : BackgroundService
{
    private readonly string _bootstrapServers;
    private readonly IStockService stockService;

    public KafkaConsumerService(IConfiguration configuration)
    {
        _bootstrapServers = configuration["Kafka:BootstrapServers"];
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var config = new ConsumerConfig
        {
            BootstrapServers = _bootstrapServers,
            GroupId = "stock-service-group",
            AutoOffsetReset = AutoOffsetReset.Earliest
        };



        using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        consumer.Subscribe("Product");

        while (!stoppingToken.IsCancellationRequested)
        {
            var consumeResult = consumer.Consume(stoppingToken);
            UpdateStockRequest updateStockRequest = new UpdateStockRequest
            {
                ProductId = Guid.Parse(consumeResult.Message.Value),
                Quantity = 1
            };

            try
            {
                await stockService.AddStockAsync(updateStockRequest);
                Console.WriteLine($"Received message: {consumeResult.Message.Value}");

            }
            catch (ConsumeException ex)
            {
                Console.WriteLine($"Error consuming message: {ex.Error.Reason}");

            }

            

        }
    }



   
}