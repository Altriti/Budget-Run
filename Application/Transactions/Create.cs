using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Transaction Transaction { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Transaction).SetValidator(new TransactionValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(x => x.Members)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return Result<Unit>.Failure("You should be logged in to add a transaction");
                }

                if (request.Transaction.TransactionType == TransactionType.Expense)
                {
                    user.ExpenseTotal += request.Transaction.Amount;
                }
                else
                {
                    user.IncomeTotal += request.Transaction.Amount;
                }

                request.Transaction.Creator = user.DisplayName;

                var transactionUser = new TransactionUser
                {
                    AppUser = user,
                    Transaction = request.Transaction
                };

                var member = await _context.Members
                    .FirstOrDefaultAsync(x => x.Email == user.Email);

                if (member != null)
                {
                    var parentUser = await _context.Users
                        .FirstOrDefaultAsync(x => x.Id == member.AppUserId);

                    var parentTransactionUser = new TransactionUser
                    {
                        AppUser = parentUser,
                        Transaction = request.Transaction
                    };

                    request.Transaction.Users.Add(parentTransactionUser);
                }

                request.Transaction.Users.Add(transactionUser);

                _context.Transactions.Add(request.Transaction);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Couldn't create transaction");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}