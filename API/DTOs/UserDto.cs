namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public double IncomeTotal { get; set; }
        public double ExpenseTotal { get; set; }
    }
}