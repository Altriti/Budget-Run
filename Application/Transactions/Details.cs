using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class Details
    {
        public class Query : IRequest<Result<Transaction>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Transaction>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Transaction>> Handle(Query request, CancellationToken cancellationToken)
            {
                var transaction = await _context.Transactions
                    .Include(x => x.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<Transaction>.Success(transaction);
            }
        }
    }
}