using Domain;
using FluentValidation;

namespace Application.Transactions
{
    public class TransactionValidator : AbstractValidator<Transaction>
    {
        public TransactionValidator()
        {
            RuleFor(x => x.TransactionType).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}