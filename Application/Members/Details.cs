using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Members
{
    public class Details
    {
        public class Query : IRequest<Result<Member>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Member>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Member>> Handle(Query request, CancellationToken cancellationToken)
            {
                var member = await _context.Members.FindAsync(request.Id);

                return Result<Member>.Success(member);
            }
        }
    }
}