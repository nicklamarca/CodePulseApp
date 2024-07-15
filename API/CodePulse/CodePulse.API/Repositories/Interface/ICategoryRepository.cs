using CodePulse.API.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreatCategoryAsync(Category category);

        Task<IEnumerable<Category>> GetAllCategoriesAsync(string? query = null,
                                                          string? sortBy = null,
                                                          string? sortDirection = null,
                                                          int? pageNumber = 1,
                                                          int? pageSize = 10);

        Task<Category?> GetCategoryByIdAsync(Guid id);

        Task<Category?> UpdateCategoryAsync(Category category);

        Task<Category?> DeleteCategoryAsync(Guid id);
    }
}
