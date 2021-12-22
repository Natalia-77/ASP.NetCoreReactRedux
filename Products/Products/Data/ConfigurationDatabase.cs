using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Products.Data.Entities;

namespace Products.Data
{
    public class ConfigurationDatabase : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("tblProductss");
            builder.HasKey(k => k.Id);
            builder.Property(name => name.Name).HasMaxLength(255).IsRequired();
            builder.Property(desc => desc.Description).HasMaxLength(255).IsRequired();
        }
    }
}
