using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Implementation;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;

        public ImagesController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        //POST {baseURL}/api/images
        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file,
                                                     [FromForm] string fileName,
                                                     [FromForm] string title)
        {
           ValidateFileUpload(file);

           if(ModelState.IsValid)
           {
                //File upload logic
                var blogImage = new BlogImage
                {
                    FileName = fileName,
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    Title = title,
                    DateCreated = DateTime.Now
                };

                blogImage = await _imageRepository.Upload(file, blogImage);

                //Convert To DTO
                var response = new BlogImageDto
                {
                    Id = blogImage.Id,
                    FileName = blogImage.FileName,
                    FileExtension = blogImage.FileExtension,
                    Title = blogImage.Title,
                    Url = blogImage.Url,
                    DateCreated = blogImage.DateCreated
                };

                return Ok(response);
            }

            return BadRequest(ModelState);

        }


        //GET {baseURL}/api/images
        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _imageRepository.GetAllImages();

            var response = images.Select(i => new BlogImageDto
            {
                Id = i.Id,
                FileName = i.FileName,
                FileExtension = i.FileExtension,
                Title = i.Title,
                Url = i.Url,
                DateCreated = i.DateCreated
            });

            return Ok(response);
        }

















        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png"}; //should move to appsettings.json

            if(allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()) == false)
            {
                ModelState.AddModelError("file", "Invalid file format. Only .jpg, .jpeg, .png are allowed.");
            }

            if (file.Length > 10485760) //10MB
            {
                ModelState.AddModelError("file", "File size is too large. Max file size is 10MB.");
            }

        }
    }
}
