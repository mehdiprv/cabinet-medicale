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
        public string Prescriptions { get; set; }
        public string ResultatsExamens { get; set; }

        [ForeignKey("Patient")]
        public int? IdPatients { get; set; }
        public User Patient { get; set; }

        [ForeignKey("Doctor")]
        public int? IdDocteurs { get; set; }
        public User Medcin { get; set; }
    }
}