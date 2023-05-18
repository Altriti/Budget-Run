using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Members
{
    public class List
    {
        public class Query : IRequest<Result<List<Member>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Member>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Member>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Member>>.Success(await _context.Members.ToListAsync());
            }
        }
    }
}