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
    public class CommentsRepository
    {
       
        private readonly IMongoCollection<Comment> _commentCollection;

        public CommentsRepository(IMongoClient mongoClient)
        {
            var camelCaseConvention = new ConventionPack {new CamelCaseElementNameConvention()};
            ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

            _commentCollection = mongoClient.GetDatabase("react_core").GetCollection<Comment>("comments");
            
        }
        /// <summary>
        ///     Finds a comment in the `Comments` collection
        /// </summary>
        /// <param name="comment">The Email of the User</param>
        /// <param name="cancellationToken">Allows the UI to cancel an asynchronous request. Optional.</param>
        /// <returns>all comments</returns>
        public async Task<IReadOnlyList<Comment>> GetAllCommentsAsync(CancellationToken cancellationToken = default)
        {
            
            var sortFilter = new BsonDocument("createdOn", -1);
            var comments = await _commentCollection
                .Find(Builders<Comment>.Filter.Empty)
                .Limit(10)
                .Skip(0)
                .Sort(sortFilter)
                .ToListAsync(cancellationToken);
            return comments;
            //return null;
        }


        /// <summary>
        ///     Finds a post in the `Comments` collection
        /// </summary>
        /// <param name="commentId">The Email of the User</param>
        /// <param name="cancellationToken">Allows the UI to cancel an asynchronous request. Optional.</param>
        /// <returns>A User or null</returns>
        public async  Task<IEnumerable<Comment>> GetCommentsForPostAsync(string postId, CancellationToken cancellationToken = default)
        {
           var sortFilter = new BsonDocument("createdOn", -1);
            var filter = Builders<Comment>.Filter.Eq(m => m.PostId, postId);           
            var comments = await _commentCollection
            .Find(filter)
            .Sort(sortFilter)            
            .ToListAsync(cancellationToken);

            return comments;
           
        }

        /// <summary>
        ///     Adds a user to the `users` collection
        /// </summary>
        /// <param name="title">The name of the user.</param>
        /// <param name="content">The email of the user.</param>
        /// <param name="author">The clear-text password, which will be hashed before storing.</param>
        /// <param name="cancellationToken">Allows the UI to cancel an asynchronous request. Optional.</param>
        /// <returns></returns>
        public async Task<CommentResponse> AddCommentAsync( Comment comment,
            CancellationToken cancellationToken = default)
        {
            try
            {
                comment.CreatedOn = DateTime.Now;
                await _commentCollection.WithWriteConcern(WriteConcern.W1).InsertOneAsync(comment);
                
                return new CommentResponse(comment);
            }
            catch (Exception ex)
            {
                return ex.Message.StartsWith("MongoError: E11000 duplicate key error")
                    ? new CommentResponse(false, "A user with the given email already exists.")
                    : new CommentResponse(false, ex.Message);
            }
        }

        public async Task<CommentResponse> DeleteCommentAsync(string Id, CancellationToken cancellationToken = default)
        {
            try
            {
                 ObjectId objectId = ObjectId.Parse(Id);
                await _commentCollection.DeleteOneAsync(new BsonDocument("_id", objectId), cancellationToken);
               
                var deletedUser = await _commentCollection.FindAsync<Post>(new BsonDocument("_id", objectId),
                    cancellationToken: cancellationToken);
                if (deletedUser.FirstOrDefault() == null)
                    return new CommentResponse(true, "Post deleted");
                return new CommentResponse(false, "Post deletion was unsuccessful");
            }
            catch (Exception ex)
            {
                return new CommentResponse(false, ex.ToString());
            }
        }

    }

    

}
