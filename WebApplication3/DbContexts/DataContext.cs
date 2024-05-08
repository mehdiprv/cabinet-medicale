global using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using WebApplication3.Models;

namespace ProjetDotNet.DbContexts
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
             : base(options)
        {

        }

        public DbSet<Patients> Patients { get; set; }
        public DbSet<DossiersMedicaux> DossiersMedicaux { get; set; }
        public DbSet<RendezVous> Rendezvous { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
