﻿using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CodePulse.API.Repositories.Implementation
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration _configuration;

        public TokenRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateJwtToken(IdentityUser user, List<string> roles)
        {
           //Create Claims
           var claims = new List<Claim>
           {
               new Claim(ClaimTypes.Email, user.Email)
           };

           claims.AddRange(roles.Select(role => 

               new Claim(ClaimTypes.Role, role)

            ));

           //Jwt Security Token Parameters
           //get the secret key from appsettings.json
           var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

           var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

           var token = new JwtSecurityToken(
              issuer: _configuration["Jwt:Issuer"],
              audience: _configuration["Jwt:Audience"],
              claims: claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds
           );

           //Return Token
           return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
