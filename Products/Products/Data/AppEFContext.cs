using Microsoft.EntityFrameworkCore;
using Products.Data.Entities;

namespace Products.Data
{
    public class AppEFContext:DbContext
    {
        public AppEFContext(DbContextOptions<AppEFContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Product> Productss { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ConfigurationDatabase());
        }
    }
}
