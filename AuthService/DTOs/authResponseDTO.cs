
namespace Autho.dtos;


    public class AuthResponseDTO
    {
        public string Email { get; set; } = null!;
        public string Token { get; set; } = null!;
        public string Role { get; set; } = null!;
        public Guid Id { get; set; }
    }
