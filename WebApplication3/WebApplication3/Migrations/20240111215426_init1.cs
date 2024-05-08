using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication3.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
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
                    nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false)
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
                    Prescriptions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResultatsExamens = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PatientID = table.Column<int>(type: "int", nullable: false),
                    IdDocteur = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossiersMedicaux", x => x.DossierId);
                    table.ForeignKey(
                        name: "FK_DossiersMedicaux_Users_IdDocteur",
                        column: x => x.IdDocteur,
                        principalTable: "Users",
                        principalColumn: "IdUsers",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_DossiersMedicaux_Users_PatientID",
                        column: x => x.PatientID,
                        principalTable: "Users",
                        principalColumn: "IdUsers",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "RendezVous",
                columns: table => new
                {
                    RendezVousId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateHeure = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ConsultationDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdPatients = table.Column<int>(type: "int", nullable: false),
                    IdDocteur = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RendezVous", x => x.RendezVousId);
                    table.ForeignKey(
                        name: "FK_RendezVous_Users_IdDocteur",
                        column: x => x.IdDocteur,
                        principalTable: "Users",
                        principalColumn: "IdUsers",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_RendezVous_Users_IdPatients",
                        column: x => x.IdPatients,
                        principalTable: "Users",
                        principalColumn: "IdUsers",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DossiersMedicaux_IdDocteur",
                table: "DossiersMedicaux",
                column: "IdDocteur");

            migrationBuilder.CreateIndex(
                name: "IX_DossiersMedicaux_PatientID",
                table: "DossiersMedicaux",
                column: "PatientID");

            migrationBuilder.CreateIndex(
                name: "IX_RendezVous_IdDocteur",
                table: "RendezVous",
                column: "IdDocteur");

            migrationBuilder.CreateIndex(
                name: "IX_RendezVous_IdPatients",
                table: "RendezVous",
                column: "IdPatients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DossiersMedicaux");

            migrationBuilder.DropTable(
                name: "RendezVous");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
