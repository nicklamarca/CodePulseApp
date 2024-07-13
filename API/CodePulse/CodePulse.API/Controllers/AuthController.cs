using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
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
        private readonly ITokenRepository _tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager,
                              ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
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
                   var jwtToken = _tokenRepository.CreateJwtToken(identityUser, roles.ToList());

                    var response = new LoginResponseDto
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken
                    };

                    return Ok(response);
                }

            }

           ModelState.AddModelError("Unauthorized", "Invalid Email or Password");

           return ValidationProblem(ModelState);

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
