using Application.Members;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetMembers()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMember(Member member)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Member = member }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMember(Guid id, Member member)
        {
            member.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Member = member }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}