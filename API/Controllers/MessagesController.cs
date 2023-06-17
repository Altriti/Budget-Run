using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Persistence;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {

        private readonly MongoDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;

        public MessagesController(MongoDbContext dbContext, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }


        // [HttpGet]
        // public async Task<ActionResult<List<Message>>> GetMessages()
        // {
        //     var messages = await _dbContext.Messages.Find(_ => true).ToListAsync();
        //     return messages;
        // }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetUserMessages()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (user == null)
            {
                return BadRequest("User should not be null");
            }

            var sentMessages = await _dbContext.Messages
                .Find(m => m.SenderUserId == user.Id)
                .ToListAsync();

            var receivedMessages = await _dbContext.Messages
                .Find(m => m.RecieverUserId == user.Id)
                .ToListAsync();

            user.SentMessages = sentMessages;
            user.ReceivedMessages = receivedMessages;

            return Ok(new
            {
                SentMessages = sentMessages,
                ReceivedMessages = receivedMessages
            });
        }

        [HttpPost]
        public async Task<ActionResult<Message>> CreateMessage(Message message)
        {
            try
            {
                var sender = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

                if (sender == null)
                {
                    return BadRequest("Sender should not be null");
                }

                var reciever = _userManager.Users.FirstOrDefault(x => x.Email == message.RecieverUserEmail && x.LockoutEnabled != false);

                if (reciever == null)
                {
                    return BadRequest("Reciever should not be null");
                }

                message.Time = DateTime.Now;

                message.SenderUserId = sender.Id;

                message.Sender = sender;

                message.RecieverUserId = reciever.Id;

                message.Reciever = reciever;

                await _dbContext.Messages.InsertOneAsync(message);

                return CreatedAtAction(nameof(GetMessageById), new { id = message.Id }, message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the message: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessageById(string id)
        {
            var filter = Builders<Message>.Filter.Eq("_id", id);

            var message = await _dbContext.Messages.Find(filter).FirstOrDefaultAsync();

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveMessage(string id)
        {
            try
            {
                var message = await _dbContext.Messages.Find(m => m.Id == id).FirstOrDefaultAsync();

                if (message == null)
                {
                    return NotFound();
                }

                message.Approved = true;

                message.ApprovedTime = DateTime.Now;

                var approvedMessage = await _dbContext.Messages.ReplaceOneAsync(m => m.Id == message.Id, message);

                if (approvedMessage.ModifiedCount > 0)
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest("Failed to update message.");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"An error occurred while updating the message: {ex.Message}");
            }
        }
    }
}