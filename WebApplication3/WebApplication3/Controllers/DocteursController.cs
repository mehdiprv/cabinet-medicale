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
    public class MedcinsController : ControllerBase
    {
        private readonly DataContext _context;

        public MedcinsController(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("addmedcins")]
        public async Task<IActionResult> PostMedcins(Docteurs medcins)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                medcins.UserType = "medcin";

                // Extraire l'ID utilisateur des données de route
                int userId = Convert.ToInt32(ControllerContext.RouteData.Values["id"]);

                // Définir l'ID utilisateur pour le patient
                medcins.IdUsers = userId;

                _context.Users.Add(medcins);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetMedcinById), new { id = medcins.IdUsers }, medcins);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erreur lors de l'ajout du medins à la base de données : {ex.Message}");
            }
        }
    

        [HttpGet("{id}", Name = "GetMedcinById")]
        public IActionResult GetMedcinById(int id)
        {
            try
            {
                var medcin = _context.Users
                    .Where(u => u.UserType == "medcin" && u.IdUsers == id)
                    .FirstOrDefault();

                if (medcin == null)
                {
                    return NotFound($"Medcins avec l'ID {id} non trouvé.");
                }

                return Ok(medcin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la récupération du medcin : {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocteurs(int id)
        {
            try
            {
                var medcin = await _context.Users
                    .Where(u => u.UserType == "medcin" && u.IdUsers == id)
                    .FirstOrDefaultAsync();

                if (medcin == null)
                {
                    return NotFound($"medcin avec l'ID {id} non trouvé.");
                }

                _context.Users.Remove(medcin);
                await _context.SaveChangesAsync();

                return Ok(medcin);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la suppression du medcin : {ex.Message}");
            }
        }


        [HttpGet("getallMedcins")]
        public IActionResult GetAllMedcins()
        {
            try
            {
                var medcins = _context.Users
                    .Where(u => u.UserType == "medcin")
                    .ToList();

                if (medcins == null || medcins.Count == 0)
                {
                    return NotFound("Aucun medcins trouvé.");
                }

                return Ok(medcins);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la récupération de tous les medcins : {ex.Message}");
            }
        }
    }
}
