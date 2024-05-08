using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdUsers { get; set; }
        public string? nom { get; set; }
        public string? prenom { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
      
        public string? UserType { get; set; }


    }

}
