using Microsoft.AspNetCore.Http;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace WebApi_courtbook.Controllers
{
    [Authorize(Roles = "Administrador")]
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
        public async Task<ActionResult> Get(string id)
        {
            var usuario = await _mongoService.GetAsync(id);
            if(usuario == null) return NotFound();
            return Ok(usuario);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UsuarioDto>> Create(UsuarioDto newUsuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(VerificarExistenciaNomeUsuario(newUsuario.NomeUsuario))
                return BadRequest(new {erro = "Nome de Usuário já existe"});

            Usuario novo = new Usuario()
            {
                Id = newUsuario.Id,
                NomeCompleto = newUsuario.NomeCompleto,
                NomeUsuario = newUsuario.NomeUsuario,
                Email = newUsuario.Email,
                Senha = BCrypt.Net.BCrypt.HashPassword(newUsuario.Senha),
                Perfil = newUsuario.Perfil
            };

            await _mongoService.CreateAsync(novo);
            return CreatedAtAction(nameof(Get), new {id = novo.Id}, novo);
        }

        [Authorize(Roles = "Administrador, Locador, Locatario, LocadorLocatario")]
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, UsuarioDto updateUsuario)
        {
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (id != updateUsuario.Id)
                return BadRequest();

            var usuario = await _mongoService.GetAsync(id);
            if(usuario is null) return NotFound();
            
            usuario.NomeCompleto = updateUsuario?.NomeCompleto;
            usuario.NomeUsuario = updateUsuario?.NomeUsuario;
            usuario.Email = updateUsuario?.Email;
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(updateUsuario.Senha);
            usuario.Perfil = updateUsuario.Perfil;

            try
            {
                await _mongoService.UpdateAsync(id, usuario);
                return CreatedAtAction(nameof(Get), new {id = usuario.Id}, usuario);
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var usuario = await _mongoService.GetAsync(id);
            if (usuario is null) return NotFound();

            await _mongoService.RemoveAsync(id);
            return NoContent();
        }

        private bool VerificarExistenciaNomeUsuario(string nomeUsuario)
        {
            var usuarioDb = _mongoService.GetAsyncIdByCampo(nomeUsuario, nameof(Usuario.NomeUsuario));

            if (usuarioDb.Result is null) return false;
            return true;
        }

    }
}
