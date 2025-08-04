using Microsoft.EntityFrameworkCore;
using Autho.models;
namespace Autho;

    public class AuthDBcontext : DbContext
    {

        public AuthDBcontext(DbContextOptions<AuthDBcontext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();

    }
