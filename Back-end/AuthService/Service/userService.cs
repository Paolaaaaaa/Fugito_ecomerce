using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Autho.models;
using Autho.dtos;

namespace Autho.Services;
using Autho;

public class UserService : IUserService
{

    private readonly AuthDBcontext authDBcontext;
    private readonly IConfiguration _config;
    public UserService(AuthDBcontext context, IConfiguration configuration)
    {
        this.authDBcontext = context;
        this._config = configuration;
    }

    public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto)
    {
        if (authDBcontext.Users.Any(u => u.Email == dto.Email))
        {
            throw new Exception("User already exist");
        }
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        var user = new User
        {
            Email = dto.Email,
            PasswordHash = passwordHash,
            Role = dto.Role
        };
        authDBcontext.Users.Add(user);
        await authDBcontext.SaveChangesAsync();
        return GenerateToken(user);
    }

    public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
    {
        var user = await authDBcontext.Users.FirstOrDefaultAsync(u => u.Email == dto.Email)
        ?? throw new Exception("Invalid email or password");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            throw new Exception("Invalid email or password");
        }
        return GenerateToken(user);
    }


    private AuthResponseDTO GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(3),
            signingCredentials: creds
        );
        return new AuthResponseDTO
        {
            Email = user.Email,
            Role = user.Role,
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Id = user.Id

        };
    }


}
