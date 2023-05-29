using Application.Profiles;

namespace Application.Transactions
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public string TransactionType { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
        public ICollection<Profile> Users { get; set; }
    }
}