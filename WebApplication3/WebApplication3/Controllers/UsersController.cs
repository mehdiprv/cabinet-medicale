using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProjetDotNet.DbContexts;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
    

        public UsersController(DataContext context, IConfiguration configuration)
        {
            _context = context;
          
        }

        public class JwtClaimTypes
        {
            public const string Name = ClaimTypes.Name;
            public const string Id = "Id";
            public const string Type = "Type";
        }

        private string GenerateJwtToken(int expirationMinutes, string username, int id)
        {
            var keyBytes = Encoding.UTF8.GetBytes("tkrpgkretrkgreltrgertgtr12345678901234");


            string userType = _context.Users
            .Where(u => u.IdUsers == id)
            .Select(u => EF.Property<string>(u, "UserType"))
            .FirstOrDefault();
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim("Id", id.ToString()),
                new Claim("Type", userType)
            };

            var tokenOptions = new JwtSecurityToken(
                issuer: "pix",
                audience: "pix",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Users model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

                _context.Users.Add(model);
                _context.SaveChanges();

                model.Password = null;

                return CreatedAtAction(nameof(GetUser), new { id = model.IdUsers }, model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de l'enregistrement de l'utilisateur : {ex.Message}");
            }
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] Users model)
        {
            if (model.Email == "admin@gmail.com" && model.Password == "admin")
            {
                // Admin login logic

                return Ok(new { message = "Admin login successful", role = "admin" });
            }

            // Find the user based on the provided email
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);

            // Check if the user exists and the password is correct
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid email or password" });
            }

            // Regular user login logic
            var userToken = GenerateJwtToken(10, user.Email, user.IdUsers);
            return Ok(new { message = "User login successful", token = userToken, role = "user" });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.IdUsers == id);
        }
    }
}
