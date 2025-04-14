using Microsoft.AspNetCore.Http;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace WebApi_courtbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IMongoService<Usuario> _mongoService;

        public UsuariosController(IMongoService<Usuario> mongoService)
        {
            _mongoService = mongoService;
        }

        [HttpGet]
        public async Task<List<Usuario>> Get() =>
            await _mongoService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Usuario>> Get(string id)
        {
            var usuario = await _mongoService.GetAsync(id);
            if(usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Usuario newUsuario)
        {
            await _mongoService.CreateAsync(newUsuario);
            return CreatedAtAction(nameof(Get), new {id = newUsuario.Id}, newUsuario);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Usuario updateUsuario)
        {
            var usuario = await _mongoService.GetAsync(id);
            if(usuario is null || updateUsuario.Id != usuario.Id) return NotFound();
            
            await _mongoService.UpdateAsync(id, updateUsuario);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var usuario = await _mongoService.GetAsync(id);
            if (usuario is null) return NotFound();

            await _mongoService.RemoveAsync(id);
            return NoContent();
        }
    }
}
