public record ProductCreateEvent(
     Guid ProductId,
     int Quantity,
     DateTime CreatedAt
);