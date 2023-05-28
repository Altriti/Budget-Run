using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Members
{
    public class Create
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
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x => x.Members).FirstOrDefaultAsync(x => x.Id == _userAccessor.GetUserId());

                if (user == null) return Result<Unit>.Failure("You should be logged in to add a member. If you are logged in try again");

                _context.Members.Add(request.Member);

                user.Members.Add(request.Member);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Couldn't add member");

                var userMember = new AppUser
                {
                    DisplayName = request.Member.DisplayName,
                    Email = request.Member.Email,
                    UserName = request.Member.MemberUsername,
                };

                var userMemberResult = await _userManager.CreateAsync(userMember, request.Member.Password);

                if (!userMemberResult.Succeeded)
                {
                    return Result<Unit>.Failure("Couldn't add member as user");
                };

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}