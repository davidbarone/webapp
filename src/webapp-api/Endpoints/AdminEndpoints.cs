using Dbarone.Net.JsonDataStore;

public static class AdminEndpoints
{
  public static void RegisterAdminEndpoints(this IEndpointRouteBuilder routeBuilder)
  {
    routeBuilder.MapPost("/init", (IDataStore dataStore) =>
    {
      AdminEndpoints.Init(dataStore);
      return Results.Ok("Init() successful.");
    })
    .WithOpenApi()
    .WithTags("Admin");
  }

  private static void Init(IDataStore dataStore)
  {
    var store = (DataStore)dataStore.GetContext(true);
    var t = store.BeginTransaction();
    t.GetCollection<Post>();
    t.AddUniqueConstraint<Post>(p => p.Id);
    t.GetCollection<Comment>();
    t.AddUniqueConstraint<Comment>(c => c.Id);
    t.AddReferenceConstraint<Comment, Post>(c => c.PostId, p => p.Id);

    var posts = t.GetCollection<Post>();
    var postId = t.Next<Post>();
    posts.Insert(new Post(
      postId,
      "Lorem",
      "Lorem Ipsum",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "dbarone",
      DateTime.Now));

    var comments = t.GetCollection<Comment>();
    comments.Insert(new Comment(
      t.Next<Comment>(),
      postId,
      "dbarone",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      DateTime.Now
    ));

    t.Commit();
    store.Save(false);
  }
}