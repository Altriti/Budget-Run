namespace Domain
{
    public class TransactionUser
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid TransactionId { get; set; }
        public Transaction Transaction { get; set; }
    }
}