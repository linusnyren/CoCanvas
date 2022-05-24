using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CoCanvas.Interfaces
{
    public interface IImageRepository
    {
        Task<IEnumerable<Image>> GetUrls();
        Task<Image> UploadImageAsync(string name, Stream stream);
    }
}
