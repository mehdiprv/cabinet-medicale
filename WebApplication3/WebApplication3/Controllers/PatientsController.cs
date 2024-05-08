using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetDotNet.DbContexts;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly DataContext _context;

        public PatientsController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("addpatient")]
        public async Task<IActionResult> PostPatients(Patients patients)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                patients.UserType = "patient";

                // Extraire l'ID utilisateur des données de route
                int userId = Convert.ToInt32(ControllerContext.RouteData.Values["id"]);

                // Définir l'ID utilisateur pour le patient
                patients.IdUsers = userId;

                _context.Users.Add(patients);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPatientById), new { id = patients.IdUsers }, patients);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erreur lors de l'ajout du patient à la base de données : {ex.Message}");
            }
        }

        [HttpGet("{id}", Name = "GetPatientById")]
        public IActionResult GetPatientById(int id)
        {
            try
            {
                var patient = _context.Users
                    .Where(u => u.UserType == "patient" && u.IdUsers == id)
                    .FirstOrDefault();

                if (patient == null)
                {
                    return NotFound($"Patient avec l'ID {id} non trouvé.");
                }

                return Ok(patient);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la récupération du patient : {ex.Message}");
            }
        }










        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                var patient = await _context.Users
                    .Where(u => u.UserType == "patient" && u.IdUsers == id)
                    .FirstOrDefaultAsync();

                if (patient == null)
                {
                    return NotFound($"Patient avec l'ID {id} non trouvé.");
                }

                _context.Users.Remove(patient);
                await _context.SaveChangesAsync();

                return Ok(patient);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la suppression du patient : {ex.Message}");
            }
        }


        [HttpGet("getallpatients")]
        public IActionResult GetAllPatients()
        {
            try
            {
                var patients = _context.Users
                    .Where(u => u.UserType == "patient")
                    .ToList();

                if (patients == null || patients.Count == 0)
                {
                    return NotFound("Aucun patient trouvé.");
                }

                return Ok(patients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la récupération de tous les patients : {ex.Message}");
            }
        }
    }
}
