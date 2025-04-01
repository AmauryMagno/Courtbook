using System.ComponentModel.DataAnnotations;

namespace WebApi_courtbook.Models
{
    public class AuthenticateDto : IEntity
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
