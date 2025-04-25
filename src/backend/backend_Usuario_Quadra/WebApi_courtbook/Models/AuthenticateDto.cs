using System.ComponentModel.DataAnnotations;

namespace WebApi_courtbook.Models
{
    public class AuthenticateDto : IEntity
    {
        public string Id { get; set; }
        
        public string NomeUsuario { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}
