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
        public DbSet<Docteurs> Docteurs { get; set; }
        public DbSet<DossiersMedicaux> DossiersMedicaux { get; set; }
        public DbSet<RendezVous> RendezVous { get; set; }
        public DbSet<Users> Users { get; set; }


    }
}
