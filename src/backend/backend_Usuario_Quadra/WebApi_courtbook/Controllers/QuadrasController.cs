using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;

namespace WebApi_courtbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuadrasController : ControllerBase
    {
        private readonly MongoService<Quadra> _mongoService;

        public QuadrasController(IOptions<CourtBookDataBaseSettings> settings)
        {
            _mongoService = new MongoService<Quadra>(settings, settings.Value.QuadraCollectionName);
        }

        [HttpGet]
        public async Task<List<Quadra>> Get() =>
            await _mongoService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Quadra>> Get(string id)
        {
            var quadra = await _mongoService.GetAsync(id);
            if (quadra == null) return NotFound();
            return Ok(quadra);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Quadra newQuadra)
        {
            await _mongoService.CreateAsync(newQuadra);
            return CreatedAtAction(nameof(Get), new { id = newQuadra.Id }, newQuadra);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Quadra updateQuadra)
        {
            var quadra = await _mongoService.GetAsync(id);
            if (quadra is null || updateQuadra.Id != quadra.Id) return NotFound();

            await _mongoService.UpdateAsync(id, updateQuadra);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var quadra = await _mongoService.GetAsync(id);
            if (quadra is null) return NotFound();

            await _mongoService.RemoveAsync(id);
            return NoContent();
        }
    }
}
