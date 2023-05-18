using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class List
    {
        public class Query : IRequest<Result<List<Transaction>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Transaction>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<Transaction>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Transaction>>
                .Success(await _context.Transactions
                .Include(x => x.AppUser)
                .ThenInclude(y => y.Members)
                .Where(x => x.AppUserId == _userAccessor.GetUserId())
                .ToListAsync());
            }
        }
    }
}