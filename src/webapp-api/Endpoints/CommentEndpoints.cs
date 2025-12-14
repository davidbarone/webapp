public static class CommentEndpoints
{
    public static void RegisterCommentEndpoints(this IEndpointRouteBuilder routeBuilder)
    {
        routeBuilder.MapPost("/comments", (Comment comment, IDataStore dataStore) =>
        {
            var next = dataStore.Insert<Comment>(comment);
            return Results.Ok(next);
        })
        .WithOpenApi()
        .WithTags("Comments");

        routeBuilder.MapGet("/comments", (int postId, IDataStore dataStore) =>
        {
            var comments = dataStore
                .Get<Comment>()
                .Where(c => c.PostId.Equals(postId))
                .OrderByDescending(c => c.CreatedDt);
            return Results.Ok(comments);
        })
        .WithOpenApi()
        .WithTags("Comments");
    }
}