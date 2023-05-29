using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Transactions;
using Domain;

namespace Application.Members
{
    public class MemberDetailsDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Access { get; set; }
        public string Password { get; set; }
        public string MemberUsername { get; set; }
        public ICollection<TransactionDto> Transactions { get; set; }
    }
}