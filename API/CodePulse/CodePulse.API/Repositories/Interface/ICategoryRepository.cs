using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreatCategoryAsync(Category category);

        Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}
