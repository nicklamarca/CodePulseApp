using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace CodePulse.API.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //got these guids from c# interactive window
            var readerRoleId = "704b7463-a29b-43dc-b29e-f99f7deb1278";
            var writerRoleId = "e19f634a-c43d-4362-8458-b714f6761272";

            //Create reader and writer roles
            var roles = new List<IdentityRole>
            {
                new IdentityRole() 
                { 
                  Id=readerRoleId, 
                  Name="Reader", 
                  NormalizedName="Reader".ToUpper(), 
                  ConcurrencyStamp = readerRoleId 
                },
                new IdentityRole() 
                {
                  Id=writerRoleId, 
                  Name = "Writer", 
                  NormalizedName = "Writer".ToUpper(), 
                  ConcurrencyStamp = writerRoleId 
                }
            };

            //seed the roles
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            //create a default admin user
            var adminUserId= "3e1c374b-2f84-414d-a56e-929e5a4fffcf";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@codepulse.com",
                NormalizedUserName = "admin@codepulse.com".ToUpper(),
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper()
            };

            //create a pw for the admin user
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "P@ssword1");

            //seed the admin user
            modelBuilder.Entity<IdentityUser>().HasData(admin);

            //give roles to admin user
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId           
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                }
            };

            //seed the roles for the admin user
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
   

        }
    }
}
