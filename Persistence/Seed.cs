using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Transactions.Any()) return;
            
            var activities = new List<Transaction>
            {
                new Transaction
                {
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Amount = 9.50,
                    Category = "Travel",
                    Description = "Travel by bus to Prishtina"
                },
                new Transaction
                {
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Amount = 6.99,
                    Category = "Telephone",
                    Description = "Monthly phone internet"
                },
                new Transaction
                {
                    Date = DateTime.UtcNow.AddMonths(1),
                    Amount = 5,
                    Category = "Haircut",
                    Description = "Haircut"
                }
            };

            await context.Transactions.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}