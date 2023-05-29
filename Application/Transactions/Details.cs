using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class Details
    {
        public class Query : IRequest<Result<TransactionDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TransactionDto>>
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

            public async Task<Result<TransactionDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var transaction = await _context.Transactions
                    .Include(x => x.Users)
                    .ThenInclude(x => x.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                var returningTransaction = _mapper.Map<TransactionDto>(transaction);

                return Result<TransactionDto>.Success(returningTransaction);
            }
        }
    }
}