using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using CoCanvas.Configuration;
using CoCanvas.Interfaces;
using CoCanvas.Models;
using Microsoft.Extensions.Options;

namespace CoCanvas.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private BlobContainerClient containerClient;
        public ImageRepository(IOptions<ImageRepositoryOptions> options)
        {
            BlobServiceClient blobServiceClient = new BlobServiceClient(options.Value.ConnectionString);
            this.containerClient = blobServiceClient.GetBlobContainerClient(options.Value.Container);
        }

        public async Task<IEnumerable<Image>> GetUrls()
        {
            string container_url = containerClient.Uri.ToString();
            var response = containerClient.GetBlobsAsync();

            var res = new List<Image>();
            await foreach (var item in response)
            {
                //here you can concatenate the container url with blob name
                string blob_url = container_url + "/" + item.Name;
                res.Add(new Image { Url = blob_url, CreatedOn = item.Properties.CreatedOn});
            }
            return res;
        }

        public async Task<Image> UploadImageAsync(string name, Stream stream)
        {
            var res = await containerClient.UploadBlobAsync(name, stream);

            string container_url = containerClient.Uri.ToString();
            return new Image { Url = $"{container_url}/{name}" };
        }
    }
}
