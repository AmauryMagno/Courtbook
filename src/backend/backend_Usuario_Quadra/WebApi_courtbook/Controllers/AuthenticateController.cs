using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;

namespace WebApi_courtbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticateController : ControllerBase
    {
        private readonly IMongoService<Usuario> _mongoService;
        public AuthenticateController(IMongoService<Usuario> mongoService)
        {
            _mongoService = mongoService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Authentication(AuthenticateDto model)
        {
            if (model is null || (string.IsNullOrWhiteSpace(model.Id) && string.IsNullOrWhiteSpace(model.NomeUsuario)))
                return Unauthorized();

            Usuario usuarioDb = null;

            string Id = model?.Id;
            string NomeUsuario = model.NomeUsuario;

            if (!string.IsNullOrWhiteSpace(model.Id))
            {
                usuarioDb = await _mongoService.GetAsync(model.Id);
            }
            else if (!string.IsNullOrWhiteSpace(model.NomeUsuario))
            {
                usuarioDb = await _mongoService.GetAsyncIdByCampo(NomeUsuario, nameof(Usuario.NomeUsuario));
            }

            if (usuarioDb is null || !BCrypt.Net.BCrypt.Verify(model.Senha, usuarioDb.Senha))
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
                new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
                new Claim(ClaimTypes.Role, model.Perfil.ToString())
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
