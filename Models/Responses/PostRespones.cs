using Newtonsoft.Json;
using ReactCore.Models; 

namespace ReactCore.Models.Responses
{
    public class PostResponse
    {
        public PostResponse(Post post)
        {
            Success = true;
            Post = post;
            
        }

        public PostResponse(bool success, string message)
        {
            Success = success;
            if (success) SuccessMessage = message;
            else ErrorMessage = message;
        }

        public bool Success { get; set; }
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }

        
        [JsonProperty("info")]
        public Post Post { get; set; }
    }
}
