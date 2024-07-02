using CodePulse.API.Data;
using CodePulse.API.Migrations;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    // https://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoriesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);    

        }

    }
}
