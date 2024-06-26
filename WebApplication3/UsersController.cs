﻿using Microsoft.AspNetCore.Mvc;
using projet_cabinet.Data;
using projet_cabinet.Models;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace projet_cabinet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
        
    {
        private readonly UsersDBContext context;

        public UserController(UsersDBContext _context)
        {
            context = _context;
        }
        private string GenerateJwtToken(int expirationMinutes, string username, int id)
        {
            var keyBytes = Encoding.ASCII.GetBytes("tkrpgkretrkgreltrgertgtr");
            string userType = context.Users
            .Where(u => u.ID == id)
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
        // Dependency injection of your DbContext or user service here
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] Patients model)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
            var user = new Patients
            {
                Email = model.Email,
                Password = hashedPassword,
                UserName = model.UserName,
                UserType = model.UserType,
                Adresse = model.Adresse
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "Registration successful" });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin model)
        {
            // Find the user based on the provided email
            var user = context.Users.FirstOrDefault(u => u.Email == model.Email);

            // Check if the user exists and the password is correct
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid email or password" });
            }
            var token = GenerateJwtToken(10, user.Email, user.ID);
            return Ok(new { message = "Login successful", token = token });
        }
    }
}
}
