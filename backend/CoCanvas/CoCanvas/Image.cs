using System;
namespace CoCanvas
{
    public class Image
    {
        public string Url { get; set; }
        public DateTimeOffset? CreatedOn { get; internal set; }
    }
}
