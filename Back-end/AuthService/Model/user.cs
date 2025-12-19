using System.ComponentModel.DataAnnotations;

using UUIDNext;

namespace Autho.models;
public class User
{


    [Key]
    public Guid Id { get; set; }
    [EmailAddress]
    [Required]
    [MaxLength(255)]
    public string Email { get; set; } = null!;
    [Required]
    public string PasswordHash { get; set; } = null!;
    [Required]
    [MaxLength(20)]
    public string Role { get; set; } = "Customer";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public User(string email, string passwordHash, string role)
    {
        Id =  Uuid.NewDatabaseFriendly(Database.PostgreSql);
        Email = email;
        PasswordHash = passwordHash;
        Role = role;
    }

}
