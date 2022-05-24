using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CoCanvas.Interfaces;
using CoCanvas.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static System.Net.WebRequestMethods;

namespace CoCanvas.Controllers
{
    [EnableCors("CorsPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {

        private readonly ILogger<ImageController> _logger;
        private readonly IImageService imageService;

        public ImageController(ILogger<ImageController> logger, IImageService imageService)
        {
            _logger = logger;
            this.imageService = imageService;
        }

        
        [HttpGet]
        public async Task<IEnumerable<Image>> Get()
        {
            return await imageService.GetUrls();
        }

        [HttpPost]
        public async Task<Image> Add([FromForm] CreateImage image)
        {
            return await imageService.AddImages(image);
        }
    }
}
