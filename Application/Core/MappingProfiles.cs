using Application.Members;
using Application.Transactions;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Transaction, Transaction>()
                .ForMember(d => d.Creator, o => o.Ignore())
                .ForMember(d => d.Users, o => o.Ignore());

            CreateMap<Member, Member>()
                .ForMember(d => d.AppUserId, o => o.Ignore())
                .ForMember(d => d.AppUser, o => o.Ignore())
                .ForMember(d => d.Transactions, o => o.Ignore());

            CreateMap<Transaction, TransactionDto>()
                    .ForMember(x => x.Users, o => o.MapFrom(y => y.Users));

            CreateMap<TransactionUser, Profiles.Profile>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.AppUser.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.ExpenseTotal, o => o.MapFrom(s => s.AppUser.ExpenseTotal))
                .ForMember(d => d.IncomeTotal, o => o.MapFrom(s => s.AppUser.IncomeTotal));

            CreateMap<Member, MemberDto>();

            CreateMap<TransactionUser, TransactionDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Transaction.Id))
                .ForMember(d => d.TransactionType, o => o.MapFrom(s => s.Transaction.TransactionType))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Transaction.Date))
                .ForMember(d => d.Amount, o => o.MapFrom(s => s.Transaction.Amount))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Transaction.Category))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Transaction.Description))
                .ForMember(d => d.Creator, o => o.MapFrom(s => s.Transaction.Creator))
                .ForMember(d => d.Users, o => o.MapFrom(s => s.Transaction.Users));


            CreateMap<Member, MemberDetailsDto>()
                .ForMember(d => d.Transactions, o => o.MapFrom(s => s.AppUser.Transactions));
        }
    }
}