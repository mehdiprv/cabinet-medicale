using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetDotNet.DbContexts;
using WebApplication3.Models;
// hello ajout
namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly DataContext _context;

        public PatientsController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context)); ;
        }



        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("addpatient")]
        public async Task<ActionResult<Patients>> PostPatients(Patients patients)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                patients.UserType = "patient";

                _context.Users.Add(patients);
                await _context.SaveChangesAsync();

                // Utiliser l'ID généré après l'ajout à la base de données
                return CreatedAtAction(nameof(GetPatientById), new { id = patients.IdUsers }, patients);
            }
            catch (DbUpdateException ex)
            {
                // Log the exception or return the details in the response
                // Include inner exception details for more information
                return StatusCode(500, $"Error saving changes to the database: {ex.Message}. InnerException: {ex.InnerException?.Message}");
            }
        }
        [HttpGet("{id}", Name = "GetPatientById")]
        public ActionResult<Patients> GetPatientById(int id)
        {
            try
            {
                // Logique pour récupérer le patient par ID
                // Assurez-vous de retourner le résultat approprié

                var patient = _context.Users.Find(id);

                if (patient == null)
                {
                    return NotFound();
                }

                // Effectuer un cast explicite vers le type Patients si votre modèle Patients hérite de User
                var patientsResult = (Patients)patient;

                return patientsResult;
            }
            catch (Exception ex)
            {
                // Log the exception or return the details in the response
                return StatusCode(500, $"Error retrieving the patient: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Patients>> DeletePatient(int id)
        {
            try
            {
                // Recherche le patient dans la table Patients
                var patient = await _context.Patients.FindAsync(id);
                if (patient == null)
                {
                    return NotFound();
                }

                // Recherche l'entité correspondante dans la table Users
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound(); // Peut-être que vous souhaitez renvoyer NotFound si l'utilisateur n'est pas trouvé dans Users
                }

                // Supprime le patient de la table Patients
                _context.Patients.Remove(patient);

                // Supprime l'entité correspondante de la table Users
                _context.Users.Remove(user);

                await _context.SaveChangesAsync();

                return patient;
            }
            catch (Exception ex)
            {
                // Log the exception or return the details in the response
                return StatusCode(500, $"Error deleting the patient: {ex.Message}");
            }
        }
        [HttpGet("getallpatients")]
        public ActionResult<IEnumerable<Patients>> GetAllPatients()
        {
            try
            {
                // Récupérer tous les utilisateurs avec UserType égal à "patient"
                var patients = _context.Users
                    .Where(u => u.UserType == "patient")
                    .ToList();

                if (patients == null || patients.Count == 0)
                {
                    return NotFound(); // Retourner NotFound si aucune donnée n'est trouvée
                }

                return Ok(patients); // Retourner les patients trouvés
            }
            catch (Exception ex)
            {
                // Log the exception or return the details in the response
                return StatusCode(500, $"Error retrieving all patients: {ex.Message}");
            }
        }







    }
}





