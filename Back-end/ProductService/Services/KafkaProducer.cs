using Confluent.Kafka;

public class KafkaProducer
{
    private readonly string _bootstrapServers;

    public KafkaProducer(IConfiguration configuration)
    {
        _bootstrapServers = configuration["Kafka:BootstrapServers"];
    }


    public async Task SendMessageAsync(string topic, string message)
    {
        var config = new ProducerConfig
        {
            BootstrapServers = _bootstrapServers
        };

        using var producer = new ProducerBuilder<Null, string>(config).Build();
        await producer.ProduceAsync(topic, new Message<Null, string> { Value = message });

        Console.WriteLine($" Mensaje enviado a Kafka en topic '{topic}': {message}");
    }
}
