using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Members
{
    public class MemberDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Access { get; set; } = true;
        public string Password { get; set; }
        public string MemberUsername { get; set; }
    }
}