using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Members
{
    public class List
    {
        public class Query : IRequest<Result<List<MemberDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<MemberDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<MemberDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //The logic used here is big brain. 100% from my brain, so proud.
                var user = await _context.Users.Include(x => x.Members).FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());

                var userMembersList = user.Members.ToList();

                var membersList = await _context.Members.ToListAsync();

                var membersToReturn = new List<Member>();

                foreach (var member in membersList)
                {
                    foreach (var userMember in userMembersList)
                    {
                        if (userMember.Id == member.Id)
                        {
                            membersToReturn.Add(member);
                        };
                    };
                };

                var returningMembers = _mapper.Map<List<MemberDto>>(membersToReturn);

                return Result<List<MemberDto>>.Success(returningMembers);
            }
        }
    }
}