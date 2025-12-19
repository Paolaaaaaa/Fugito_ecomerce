using Microsoft.EntityFrameworkCore;
using Autho.models;
using System.Reflection.Emit;
using System.Buffers.Text;
namespace Autho;

    public class AuthDBcontext : DbContext
    {

        public AuthDBcontext(DbContextOptions<AuthDBcontext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("auth");

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                .IsUnique()
                .HasDatabaseName("Index_Unique_Email");

                entity.Property(u => u.Id).ValueGeneratedNever();
            });

            base.OnModelCreating(modelBuilder);
        }

    }
