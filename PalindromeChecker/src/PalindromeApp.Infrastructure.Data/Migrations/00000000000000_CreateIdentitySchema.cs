using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;
using PalindromeApp.Infrastructure.Data;

namespace PalindromeApp.Web.App.Data.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("00000000000000_CreateIdentitySchema")]
    public class CreateIdentitySchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Palindromes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PalindromeValue = table.Column<string>(maxLength: 256, nullable: false),

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Palindromes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Palindromes");
        }
    }
}
