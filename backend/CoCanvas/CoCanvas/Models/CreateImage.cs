using System;
using Microsoft.AspNetCore.Http;

namespace CoCanvas.Models
{
    public class CreateImage
    {
        public string Name { get; set; }
        public IFormFile ImageData { get; set; }
    }
}
