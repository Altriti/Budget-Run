using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Members
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Member Member { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Member).SetValidator(new MemberValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var member = await _context.Members.FindAsync(request.Member.Id);

                if (member == null) return null;

                _mapper.Map(request.Member, member);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Couldn't update member");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}