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
    public class RendezVousController : ControllerBase
    {
        private readonly DataContext _context;

        public RendezVousController(DataContext context)
        {
            _context = context;
        }

        // GET: api/RendezVous
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RendezVous>>> GetRendezvous()
        {
            return await _context.Rendezvous.ToListAsync();
        }

        // GET: api/RendezVous/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RendezVous>> GetRendezVous(int? id)
        {
            var rendezVous = await _context.Rendezvous.FindAsync(id);

            if (rendezVous == null)
            {
                return NotFound();
            }

            return rendezVous;
        }

        // PUT: api/RendezVous/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRendezVous(int? id, RendezVous rendezVous)
        {
            if (id != rendezVous.RendezVousId)
            {
                return BadRequest();
            }

            _context.Entry(rendezVous).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RendezVousExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RendezVous
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RendezVous>> PostRendezVous(RendezVous rendezVous)
        {
            _context.Rendezvous.Add(rendezVous);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRendezVous", new { id = rendezVous.RendezVousId }, rendezVous);
        }

        // DELETE: api/RendezVous/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRendezVous(int? id)
        {
            var rendezVous = await _context.Rendezvous.FindAsync(id);
            if (rendezVous == null)
            {
                return NotFound();
            }

            _context.Rendezvous.Remove(rendezVous);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RendezVousExists(int? id)
        {
            return _context.Rendezvous.Any(e => e.RendezVousId == id);
        }
    }
}
