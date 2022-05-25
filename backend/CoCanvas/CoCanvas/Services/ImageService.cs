using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoCanvas.Interfaces;
using CoCanvas.Models;

namespace CoCanvas.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        public async Task<Image> AddImages(CreateImage createImage)
        {
            Image image = null;
            using (var stream = createImage.ImageData.OpenReadStream())
            {
                image = await imageRepository.UploadImageAsync(createImage.Name, stream);
            }
            return image;
        }

        public async Task<IEnumerable<Image>> GetUrls()
        {
            var urls = await imageRepository.GetUrls();
            return urls.OrderBy(x => x.CreatedOn).Reverse();
        }
    }
}
