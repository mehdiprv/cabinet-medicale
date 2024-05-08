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
    public class RendezVous1Controller : ControllerBase
    {
        private readonly DataContext _context;

        public RendezVous1Controller(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getallrendezvous")]
        public IActionResult GetAllRendezVous()
        {
            var rendezVousList = _context.RendezVous
                .Include(r => r.Patient)
                .Include(r => r.Doctor)
                .ToList();

            return Ok(rendezVousList);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRendezVous([FromBody] RendezVous rendezvous)
        {
            if (rendezvous == null || rendezvous.IdPatients <= 0 || rendezvous.IdDocteur <= 0 || rendezvous.DateHeure == null || rendezvous.ConsultationDetails == null)
            {
                return BadRequest("Invalid rendezvous data");
            }

            var patient = await _context.Users
                .Where(u => u.UserType == "patient" && u.IdUsers == rendezvous.IdPatients)
                .FirstOrDefaultAsync();

            if (patient == null)
            {
                return NotFound("Patient inexistant");
            }

            var docteur = await _context.Users
                .Where(u => u.UserType == "medcin" && u.IdUsers == rendezvous.IdDocteur)
                .FirstOrDefaultAsync();

            if (docteur == null)
            {
                return NotFound("Docteur inexistant");
            }

            var nouveauRendezVous = new RendezVous
            {
                DateHeure = rendezvous.DateHeure,
                ConsultationDetails = rendezvous.ConsultationDetails,
                IdPatients = rendezvous.IdPatients,
                IdDocteur = rendezvous.IdDocteur
            };

            _context.RendezVous.Add(nouveauRendezVous);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRendezVousById), new { id = nouveauRendezVous.RendezVousId }, nouveauRendezVous);
        }

        [HttpGet("{id}")]
        public IActionResult GetRendezVous(int id)
        {
            var rendezVous = _context.RendezVous
                .Include(r => r.Patient)
                .Include(r => r.Doctor)
                .FirstOrDefault(r => r.RendezVousId == id);

            if (rendezVous == null)
            {
                return NotFound($"Rendez-vous avec l'ID {id} introuvable.");
            }

            return Ok(rendezVous);
        }


        [HttpGet("getrendezvousbyid/{id}", Name = "GetRendezVousById")]
        public ActionResult<RendezVous> GetRendezVousById(int id)
        {
            try
            {
                var rendezVous = _context.RendezVous.Find(id);

                if (rendezVous == null)
                {
                    return NotFound();
                }

                return rendezVous;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving the rendez-vous: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRendezVous(int id)
        {
            try
            {
                var rendezVous = _context.RendezVous.Find(id);

                if (rendezVous == null)
                {
                    return NotFound();
                }

                _context.RendezVous.Remove(rendezVous);
                _context.SaveChanges();

                return Ok(rendezVous);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting the rendez-vous: {ex.Message}");
            }
        }
    }
}
