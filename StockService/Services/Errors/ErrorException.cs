public class StockConflictExeption : Exception
{
    public StockConflictExeption(string message) : base(message)
    {

    }
}

public class InvalidStockQuantityException : Exception
{
    public InvalidStockQuantityException(string message) : base(message) { }
}



public class IvalidStockIDException : Exception
{
    public IvalidStockIDException(string message) : base(message) {}
}