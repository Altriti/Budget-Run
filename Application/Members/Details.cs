using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Members
{
    public class Details
    {
        public class Query : IRequest<Result<MemberDetailsDto>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MemberDetailsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<MemberDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var member = await _context.Members.FindAsync(request.Id);

                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == member.Email && x.LockoutEnabled != false);

                var memberTransactions = await _context.Members
                    .Include(m => m.AppUser)
                    .ThenInclude(u => u.Transactions)
                    .ThenInclude(tu => tu.Transaction)
                    .ThenInclude(t => t.Users)
                    .FirstOrDefaultAsync(m => m.Id == request.Id);

                var returningMember = _mapper.Map<MemberDetailsDto>(memberTransactions);

                returningMember.Transactions = returningMember.Transactions
                    .Where(t => t.Users.Any(u => u.Id == user.Id))
                    .ToList();

                return Result<MemberDetailsDto>.Success(returningMember);
            }
        }
    }
}