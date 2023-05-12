using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Transactions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TransactionsController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransaction(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction(Transaction transaction)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Transaction = transaction }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTransaction(Guid id, Transaction transaction)
        {
            transaction.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Transaction = transaction }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}