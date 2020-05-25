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
    public class PostsController : ControllerBase
    {
        private readonly IOptions<JwtAuthentication> _jwtAuthentication;
        private readonly PostsRepository _postRepository;
        

        public PostsController(PostsRepository postsRepository,            
            IOptions<JwtAuthentication> jwtAuthentication)
        {
            _postRepository = postsRepository;           
            _jwtAuthentication = jwtAuthentication ?? throw new ArgumentNullException(nameof(jwtAuthentication));
        }

        /// <summary>
        ///     Returns a post
        /// </summary>
        /// <param name="postId">The email of the user to return.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> Get([RequiredFromQuery] string postId)
        {
            var post = await _postRepository.GetPostAsync(postId);
            
            return Ok(post);
        }

        /// <summary>
        ///     Adds a user to the system and generates a JWT token for the user
        /// </summary>
        /// <param name="post">A User object.</param>
        /// <returns></returns>
        [HttpPost("/api/v1/posts/add")]
        public async Task<ActionResult> AddPost([FromBody] Post post)
        {
            Console.WriteLine(post); 
            Dictionary<string, string> errors = new Dictionary<string, string>();
            if (post.Title.Length < 3)
            {
                errors.Add("title", "Your title must be at least 3 characters long.");
            }
            if (post.Contents.Length < 20)
            {
                errors.Add("contents", "Your contents must be at least 20 characters long.");
            }
            if (errors.Count > 0)
            {
                return BadRequest(new { error = errors });
            }
            var response = await _postRepository.AddPostAsync(post.Title, post.Contents, post.Author, post.Preview);
            
           
            //return result.User != null ? Ok(new UserResponse(result.User)) : Ok(result);
            return response.Post != null ? Ok(new PostResponse(response.Post)) : Ok(response);
        }

 
        
        /// <summary>
        ///     Returns a post
        /// </summary>
        /// <param name="postId">The email of the user to return.</param>
        /// <returns></returns>
        [HttpGet("/api/getposts")]
        public async Task<ActionResult> GetAll()
        {
            var post = await _postRepository.GetAllPostsAsync();
            
             return Ok(post);
        }
        
        /// <summary>
        ///     Adds a user to the system and generates a JWT token for the user
        /// </summary>
        /// <param name="id">A User id.</param>
        /// <returns></returns>
        [HttpPost("/api/v1/posts/delete")]        
        public async Task<ActionResult> DeletePost([FromBody] Post post)
        {  
                  
           
            return Ok(await _postRepository.DeletePostAsync(post.Id));

        }




    }


}
