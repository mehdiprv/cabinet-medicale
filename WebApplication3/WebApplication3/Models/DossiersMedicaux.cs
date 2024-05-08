using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    public class DossiersMedicaux
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DossierId { get; set; }
        public DateTime? ConsultationDate { get; set; }
        public string? Prescriptions { get; set; }
        public string? ResultatsExamens { get; set; }

        [ForeignKey("Patient")]
        public int PatientID { get; set; }
        public Users? Patient { get; set; }

        [ForeignKey("Doctor")]
        public int IdDocteur { get; set; }
        public Users?  Doctor { get; set; }
    }
}
