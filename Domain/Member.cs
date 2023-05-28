namespace Domain
{
    public class Member : AppUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Access { get; set; } = true;
        public string Password { get; set; }
        public string MemberUsername { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}