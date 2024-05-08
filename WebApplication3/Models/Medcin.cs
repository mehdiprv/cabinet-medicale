namespace WebApplication3.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [NotMapped]
    public partial class Medecin : User
    {
       
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]


        public string Specialite { get; set; }
    }
}
