namespace Domain
{
    public enum TransactionType
    {
        Expense = 1,
        Income = 2
    }//values added to avoid FluentValidation of enum of 0 
    public class Transaction
    {
        public Guid Id { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
        public ICollection<TransactionUser> Users { get; set; } = new List<TransactionUser>();
    }
}