using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication3.Migrations
{
    /// <inheritdoc />
    public partial class init20 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IdUsers = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Adresse = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdUsers);
                });

            migrationBuilder.CreateTable(
                name: "DossiersMedicaux",
                columns: table => new
                {
                    DossierId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConsultationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Prescriptions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResultatsExamens = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdPatients = table.Column<int>(type: "int", nullable: true),
                    IdDocteurs = table.Column<int>(type: "int", nullable: true),
                    MedcinIdUsers = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossiersMedicaux", x => x.DossierId);
                    table.ForeignKey(
                        name: "FK_DossiersMedicaux_Users_IdPatients",
                        column: x => x.IdPatients,
                        principalTable: "Users",
                        principalColumn: "IdUsers");
                    table.ForeignKey(
                        name: "FK_DossiersMedicaux_Users_MedcinIdUsers",
                        column: x => x.MedcinIdUsers,
                        principalTable: "Users",
                        principalColumn: "IdUsers",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rendezvous",
                columns: table => new
                {
                    RendezVousId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateHeure = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ConsultationDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdPatients = table.Column<int>(type: "int", nullable: true),
                    IdDocteurs = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rendezvous", x => x.RendezVousId);
                    table.ForeignKey(
                        name: "FK_Rendezvous_Users_IdDocteurs",
                        column: x => x.IdDocteurs,
                        principalTable: "Users",
                        principalColumn: "IdUsers");
                    table.ForeignKey(
                        name: "FK_Rendezvous_Users_IdPatients",
                        column: x => x.IdPatients,
                        principalTable: "Users",
                        principalColumn: "IdUsers");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DossiersMedicaux_IdPatients",
                table: "DossiersMedicaux",
                column: "IdPatients");

            migrationBuilder.CreateIndex(
                name: "IX_DossiersMedicaux_MedcinIdUsers",
                table: "DossiersMedicaux",
                column: "MedcinIdUsers");

            migrationBuilder.CreateIndex(
                name: "IX_Rendezvous_IdDocteurs",
                table: "Rendezvous",
                column: "IdDocteurs");

            migrationBuilder.CreateIndex(
                name: "IX_Rendezvous_IdPatients",
                table: "Rendezvous",
                column: "IdPatients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DossiersMedicaux");

            migrationBuilder.DropTable(
                name: "Rendezvous");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
