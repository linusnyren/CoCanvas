using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoCanvas.Models;

namespace CoCanvas.Interfaces
{
    public interface IImageService
    {
        Task<IEnumerable<Image>> GetUrls();
        Task<Image> AddImages(CreateImage createImage);
    }
}
