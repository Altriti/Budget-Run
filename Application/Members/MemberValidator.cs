using Domain;
using FluentValidation;

namespace Application.Members
{
    public class MemberValidator : AbstractValidator<Member>
    {
        public MemberValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Surname).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.MemberUsername).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}