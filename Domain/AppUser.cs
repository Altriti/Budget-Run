using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Member> Members { get; set; }
        public ICollection<TransactionUser> Transactions { get; set; }
        public double IncomeTotal { get; set; }
        public double ExpenseTotal { get; set; }
    }
}