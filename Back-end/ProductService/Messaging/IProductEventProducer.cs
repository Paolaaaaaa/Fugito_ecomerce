public interface IProductEventProducer
{
    Task ProduceStockCheckEventAsync(ProductCreateEvent productEvent);
}