﻿using CodePulse.API.Data;
using CodePulse.API.Migrations;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    // https://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await _categoryRepository.CreatCategoryAsync(category);

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);    

        }

        //GET: https://localhost:7024/api/Categories?query=html&sortBy=name&sortDirection=desc
        [HttpGet]
        public async Task<IActionResult> GetAllCategories([FromQuery] string? query,
                                                          [FromQuery] string? sortBy,
                                                          [FromQuery] string? sortDirection,
                                                          [FromQuery] int? pageNumber,
                                                          [FromQuery] int? pageSize)
        {
           var categories =  await _categoryRepository.GetAllCategoriesAsync(query, 
                                                                             sortBy, sortDirection,
                                                                             pageNumber, pageSize);
           
            //Map Domain model to DTO
            var response = new List<CategoryDto>();
            foreach(var category in categories)
            {
                response.Add(new CategoryDto {
                    Id=category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }

           return Ok(response);
        }

        //GET: https://localhost:7024/api/Categories/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
           var existingCategory = await _categoryRepository.GetCategoryByIdAsync(id);
           
            if(existingCategory == null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle
            };

            return Ok(response);
        }

        //PUT  https://localhost:7024/api/Categories/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto request)
        {
            //convert dto to domain model
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

          category =  await _categoryRepository.UpdateCategoryAsync(category);

            if (category == null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        //DELETE:  https://localhost:7024/api/Categories/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
           var category =  await _categoryRepository.DeleteCategoryAsync(id);
           if (category == null) 
            { 
                return NotFound(); 
            }

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);

        }

        // GET: https://localhost:7024/api/Categories/count
        [HttpGet]
        [Route("count")]
        public async Task<IActionResult> GetCategoriesCount()
        {
            var count = await _categoryRepository.GetCategoriesCount();
            return Ok(count);
        }


    }
}
