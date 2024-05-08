using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetDotNet.DbContexts;
using WebApplication3.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DossiersMedicauxsController : ControllerBase
    {
        private readonly DataContext _context;

        public DossiersMedicauxsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDossiers()
        {
           
                var dossiers = _context.DossiersMedicaux
                    .Include(d => d.Patient)
                    .Include(d => d.Doctor)
                    .ToList();

                return Ok(dossiers);
            
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateDossierMedical([FromBody] DossiersMedicaux dossierMedicaux)
        {
                if (dossierMedicaux == null || dossierMedicaux.PatientID <= 0 || dossierMedicaux.IdDocteur <= 0 || dossierMedicaux.Prescriptions == null || dossierMedicaux.ResultatsExamens == null)
                {
                    return BadRequest("Invalid DossierMedicaux data");
                }

                var patient = await _context.Users
                    .Where(u => u.UserType == "patient" && u.IdUsers == dossierMedicaux.PatientID)
                    .FirstOrDefaultAsync();

                if (patient == null)
                {
                    return NotFound("Patient inexistant");
                }

                var docteur = await _context.Users
                    .Where(u => u.UserType == "medcin" && u.IdUsers == dossierMedicaux.IdDocteur)
                    .FirstOrDefaultAsync();

                if (docteur == null)
                {
                    return NotFound("Docteur inexistant");
                }

                var dossier = new DossiersMedicaux
                {
                    ConsultationDate = dossierMedicaux.ConsultationDate,
                    Prescriptions = dossierMedicaux.Prescriptions,
                    ResultatsExamens = dossierMedicaux.ResultatsExamens,
                    PatientID = dossierMedicaux.PatientID,
                    IdDocteur = dossierMedicaux.IdDocteur
                };

                _context.DossiersMedicaux.Add(dossier);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetDossier), new { id = dossier.DossierId }, dossier);
            
        }

        [HttpGet("{id}")]
        public IActionResult GetDossier(int id)
        {
            var dossier = _context.DossiersMedicaux
                .Include(d => d.Patient)
                .Include(d => d.Doctor)
                .FirstOrDefault(d => d.DossierId == id);

            if (dossier == null)
            {
                return NotFound("Dossier inexistant");
            }

            return Ok(dossier);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDossier(int id, [FromBody] DossiersMedicaux updatedDossier)
        {
            
                var existingDossier = await _context.DossiersMedicaux.FindAsync(id);

                if (existingDossier == null)
                {
                    return NotFound("Dossier inexistant");
                }

                existingDossier.ConsultationDate = updatedDossier.ConsultationDate;
                existingDossier.Prescriptions = updatedDossier.Prescriptions;
                existingDossier.ResultatsExamens = updatedDossier.ResultatsExamens;

                _context.DossiersMedicaux.Update(existingDossier);
                await _context.SaveChangesAsync();

                return Ok(existingDossier);
            
          
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDossier(int id)
        {
           
                var existingDossier = await _context.DossiersMedicaux.FindAsync(id);

                if (existingDossier == null)
                {
                    return NotFound("Dossier inexistant");
                }

                _context.DossiersMedicaux.Remove(existingDossier);
                await _context.SaveChangesAsync();

                return NoContent(); // HTTP 204 No Content
          
        }
    }
}
