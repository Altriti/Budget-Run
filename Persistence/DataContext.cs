using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<TransactionUser> TransactionUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TransactionUser>(x => x.HasKey(aa => new { aa.AppUserId, aa.TransactionId }));

            builder.Entity<TransactionUser>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Transactions)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<TransactionUser>()
                .HasOne(u => u.Transaction)
                .WithMany(a => a.Users)
                .HasForeignKey(aa => aa.TransactionId);

        }
    }
}