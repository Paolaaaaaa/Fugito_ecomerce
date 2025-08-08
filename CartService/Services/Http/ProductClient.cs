public class ProductClient
{
    private readonly HttpClient _httpClient;
    public ProductClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    //check if product exists
    public async Task<bool> ProductExists(int id)
    {
        var response = await _httpClient.GetAsync($"/api/v1/product/{id}");
        if (response.IsSuccessStatusCode)
        {
            return true;
        }
        return false;
    }
}