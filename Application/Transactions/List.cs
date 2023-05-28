using Application.Core;
using Application.Interfaces;
using AutoMapper;
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<Transaction>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var transactions = await _context.Transactions
                    .Include(x => x.Users)
                    .Where(z => z.Users.Any(u => u.AppUserId == _userAccessor.GetUserId()))
                    .ToListAsync(cancellationToken);

                return Result<List<Transaction>>.Success(transactions);
            }
        }
    }
}