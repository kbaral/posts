using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ReactCore.Models;
using ReactCore.Models.Responses;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace ReactCore.Repositories
{
    public class PostsRepository
    {
       
        private readonly IMongoCollection<Post> _postsCollection;

        public PostsRepository(IMongoClient mongoClient)
        {
            var camelCaseConvention = new ConventionPack {new CamelCaseElementNameConvention()};
            ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

            _postsCollection = mongoClient.GetDatabase("react_core").GetCollection<Post>("posts");
            
        }
        /// <summary>
        ///     Finds a post in the `Posts` collection
        /// </summary>
        /// <param name="postId">The Email of the User</param>
        /// <param name="cancellationToken">Allows the UI to cancel an asynchronous request. Optional.</param>
        /// <returns>A User or null</returns>
        public async Task<IReadOnlyList<Post>> GetAllPostsAsync(CancellationToken cancellationToken = default)
        {
            // TODO Ticket: Post management
            // Retrieve the user document corresponding with the user's email.
            //
            var sortFilter = new BsonDocument("createdOn", -1);
            var post = await _postsCollection
                .Find(Builders<Post>.Filter.Empty)
                .Limit(10)
                .Skip(0)
                .Sort(sortFilter)
                .ToListAsync(cancellationToken);
            return post;
            //return null;
        }


        /// <summary>
        ///     Finds a post in the `Posts` collection
        /// </summary>
        /// <param name="postId">The Email of the User</param>
        /// <param name="cancellationToken">Allows the UI to cancel an asynchronous request. Optional.</param>
        /// <returns>A User or null</returns>
        public async Task<Post> GetPostAsync(string postId, CancellationToken cancellationToken = default)
        {
            // TODO Ticket: User Management
            // Retrieve the user document corresponding with the user's email.
            //
            var filter = Builders<Post>.Filter.Eq(m => m.Id, postId);           
            var post = await _postsCollection.Find(filter).FirstOrDefaultAsync();
            return post;
            //return null;
        }

        /// <summary>
        ///     Adds a user to the `users` collection
        /// </summary>
        /// <param name="title">The name of the user.</param>
        /// <param name="content">The email of the user.</param>
        /// <param name="author">The clear-text password, which will be hashed before storing.</param>
        /// <param name="cancellationToken">Allows the UI to cancel an asynchronous request. Optional.</param>
        /// <returns></returns>
        public async Task<PostResponse> AddPostAsync(string title, string content, string author, string preview,
            CancellationToken cancellationToken = default)
        {
            try
            {
                var post = new Post()
                {
                    Title = title,
                    Contents = content,
                    Preview = preview, 
                    Author = author,

                    CreatedOn = DateTime.Now

                };
               
                await _postsCollection.WithWriteConcern(WriteConcern.W1).InsertOneAsync(post);
                
                return new PostResponse(post);
            }
            catch (Exception ex)
            {
                return ex.Message.StartsWith("MongoError: E11000 duplicate key error")
                    ? new PostResponse(false, "A user with the given email already exists.")
                    : new PostResponse(false, ex.Message);
            }
        }

        public async Task<PostResponse> DeletePostAsync(string Id, CancellationToken cancellationToken = default)
        {
            try
            {
                 ObjectId objectId = ObjectId.Parse(Id);
                await _postsCollection.DeleteOneAsync(new BsonDocument("_id", objectId), cancellationToken);
               
                var deletedUser = await _postsCollection.FindAsync<Post>(new BsonDocument("_id", objectId),
                    cancellationToken: cancellationToken);
                if (deletedUser.FirstOrDefault() == null)
                    return new PostResponse(true, "Post deleted");
                return new PostResponse(false, "Post deletion was unsuccessful");
            }
            catch (Exception ex)
            {
                return new PostResponse(false, ex.ToString());
            }
        }

    }

    

}
