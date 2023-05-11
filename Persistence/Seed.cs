using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Altrit",
                        UserName = "altrit",
                        Email = "altrit@gmail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Sokol",
                        UserName = "sokol",
                        Email = "sokol@gmail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Flora",
                        UserName = "flora",
                        Email = "flora@gmail.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
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