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
    [Authorize]
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

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authentication(AuthenticateDto model)
        {
            var usuarioDb = await _mongoService.GetAsync(model.Id);
            if (usuarioDb is null || !BCrypt.Net.BCrypt.Verify(model.Password, usuarioDb.Senha))
            
            return Unauthorized();
            var jwt = GenerateJwtToken(usuarioDb);
            return Ok(new { jwtToken = jwt });
        }
        private string GenerateJwtToken(Usuario model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("BjRxlIiDQHvTrRQM3Ke4CeS9uE3RZODH");
            var claims = new ClaimsIdentity(new Claim[]
            {
             new Claim(ClaimTypes. NameIdentifier, model.Id.ToString()),
             new Claim(ClaimTypes. Role, model.Perfil.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
