public static class PostEndpoints
{
    public static void RegisterPostEndpoints(this IEndpointRouteBuilder routeBuilder)
    {
        routeBuilder.MapPost("/posts", (Post post, IDataStore dataStore) =>
        {
            var next = dataStore.Insert<Post>(post);
            return Results.Ok(next);
        })
        .WithOpenApi()
        .WithTags("Posts");

        routeBuilder.MapGet("/posts", (IDataStore dataStore) =>
        {
            var posts = dataStore
                .Get<Post>()
                .OrderByDescending(p => p.CreatedDt);
            return Results.Ok(posts);
        })
        .WithOpenApi()
        .WithTags("Posts");

        routeBuilder.MapGet("/posts/{id:int}", (int id, IDataStore dataStore) =>
        {
            var post = dataStore.GetById<Post>(id);
            return Results.Ok(post);
        })
        .WithOpenApi()
        .WithTags("Posts");

        routeBuilder.MapPut("/posts/{id:int}", (int id, Post post, IDataStore dataStore) =>
        {
            dataStore.Update<Post>(id, post);
            return Results.Ok();
        })
        .WithOpenApi()
        .WithTags("Posts");

        routeBuilder.MapDelete("/posts/{id:int}", (int id, IDataStore dataStore) =>
        {
            dataStore.Delete<Post>(id);
            return Results.Ok();
        })
        .WithOpenApi()
        .WithTags("Posts");
    }
}