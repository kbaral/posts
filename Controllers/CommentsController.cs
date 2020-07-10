using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using ReactCore;
using ReactCore.Models;
using ReactCore.Models.Responses;
using ReactCore.Repositories;

namespace ReactCore.Controllers
{
    /// <summary>
    ///     Handles user-based requests (/api/v1/users*)
    /// </summary>
    [Route("api/v1/posts")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IOptions<JwtAuthentication> _jwtAuthentication;
        private readonly CommentsRepository _commentsRepository;
        public CommentsController(CommentsRepository commentsRepository,            
            IOptions<JwtAuthentication> jwtAuthentication)
        {
            _commentsRepository = commentsRepository;           
            _jwtAuthentication = jwtAuthentication ?? throw new ArgumentNullException(nameof(jwtAuthentication));
        }

        /// <summary>
        ///     Adds a user to the system and generates a JWT token for the user
        /// </summary>
        /// <param name="comments">A comment object.</param>
        /// <returns></returns>
        [HttpPost("/api/v1/comments/add")]
        public async Task<ActionResult> AddComment([FromBody] Comment comment)
        {
           
            var response = await _commentsRepository.AddCommentAsync(comment);         
           return response.Comment != null ? Ok(new CommentResponse(response.Comment)) : Ok(response);
        }

 
        
        /// <summary>
        ///     Returns a post
        /// </summary>
        /// <param name="postId">The email of the user to return.</param>
        /// <returns></returns>
        [HttpGet("/api/getcomments")]
        public async Task<IActionResult> GetAll(Post post)
        {
            var comments = await _commentsRepository.GetCommentsForPostAsync(post.Id);

            
             return Ok(comments);
        }

        /// <summary>
        ///     show the list of comments for a post
        /// </summary>
        /// <param name="comments">A comment object.</param>
        /// <returns></returns>
        [HttpPost("/api/v1/comments/show")]
        public async Task<IActionResult> DisplayComment([FromBody] Comment comment)
        {          
            var response = await _commentsRepository.GetCommentsForPostAsync(comment.PostId);
            response = response.Where(x => !string.IsNullOrEmpty(x.Name));
           return Ok(response);
        }

        
        /// <summary>
        ///     Adds a user to the system and generates a JWT token for the user
        /// </summary>
        /// <param name="id">A User id.</param>
        /// <returns></returns>
        [HttpPost("/api/v1/comments/delete")]        
        public async Task<IActionResult> DeletePost([FromBody] Comment comment)
        {  
            return Ok(await _commentsRepository.DeleteCommentAsync(comment.Id));

        }




    }


}
