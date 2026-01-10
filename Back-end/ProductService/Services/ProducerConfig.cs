// using Confluent.Kafka;
// using Microsoft.VisualBasic;
// using System.Net;

// public class ProducerConfig
// {
//     private readonly string Iproducer;



//     // public KafkaProducer(IConfiguration configuration)
//     // {
//     //    // _bootstrapServers = configuration["Kafka:BootstrapServers"];
//     // }


//     public async Task SendMessageAsync(string topic, string message)
//     {
//         var config = new ProducerConfig
//         {
//             BootstrapServers = _bootstrapServers
//         };

//         using var producer = new ProducerBuilder<Null, string>(config).Build();
//         await producer.ProduceAsync(topic, new Message<Null, string> { Value = message });

//         Console.WriteLine($" Mensaje enviado a Kafka en topic '{topic}': {message}");
//     }
// }
