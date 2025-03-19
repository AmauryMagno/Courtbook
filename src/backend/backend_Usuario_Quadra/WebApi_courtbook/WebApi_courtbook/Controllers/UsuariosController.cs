using Microsoft.AspNetCore.Http;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApi_courtbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly CourtBookService _courtBookService;

        public UsuariosController(CourtBookService courtBookService)
        {
            _courtBookService = courtBookService;
        }

        [HttpGet]
        public async Task<List<Usuario>> Get() =>
            await _courtBookService.GetUsuariosAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Usuario>> Get(string id)
        {
            var usuario = await _courtBookService.GetUsuariosAsync(id);
            if(usuario == null) return NotFound();
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Usuario newUsuario)
        {
            await _courtBookService.CreateAsync(newUsuario);
            return CreatedAtAction(nameof(Get), new {id = newUsuario.Id}, newUsuario);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Usuario updateUsuario)
        {
            var usuario = await _courtBookService.GetUsuariosAsync(id);
            if(usuario is null || updateUsuario.Id != usuario.Id) return NotFound();
            
            await _courtBookService.UpdateAsync(id, updateUsuario);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var usuario = await _courtBookService.GetUsuariosAsync(id);
            if (usuario is null) return NotFound();

            await _courtBookService.RemoveAsync(id);
            return NoContent();
        }
    }
}
