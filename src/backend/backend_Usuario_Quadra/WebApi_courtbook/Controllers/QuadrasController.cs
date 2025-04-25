using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;

namespace WebApi_courtbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuadrasController : ControllerBase
    {
        private readonly IMongoService<Quadra> _mongoService;
        private readonly IMongoService<Usuario> _mongoUsarioService;

        public QuadrasController(IMongoService<Quadra> mongoService, IMongoService<Usuario> mongoUsarioService)
        {
            _mongoService = mongoService;
            _mongoUsarioService = mongoUsarioService;
        }
        [Authorize(Roles = "Administrador, LocadorLocatario, Locador, Locatario")]
        [HttpGet]
        public async Task<List<Quadra>> Get() =>
            await _mongoService.GetAsync();

        [Authorize(Roles = "Locatario")]
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Quadra>> Get(string id)
        {
            var quadra = await _mongoService.GetAsync(id);
            if (quadra == null) return NotFound();
            return Ok(quadra);
        }

        [Authorize(Roles = "Administrador, LocadorLocatario, Locador")]
        [HttpPost]
        public async Task<IActionResult> Create(Quadra newQuadra)
        {
            if (newQuadra == null)
                return BadRequest();

            var NameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (newQuadra.UsuarioId != NameIdentifier)
            {
                return BadRequest();
            }

            //Verifica se o Usuario.Id da rota existe no banco 
            Usuario userId = await _mongoUsarioService.GetAsync(newQuadra.UsuarioId);
            if (string.IsNullOrEmpty(userId.ToString()))
                return Unauthorized();
            newQuadra.UsuarioId = userId.Id;

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

            var userId = ClaimTypes.NameIdentifier;
            var userPerfil = ClaimTypes.Role;
            if (userPerfil != "Administrador")
            {
                if (quadra.UsuarioId == userId)
                    await _mongoService.RemoveAsync(id);
                return NoContent();
            }

            await _mongoService.RemoveAsync(id);
            return NoContent();
        }
    }
}
