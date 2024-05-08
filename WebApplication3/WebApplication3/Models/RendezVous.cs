using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    public class RendezVous
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RendezVousId { get; set; }
        public DateTime? DateHeure { get; set; }
        public string ConsultationDetails { get; set; }

        [ForeignKey("Patient")]
        public int IdPatients { get; set; }
        public Users? Patient { get; set; }

        [ForeignKey("Doctor")]
        public int IdDocteur { get; set; }
        public Users? Doctor { get; set; }
    }
}
