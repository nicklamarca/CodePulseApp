using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Category> CreatCategoryAsync(Category category)
        {
            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> DeleteCategoryAsync(Guid id)
        {
          var existingCategory =  await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if(existingCategory is null)
            {
                return null;
            }

            _dbContext.Categories.Remove(existingCategory);
            await _dbContext.SaveChangesAsync();

            return existingCategory;
            
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync(string? query = null, 
                                                                       string? sortBy = null,
                                                                       string? sortDirection = null,
                                                                       int? pageNumber = 1,
                                                                       int? pageSize = 10)
        {
            // Basic Implementation
           //return await _dbContext.Categories.ToListAsync();

           //Querying the database
           var categories = _dbContext.Categories.AsQueryable();

           //Filtering
           if (string.IsNullOrWhiteSpace(query) == false)
           {
             categories = categories.Where(c => c.Name.Contains(query));
           }

           //Sorting
           if (string.IsNullOrWhiteSpace(sortBy) == false)
              {
                if(string.Equals(sortBy, "Name", StringComparison.OrdinalIgnoreCase))
                {
                   var isAscending = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase);
                   if(isAscending)
                   {
                      categories = categories.OrderBy(c => c.Name);
                   }
                   else
                   {
                      categories = categories.OrderByDescending(c => c.Name);
                   }
                }

                if (string.Equals(sortBy, "URL", StringComparison.OrdinalIgnoreCase))
                {
                    var isAscending = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase);
                    if (isAscending)
                    {
                        categories = categories.OrderBy(c => c.UrlHandle);
                    }
                    else
                    {
                        categories = categories.OrderByDescending(c => c.UrlHandle);
                    }
                }
            }

            //Pagination
           var skipRecords = (pageNumber - 1) * pageSize;
           categories = categories.Skip(skipRecords ?? 0).Take(pageSize ?? 10);

           return await categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(Guid id)
        {
           return await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category?> UpdateCategoryAsync(Category category)
        {
           var existingCategory = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);
           if (existingCategory != null)
            {
                _dbContext.Entry(existingCategory).CurrentValues.SetValues(category);
                await _dbContext.SaveChangesAsync();
                return category;
            }

           return null;
        }
    }
}
