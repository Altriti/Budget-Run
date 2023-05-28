using Application.Transactions;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Transaction, Transaction>();
            CreateMap<Member, Member>();
            CreateMap<Transaction, TransactionDto>()
                    .ForMember(x => x.Users, o => o.MapFrom(y => y.Users));
            CreateMap<TransactionUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));
        }
    }
}