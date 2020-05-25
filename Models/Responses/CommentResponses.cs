using Newtonsoft.Json;
using ReactCore.Models; 

namespace ReactCore.Models.Responses
{
    public class CommentResponse
    {
        public CommentResponse(Comment comment)
        {
            Success = true;
            Comment = comment;
            
        }

        public CommentResponse(bool success, string message)
        {
            Success = success;
            if (success) SuccessMessage = message;
            else ErrorMessage = message;
        }

        public bool Success { get; set; }
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }

        
        [JsonProperty("info")]
        public Comment Comment { get; set; }
    }
}
