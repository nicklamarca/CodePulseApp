using CodePulse.API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        //POST : https://localhost:xxxx/api/auth/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
           //Find user by email
           var identityUser = await _userManager.FindByEmailAsync(request.Email);

           if(identityUser != null)
            {
                //Check Password 
               var isCorrectPassword =  await _userManager.CheckPasswordAsync(identityUser, request.Password);
                if (isCorrectPassword)
                {
                    var roles = await _userManager.GetRolesAsync(identityUser);

                    //Create a Token and Response
                    var response = new LoginResponseDto
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = "TOKEN"
                    };

                    return Ok(response);
                }

            }

           ModelState.AddModelError("Unauthorized", "Invalid Email or Password");

           return ValidationProblem(ModelState);

            ////Find user by email
            //var user = await _userManager.FindByEmailAsync(request.Email);

            //if (user == null)
            //{
            //    return Unauthorized();
            //}

            ////Check if password is correct
            //var isCorrectPassword = await _userManager.CheckPasswordAsync(user, request.Password);

            //if (!isCorrectPassword)
            //{
            //    return Unauthorized();
            //}

            ////Create claims
            //var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.NameIdentifier, user.Id),
            //    new Claim(ClaimTypes.Name, user.UserName)
            //};

            ////Get roles for user
            //var roles = await _userManager.GetRolesAsync(user);

            //foreach (var role in roles)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, role));
            //}

            ////Create token
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes("super secret key");
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(claims),
            //    Expires = DateTime.UtcNow.AddHours(1),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};

            //var token = tokenHandler.CreateToken(tokenDescriptor);

            //return Ok(new { token = tokenHandler.WriteToken(token) });
        }


        //POST : https://localhost:xxxx/api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            //Create IdentityUser
            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

           //Create user
           var identityResult = await _userManager.CreateAsync(user, request.Password);

           if(identityResult.Succeeded)
           {
                //Add role to user (reade role)
                identityResult = await _userManager.AddToRoleAsync(user, "Reader");
                if(identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError(error.Code, error.Description);
                        }
                    }

                }
            }
           else
           {
                if(identityResult.Errors.Any())
                {
                   foreach(var error in identityResult.Errors)
                   {
                       ModelState.AddModelError(error.Code, error.Description);
                   }
                }
                
           }

           return ValidationProblem(ModelState);

        }
    }
}
