using confluent.Kafka;
using System.Text.Json;

namespace Messaging
{
    
public class KafkaProductCreateEventProducer : IProductEventProducer
{
    private readonly IProducer<string,string> _kafkaProducer;
    private const string Topic = "ecomerce.prod.stock.productNotCreated";

    public KafkaProductCreateEventProducer(IConfiguration configuration)
    {
        var config = new ProducerConfig
        {
            BootstrapServers = configuration["Kafka:BootstrapServers"],
            security.protocol = SecurityProtocol.Sasl_Plaintext,
            sasl.mechanism = SaslMechanism.Plain,
            sasl.username = configuration["Kafka:Username"],
            sasl.password = configuration["Kafka:Password"],
            ClientId = configuration["Kafka:ClientId"],
            Acks = Acks.All
        };

        _kafkaProducer = new ProducerBuilder<string, string>(config).Build();
    }

    public async Task PublishProductCreatedAsync(ProductCreateEvent productEvent)
    {


        var message = new Message<string, string>
        {
            Key = productEvent.ProductId.ToString(),
            Value = JsonSerializer.Serialize(productEvent)
        };
        await _kafkaProducer.SendMessageAsync(Topic, message);
    }}




}
