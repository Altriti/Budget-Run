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
            if (!userManager.Users.Any() && !context.Members.Any())
            {

                var members = new List<Member>
                {
                    new Member{
                        Name = "Dea",
                        Surname = "Gallapeni"
                    },
                    new Member{
                        Name = "Deon",
                        Surname = "Gallapeni"
                    },
                    new Member{
                        Name = "Stine",
                        Surname = "Gallapeni"
                    },
                    new Member{
                        Name = "Justin",
                        Surname = "Gashi"
                    },
                    new Member{
                        Name = "Ernes",
                        Surname = "Bytyqi"
                    },
                    new Member{
                        Name = "Erlea",
                        Surname = "Balaj"
                    }
                };



                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Altrit",
                        UserName = "altrit",
                        Email = "altrit@gmail.com",
                        Members = new List<Member>
                        {
                            members[0],
                            members[1],
                            members[2],
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Sokol",
                        UserName = "sokol",
                        Email = "sokol@gmail.com",
                        Members = new List<Member>
                        {
                            members[5]
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Flora",
                        UserName = "flora",
                        Email = "flora@gmail.com",
                        Members = new List<Member>
                        {
                            members[3],
                            members[4]
                        }
                    },
                };

                await context.Members.AddRangeAsync(members);


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