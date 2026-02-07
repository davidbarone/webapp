# webapp
A full stack web/api reference application (2025/2026 edition).

- [webapp](#webapp)
- [To Open / Run webapp](#to-open--run-webapp)
- [Key design decisions](#key-design-decisions)
  - [Full Stack Architecture](#full-stack-architecture)
  - [Data Layer](#data-layer)
  - [API Layer](#api-layer)
  - [UI Layer](#ui-layer)
  - [Additional Design Decisions](#additional-design-decisions)
- [Tooling / Libraries / Frameworks](#tooling--libraries--frameworks)
  - [Node](#node)
  - [.NET Core](#net-core)
  - [VSCode](#vscode)
    - [Settings.json](#settingsjson)
- [Data Model](#data-model)
  - [Post Entity](#post-entity)
  - [Comment Entity](#comment-entity)
- [webapp-api](#webapp-api)
  - [Initialisation](#initialisation)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
    - [/Configuration/Api.Settings.cs](#configurationapisettingscs)
    - [/Configuration/appsettings.Development.json](#configurationappsettingsdevelopmentjson)
    - [/Configuration/appsettings.json](#configurationappsettingsjson)
    - [Program.cs (excerpt)](#programcs-excerpt)
  - [The Data Layer](#the-data-layer)
    - [/Modules/Data/IIdentifiable.cs](#modulesdataiidentifiablecs)
    - [/Modules/Data/Identifiable.cs](#modulesdataidentifiablecs)
    - [/Modules/Data/IDataStore.cs](#modulesdataidatastorecs)
    - [JsonDataStore.cs](#jsondatastorecs)
  - [The Model Layer](#the-model-layer)
    - [/Models/Post.cs](#modelspostcs)
    - [/Models/Comment.cs](#modelscommentcs)
  - [Endpoints](#endpoints)
    - [/Endpoints/AdminEndpoints.cs](#endpointsadminendpointscs)
    - [/Endpoints/PostEndpoints.cs](#endpointspostendpointscs)
    - [/Endpoints/CommentEndpoints.cs](#endpointscommentendpointscs)
  - [Configuration of Program.cs](#configuration-of-programcs)
    - [CORS](#cors)
      - [/Program.cs](#programcs)
    - [/Program.cs](#programcs-1)
- [webapp-ui](#webapp-ui)
  - [Project Structure](#project-structure-1)
    - [A note on where to put files](#a-note-on-where-to-put-files)
  - [Vite Configuration](#vite-configuration)
    - [/vite.config.js](#viteconfigjs)
  - [Prettier and ESLint](#prettier-and-eslint)
    - [/eslint.config.mjs](#eslintconfigmjs)
    - [/.prettierrc.json](#prettierrcjson)
    - [/.prettierignore](#prettierignore)
    - [/package.json](#packagejson)
    - [VSCode settings (settings.json)](#vscode-settings-settingsjson)
    - [ESLint / Prettier Summary](#eslint--prettier-summary)
  - [CSS Modules](#css-modules)
  - [JSX Support](#jsx-support)
    - [/js/lib/createElement.js](#jslibcreateelementjs)
    - [/js/lib/createFragment.js](#jslibcreatefragmentjs)
    - [/tsconfig.json](#tsconfigjson)
    - [/src/main.ts](#srcmaints)
  - [Routing](#routing)
    - [/src/js/lib/router.tsx](#srcjslibroutertsx)
  - [Reactivity and Components](#reactivity-and-components)
    - [/src/js/lib/reactive.js](#srcjslibreactivejs)
    - [/src/js/lib/component.tsx](#srcjslibcomponenttsx)
    - [Widgets](#widgets)
  - [Environment Variables](#environment-variables)
    - [/src/js/lib/environment.js](#srcjslibenvironmentjs)
  - [Api Integration](#api-integration)
    - [/src/js/lib/httpWrapper.ts](#srcjslibhttpwrapperts)
  - [Set up Default App Structure Using TS + JSX](#set-up-default-app-structure-using-ts--jsx)
    - [/src/assets/logo.png](#srcassetslogopng)
    - [/src/css/style.css](#srccssstylecss)
    - [/src/index.html](#srcindexhtml)
    - [/src/js/app.tsx](#srcjsapptsx)
    - [Page Layout Widgets](#page-layout-widgets)
  - [Environment Variables (Dev, Prod)](#environment-variables-dev-prod)
  - [Other Items](#other-items)
    - [Coding Standards](#coding-standards)
  - [Testing](#testing)
- [Full Debug using Visual Studio Code](#full-debug-using-visual-studio-code)
  - [/webapp.code-workspace](#webappcode-workspace)
- [Screenshots](#screenshots)
  - [Viewing all posts:](#viewing-all-posts)
  - [View / edit individual post](#view--edit-individual-post)
- [Links](#links)

Modern web development is complicated. There are a million ways to skin a cat, and the average developer has to worry about many design decisions before they evey start to code. This project is an attempt to capture all my personal design decisions into a single place, so I can easily spin up new web projects when needed.

This project began a couple of years ago and was based on a .NET API layer and a React SPA UI. Today, with the improvements of using vanilla js, and the advancement of standard browser APIs, I have decided to update this reference architecture to use vanilla js where possible.

This reference application demonstrates a very basic blog site. The site allows blog posts to be created, edited and deleted. There is also the facility to add comments onto posts.

# To Open / Run webapp
Open `webapp.code-workspace` using VSCode. Click on the **Run** toolbar icon, and select & run `Launch API + UI (workspace)`. This will launch the API and the UI in development mode.

# Key design decisions
I wrote this reference application with several design decisions in mind:

## Full Stack Architecture
The application should comprise of:
- Data / storage layer: Using Dbarone.Net.JsonDataStore - a simple Json data store
- API layer: Using .NET minimal API pattern
- UI layer: Vanilla Javascript

## Data Layer
Dbarone.Net.JsonDataStore is another of my projects. It's a simple Json data store that uses collections (which are like tables). This project is lightweight and good for small projects and prototypes like this. You can find out more here: https://github.com/davidbarone/Dbarone.Net.JsonDataStore.

## API Layer
The API layer uses the .NET minimal API pattern. This moves away from the traditional approach using controller classes. The minimal API pattern is ideal for smaller projects and prototypes.

## UI Layer
The UI layer is written in Vanilla JS where possible. I've decided to go with using the Vite server as this appears to be a new up and coming lightweight web server and build tool.

## Additional Design Decisions
I've made the additional design decisions for this project:
- 100% API driven - server functionality should be in separate project (normally .NET Core web-api)
- Web UI layer to be 100% javascript application
- Use standard modern node build chain, but keep to core well-used tools. I've tried to keep external dependencies down to a minimum.
- Use of TypeScript where possible to get better type checking support over js.
- Use of JSX instead of writing HTML in strings. TypeScript offers native support of JSX.
- Using components / widgets when writing the UI. All modern web development uses some form of components, or uses a component library like React or Vue.
- Data Binding using native js tooling
- CSS Modules - when building a web site using components, you want to make sure that you can style components individually, and not have that styling bleed outside that component. CSS Modules does this for you.
- Testing - the API and UI layers should both have unit tests.
  - XUnit for the API / server
  - Jest for UI
- Automatic linting - this should be a given.
- Automatic prettier / formatting - this should also be a given.
- Tooling - I'm going with VS Code as my development environment
- Build & debugging features - I want all the modern development and debugging options too, for example:
  - Hot module loading (HML)
  - Debugging

# Tooling / Libraries / Frameworks
The following base tools comprise my development toolchain:

## Node
Note is required for the UI build environment, and to provide additional development tooling.

## .NET Core
.NET Core is the runtime environment used for the API layer.

## VSCode
VSCode is my editor of choice. In addition, the following extensions are added:
- C#: ms-dotnettools.csharp
- C# Dev Kit: ms-dotnettools.csdevkit
- ESLint: dbaeumer.vscode-eslint
- Markdown All in One: yzhang.markdown-all-in-one
- Prettier: esbenp.prettier-vscode
- REST Client: humao.rest-client

### Settings.json
The VSCode settings needs to be updated to work seamlessly with Prettier:
``` json
{
  "prettier.configPath": ".prettierrc.json",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "eslint.enable": true,

  // Set the VSCode prettier extension to use single quotes
  // so doesn't conflict with the prettier script / npm package.
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "omnisharp.useEditorFormattingSettings": false,
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "csharp.experimental.debug.hotReload": true,
  "editor.formatOnType": true,
  "[csharp]": {
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "ms-dotnettools.csharp",
    "editor.formatOnType": true
  },
  "omnisharp.loggingLevel": "debug",
  "workbench.editor.enablePreview": false,
  "workbench.colorTheme": "Visual Studio 2019 Dark",

  "editor.tabSize": 2,
  "editor.stickyTabStops": true,
  "workbench.editor.empty.hint": "hidden"
}
```

# Data Model
Before starting with any code, the data model must be defined. The reference application is a simple blog site, and the following data model will be used:

## Post Entity
The post entity stores information about posts:

| Column Name | Data Type | Constraints  | Description                        |
| ----------- | --------- | ------------ | ---------------------------------- |
| Id          | int       | PK, not null | Primary key                        |
| Slug        | varchar   | not null     | Slug (used for concise urls)       |
| Teaser      | varchar   |              | Short teaser for post              |
| Content     | varchar   |              | Content of post                    |
| Author      | varchar   | not null     | Author of the post                 |
| CreatedDt   | DateTime  | not null     | The date/time the post was created |

## Comment Entity
The comment entity stores comments for posts. To keep things simple, I've limited comments to only be allowed on posts. Comments cannot be written on other comments.

| Column Name | Data Type | Constraints  | Description                        |
| ----------- | --------- | ------------ | ---------------------------------- |
| Id          | int       | PK, not null | Primary key                        |
| PostId      | int       | FK, not null | FK to post table                   |
| Commenter   | varchar   | not null     | Name of commenter                  |
| Content     | varchar   |              | Content of comment                 |
| CreatedDt   | DateTime  | not null     | The date/time the post was created |

# webapp-api

## Initialisation
The api layer was initialised using the following cli commands:

```
dotnet new webapi -n webapp-api
cd webapp-api
dotnet add package Dbarone.Net.JsonDataStore
```

This creates a new webapi, and also includes the Dbarone.Net.JsonDataStore package used for data persistence.

## Project Structure
I've gone with the following project structure for the API:

``` text
├── api/
    ├── bin/                          # outputs / binaries
    |── Endpoints/                    # Endpoints (minimal api) 
    |── Models/                       # model classes 
    |── Modules/                      # Modules / plugins to other frameworks 
    |   ├── Configuration/            # Configuration classes 
    |   ├── Data/                     # Data layer classes 
    ├── appsettings.Development.json  # The development application settings
    ├── appsettings.json              # The production application settings
    └── program.cs                    # The entry point
```

## Configuration
Development and production environments often require different configurations, for example connection information to databases. The ability to configure development and production environments has been configured using custom configuration classes as follows:

### /Configuration/Api.Settings.cs
This file models the custom configuration settings
``` cs
/// <summary>
/// Api settings stored in appsettings json file(s).
/// </summary>
public class ApiSettings
{
    /// <summary>
    /// Path to data file.
    /// </summary>
    public string DataPath { get; set; } = default!;

    /// <summary>
    /// Name of the Api.
    /// </summary>
    public string Name { get; set; } = default!;

}
```

### /Configuration/appsettings.Development.json
This file stores the development version of the settings
``` json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ApiSettings": {
    "DataPath": ".\\webapp.json",
    "Name": "Webapp-api (DEV)"
  }
}
```

### /Configuration/appsettings.json
This file stores the production version of the settings.
``` json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ApiSettings": {
    "DataPath": ".\\webapp.json",
    "Name": "Webapp-api"
  },
  "AllowedHosts": "*"
}
```

### Program.cs (excerpt)
Add these lines into the `Program.cs` file to configure the api settings
``` cs
var builder = WebApplication.CreateBuilder(args);

// Configuration: Bind ApiSettings and add it to the services collection
builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection("ApiSettings"));
```

## The Data Layer
The data layer is implemented using Dbarone.Net.JsonDataStore. This is a lightweight database that uses a single json file to store data. It supports:
- Multiple tables (known as collections)
- Basic transaction support
- In-memory or file-based storage
- Optional encryption of data file
- Simple constraints (unique key, not null, foreign key)

The data layer is constructed as follows:

### /Modules/Data/IIdentifiable.cs
This interface represents an entity that has an Id property.
``` cs
public interface IIdentifiable
{
    int Id { get; init; }
}
```

### /Modules/Data/Identifiable.cs
Base class for all identifiable model classes
``` cs
public abstract record Identifiable : IIdentifiable
{
    public abstract int Id { get; init; }
}
```

### /Modules/Data/IDataStore.cs
Interface for a repository class implementing basic CRUD operations.
``` cs
public interface IDataStore
{
    object GetContext(bool create = false);

    int Next<T>() where T : Identifiable;

    int Insert<T>(T row) where T : Identifiable;

    void Update<T>(int id, T row) where T : Identifiable;

    void Delete<T>(int id) where T : Identifiable;

    IEnumerable<T> Get<T>() where T : Identifiable;

    T? GetById<T>(int id) where T : Identifiable;
}
```

### JsonDataStore.cs
Implementation of CRUD datastore.
``` cs
using System.Security;
using Dbarone.Net.JsonDataStore;
using Microsoft.Extensions.Options;

public class JsonDataStore : IDataStore
{
    string DataPath { get; set; }
    public JsonDataStore(IOptions<ApiSettings> apiSettings)
    {
        this.DataPath = apiSettings.Value.DataPath;
    }

    public object GetContext(bool create = false)
    {
        if (create)
        {
            return DataStore.Create(DataPath, "", false);
        }
        else
        {
            return DataStore.Open(DataPath, "", false);
        }
    }
    public int Next<T>() where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var next = t.Next<T>();
        t.Commit();
        store.Save(false);
        return next;
    }

    /// <summary>
    /// Gets the next id, and Inserts a new record.
    /// </summary>
    /// <typeparam name="T">The record type.</typeparam>
    /// <param name="row">The record to insert. The Id is generated.</param>
    /// <returns>Returns the Id generated for the record.</returns>
    public int Insert<T>(T row) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        // get new id for insert
        int next = t.Next<Article>();
        var coll = t.GetCollection<T>();
        var toInsert = row with { Id = next };
        coll.Insert(toInsert);
        t.Commit();
        store.Save(false);
        return next;
    }

    /// <summary>
    /// Updates a record.
    /// </summary>
    /// <typeparam name="T">The record type.</typeparam>
    /// <param name="row">The record to update..</param>
    public void Update<T>(int id, T row) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        var toUpdate = row with { Id = id };

        coll.Update(r => r.Id.Equals(id), r => toUpdate);

        t.Commit();
        store.Save(false);
    }

    /// <summary>
    /// Deletes a record.
    /// </summary>
    /// <typeparam name="T">The record type.</typeparam>
    /// <param name="row">The record id to delete.</param>
    public void Delete<T>(int id) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        coll.Delete(r => r.Id.Equals(id));
        t.Commit();
        store.Save(false);
    }

    public IEnumerable<T> Get<T>() where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        t.Commit();
        store.Save(false);
        return coll.AsList;
    }

    public T? GetById<T>(int id) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        t.Commit();
        store.Save(false);
        return coll.AsList.FirstOrDefault(i => i.Id == id);
    }
}
```

## The Model Layer
The model layer defines 2 model classes:
- Post
- Comment 

### /Models/Post.cs
The posts model.
``` cs
record Post(
    int Id,
    string Slug,
    string? Teaser,
    string? Content,
    string Author,
    DateTime CreatedDt
    ) : Identifiable
{ }
```

### /Models/Comment.cs
The comments model
``` cs
record Comment(
    int Id,
    int PostId,
    string Commenter,
    string? Content,
    int? CommentId,
    DateTime CreatedDt
    ) : Identifiable
{ }
```

## Endpoints
The endpoints folder contains the endpoints for handling CRUD operations on posts and comments. The minimal api pattern is used rather than the more traditional controller class pattern.

### /Endpoints/AdminEndpoints.cs
This provides a single `init` endpoint which initialises a new database with a single dummy post and comment:
``` cs
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
```

### /Endpoints/PostEndpoints.cs
This defines CRUD endpoints for posts, allowing GET, create (POST), update (PUT) and delete (DELETE) operations.
``` cs
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
```

### /Endpoints/CommentEndpoints.cs
This creates endpoints for comments, allowing new comments to be created for a post, and existing comments for a post to be retrieved.
``` cs
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
```
## Configuration of Program.cs
The following additional configuration is required in the `Program.cs` file:

### CORS
In order to allow for cross object resource sharing (CORS), the following was added into `program.cs`

#### /Program.cs
``` cs
// CORS service - add before builder.build() line
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        // dev
        policy.WithOrigins("http://localhost:3000") // Replace with your website's URL
              .AllowAnyMethod() // Allow all HTTP methods
              .AllowAnyHeader(); // Allow all headers

        // prod
        policy.WithOrigins("https://example.com") // Replace with your website's URL
              .AllowAnyMethod() // Allow all HTTP methods
              .AllowAnyHeader(); // Allow all headers
    });
});

...
...

// Use the CORS policy - add before app.run() line
app.UseCors("AllowSpecificOrigin");
```

### /Program.cs
Additional configuration is shown below:
``` cs
// <Add the following line in the sections that builds services>
builder.Services.AddScoped<IDataStore, JsonDataStore>();

// <Add the following in the bottom section when configuring the app>
app.RegisterPostEndpoints();
app.RegisterCommentEndpoints();
app.RegisterAdminEndpoints();
```

# webapp-ui
The UI is built using vanilla js, and vite as the build tool. Vite is a build tool that provides a leaner development experience for modern web sites. You can read more about Vite here: https://vite.dev/guide/

A basic Vite site can be scaffolded with the following command:
```
npm create vite@latest
```

The following defaults were provided:
- Project Name: webapp-ui
- Framework: vanilla
- Variant: TypeScript
- Use rolldown-vite: No
- Install with npm and start now: Yes

The project can then be opened in VSCode, and run. The default Vite test app runs. The following additional configuration was then applied:

## Project Structure
I've gone with the following structure for the UI project:

Before starting, the overall project structure needs to be defined. I've ended up going with the following structure:

``` text
├── webapp-ui/              # Vanilla js project
    ├── dist/               # The output / compiled UI
    ├── node_modules/
    ├── src/
    │   ├── assets/         # Static assets (images etc)
    │   │   ├── logo.png    # Site image
    │   ├── css/            # Stylesheets
    │   │   ├── styles.css  # The global stylesheet
    │   ├── js/             # Scripts
    │   │   ├── components/ # web components
    │   │   ├── lib/        # Library / common functions and routines
    │   │   ├── routes/     # Routes
    │   │   ├── widgets/    # Function components
    │   └ index.html        # Main HTML file
    ├── README.md           # Project documentation
    ├── .gitignore          # Git ignore
    ├── .prettierignore     # Prettier ignore
    ├── .prettierrc.json    # Prettier configuration
    ├── .eslint.config.mjs  # ESLint config
    ├── package-lock.json   # package-lock file
    ├── package.json        # package settings
    ├── tsconfig.json       # TypeScript config
    └── vite.config.js      # Vite config
```

### A note on where to put files
There are always arguments on where to put files. Do you group files by file type (e.g. put all css files together), or do you put files close to each other based on functionality. My approach is as follows:
- Componentisation is the main driver. Split the application into components, and where possible put all files relating to a component together in the same folder (for example, .tsx file, .css files)
- PropType definitions should be saved with the component or widget they belong to
- API server routes should be saved in the same folder as the route. For example, if you have a `Posts` route which displays all the posts, there should be:
  - postsRoute.tsx: This is the Posts UI component
  - postsHttp.ts: This defines the posts server routes to the API
  - api.types.js: This defines any custom types used by the API
- However, there are exceptions to this:
  - For global code (e.g. site.css), this should go into a separate /css folder
  - If there are TypeScript types that are used by several components, put these types into a shared /types folder
  - if there are http API calls used by multiple components, put these into a shared /server folder.

## Vite Configuration

### /vite.config.js
The following `vite.config.js` was added into the root folder:
``` js
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    port: 3000, // Change the development server port
  },
  root: 'src',
  build: {
    outDir: '../dist', // Specify the output directory
  },
  resolve: {
    alias: {
      '@root': resolve(__dirname, './src'), // Alias for the src / root folder
    },
  },
});
```
Notes:
- Sets the default src folder
- Sets the default dist folder
- Adds an alias of `@root` to allow clean paths to be used in imports, instead of relative paths

## Prettier and ESLint
Prettier and ESLint are vital to ensure consistent code quality and style is maintained through the code base. Prettier and ESLint were installed and configured as follows:

```
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import
```

### /eslint.config.mjs
This file configures the ESLint rules:
``` js
import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: ['error', 'single'],
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
    },

    // Note: there should be no other properties in this object
    ignores: ['dist/**', 'node_modules/**'],
  },
]);
```

### /.prettierrc.json
This file configures the Prettier rules:
``` js
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5",
  "endOfLine": "auto"  
}
```

### /.prettierignore
This file defines the directories that Prettier should ignore:
```
node_modules
dist
```

### /package.json
The following scripts were added to automate linting and formatting:
``` json
"scripts": {
    "lint": "eslint . --ext .js,.ts",
    "lint-fix": "eslint . --ext .js,.ts --fix",
    "prettier": "prettier --config .prettierrc.json 'src/**/*.{ts,tsx,js}'",
    "prettier-fix": "prettier --config .prettierrc.json 'src/**/*.{ts,tsx,js}' --write"
}
```

### VSCode settings (settings.json)
To configure VSCode to use Prettier for formatting, open VSCode settings `Ctrl + ,` then click the **Open Settings (JSON)** option in the top right corner. Ensure you have the following settings set:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.singleQuote": true
}
```

### ESLint / Prettier Summary
At this point, you should have a working demo app with Prettier formatting and ESLinting. You can run the following npm scripts:
- npm run dev: Runs the web app in development mode
- npm run build: Builds the web app and puts build files into /webapp-ui/dist folder
- npm run preview: Starts a web server that serves the built solution from /webapp-ui/dist
- npm run lint: Runs the lint rules over the web app
- npm run lint-fix: Runs the lint rules and fixes where possible
- npm run format: Runs the Prettier rules and auto-fixes 

For more information:
- https://eslint.org/docs/user-guide/getting-started

To see all the ESLint rules (and which ones are enabled by default):
- https://eslint.org/docs/rules/

## CSS Modules
CSS modules allow you to add local CSS files to each of your components without the worry of styles bleeding outside of your component. To setup:
```
npm install --save-dev typed-css-modules
```

Then add following to scripts to automatically watch for changes:
```
"scripts": {
  "css-types": "tcm src --watch"
}
```

When you run `npm run css-types`, this will scan your source for any scoped css module files (These must be have file name ending in .module.css) and create TypeScript type files. You can then import the css file into your components, and TypeScript will provide auto-complete for style class selector names.

Notes:
- When referencing classes, use `class={styles.nameofclass}` syntax instead of `className={styles.nameofclass}` This is because we're using the dom class attribute directly instead of React's virtual dom.

## JSX Support
When building html content, using html strings everywhere is error-prone. JSX is a domain-specific language that enables developers to write HTML elements directly within their JavaScript code. JSX is primarily used in React, but TypeScript supports JSX too.

JSX compiles to JavaScript function calls like `createElement` that produce DOM elements. This means that JSX can be type-checked and syntax-checked at compile time. A great advantage over HTML strings.

In order to use JSX, we need to implement a custom createElement function. The following configuration was required to implement JSX:

### /js/lib/createElement.js
This is a custom `createElement` function to convert JSX into createElement() JavaScript function calls. The script also registers the function into the window object, so that it can be referenced later.
``` js
function createElement(tag, props, ...children) {
  if (typeof tag === 'function') {
    // Handle custom components - e.g. createFragment
    return tag({ ...props, children });
  } else {
    const el = document.createElement(tag);

    for (const key in props) {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        el.addEventListener(key.substring(2).toLowerCase(), props[key]);
      } else {
        el.setAttribute(key, props[key]);
      }
    }

    children.flat().forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    });

    return el;
  }
}

// Register on window object
window.createElement = createElement;
```

### /js/lib/createFragment.js
JSX requires a single root element. If you are creating a component with multiple elements at the root, one option is to create an extra `div` element to wrap them. However, another approach is to use the JSX fragment syntax (`<>...</>`). This allows the developer to have multiple elements at the root, without the need to create an enclosing element to group them. To implement JSX fragments (note this also registers the function into the window object):
``` js
// fragment.ts
export function createFragment({ children }) {
  console.log(children);
  const frag = document.createDocumentFragment();
  for (const child of children.flat()) {
    if (Array.isArray(child)) {
      child.forEach((c) =>
        frag.append(c instanceof Node ? c : document.createTextNode(String(c)))
      );
    } else {
      frag.append(
        child instanceof Node ? child : document.createTextNode(String(child))
      );
    }
  }
  return frag;
}

// Register on window object
window.createFragment = createFragment;
```

### /tsconfig.json
The TypeScript configuration file configures the 2 custom JSX functions. Note the following:
- jsx: set to 'react'
- jsxFactory: set to 'window.createElement'
- jsxFragmentFactory: set to 'window.createFragment'
- compilerOptions.paths: Note a path alias of `@root` is defined. This is so we can reference any files cleanly from the /src folder using `@root/...` syntax instead of relative paths.
``` js
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@root/*": ["src/*"]
    },
    "target": "ES2022",
    "jsx": "react",
    "jsxFactory": "window.createElement",
    "jsxFragmentFactory": "window.createFragment",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "skipLibCheck": true,
    "allowJs": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noImplicitAny": false,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

### /src/main.ts
The 2 functions above are imported to ensure they are registered:
``` js
import '@root/js/lib/createElement.js';
import '@root/js/lib/createFragment.js';
```

## Routing
Routing is the mechanism on a single page application (SPA) that allows users to navigate through different views or pages within a single page app.

A simple routing technique is called hash routing. This works by appending a hash fragment to the url, for example: `example.com/#/about`. This was implemented using a `router.tsx` import:

### /src/js/lib/router.tsx
Router file. The routes are passed in to the router function as a dictionary of string, function objects.
``` js
/*
router.js

A very simple hash-based router for SPA apps
using window.location.hash. To use:
1. Create functions in /routes directory
   for each route
2. Import this module into main.jsx
3. Add anchor links into index for each page

Note that you need to include each of the
routes in the router.js page. Check the
routes dictionary.
*/

type StringFunctionDictionary = {
  [key: string]: (...args: any[]) => any;
};

export function router(routes: StringFunctionDictionary) {
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const h = isNullOrEmpty(location.hash) ? '#/' : location.hash;
    const hash = parseRoute(h);
    render(hash, routes);
  });

  // Initial render
  window.addEventListener('DOMContentLoaded', () => {
    const h = isNullOrEmpty(location.hash) ? '#/' : location.hash;
    const hash = parseRoute(h); //location.hash.slice(1) || '/';
    render(hash, routes);
  });
}

// Render function: updates #app content
function render(route, routes) {
  const app = document.getElementById('route');
  if (app !== null) {
    if (route.length === 1) {
      // no parameters
      const view = routes[`/${route}`] || NotFound;
      app.innerHTML = ''; //clear
      app.appendChild(view());
    } else {
      // parameter is included
      console.log(route);
      const id = parseInt(route[1]);
      const view = routes[`/${route[0]}/:id`] || NotFound;
      console.log(view);
      console.log(id);
      app.innerHTML = ''; //clear
      app.appendChild(view(id));
    }
  }
}

function parseRoute(hash) {
  console.log(hash);
  const parts = hash.split('/').slice(1); // remove '#' and split
  console.log(parts);
  return parts;
}

// Fallback view for unknown routes
function NotFound() {
  return '<h1>404 - Page Not Found</h1>';
}

const isNullOrEmpty = function (str: string) {
  return (
    str === null || // null
    str === undefined || // undefined
    (typeof str === 'string' && str.trim().length === 0) // empty or whitespace
  );
};
```

## Reactivity and Components
Modern UI frameworks provide reactivity and components.

Reactivity is the mechanism where the user interface automatically updates when the app state changes. This frees up the developer to focus on the app's state instead of having to manually manage state of all the visual elements in a page.

Components are reusable building blocks used to construct user interfaces. Components simplify the development process by allowing the developer to create reusable elements that can be used multiple times in a web project.

Reactivity and components are two key elements that enable developer productivity and improve overall application robustness in modern web applications. All the modern frameworks have reactivity and components as core parts of their framework.

Native Javascript supports a basic version of web components: https://developer.mozilla.org/en-US/docs/Web/API/Web_components. This consists of 3 main technologies:
- Custom elements
- Shadow DOM
- HTML templates

### /src/js/lib/reactive.js
Provides a simpler reactivity model using getter and setters and a subscriber model:
``` js
export function reactiveProxy(data) {
  const subscribers = new Set();

  const proxy = new Proxy(data, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      subscribers.forEach((fn) => fn(prop, value));
      return true;
    },
  });

  proxy.subscribe = (fn) => subscribers.add(fn);
  proxy.unsubscribe = (fn) => subscribers.delete(fn);

  return proxy;
}

//https://dev.to/arnavk-09/simplest-reactivity-in-web-pages-using-vanilla-javascript-5ekp
export function reactiveValue(initialValue) {
  let value = initialValue;
  const subscribers = [];

  this.get = function get() {
    return value;
  };

  this.set = function set(newValue) {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach((subscriber) => subscriber());
    }
  };

  this.subscribe = function subscribe(subscriber) {
    subscribers.push(subscriber);
  };

  //return { get, set, subscribe };
}

export function reactiveExpression(fn, ...values) {
  const result = fn(...values.map((value) => value.get()));
  const dependencies = values.filter(
    (value) =>
      (value instanceof reactiveValue) | (value instanceof reactiveExpression)
  );
  const rv = new reactiveValue(result);

  // subscribe to the dependencies, and update the expression
  // whenever one or more of them change.
  dependencies.forEach((dependency) => {
    let a = rv;
    dependency.subscribe(() => {
      // only set derived if all values are defined
      console.log(dependencies.map((v) => v.get()));
      if (!dependencies.some((item) => item.get() === undefined)) {
        a.set(fn(...dependencies.map((value) => value.get())));
      }
    });
  });

  this.get = rv.get;
  this.set = rv.set;
  this.subscribe = rv.subscribe;
  //return rv;
}
```

### /src/js/lib/component.tsx
Provides a simple base class that can be used to create reusable components with reactivity:
``` tsx
import { reactiveValue, reactiveExpression } from '../lib/reactive';

export class Component extends HTMLElement {
  #props: Array<string> = [];

  constructor() {
    super();

    // Attach a shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  get props(): Record<string, any> {
    return this.#props;
  }

  propNames: string[] = Component.observedAttributes;

  static get observedAttributes(): string[] {
    return [];
  }

  attributeChangedCallback(name: string): void {
    // update the props object
    const value = this.getAttribute(name);

    // if name does not exist, create a new reactiveValue
    // otherwise, set the value.
    if (!(name in this.#props)) {
      this.#props[name] = new reactiveValue(null); // Assign a default value (e.g., null)
      this.#props[name].subscribe(this.renderInternal.bind(this));
    }
    this.#props[name].set(value);
    this.renderInternal();
  }

  connectedCallback() {
    this.onLoad();

    // Render content when the element is connected to the DOM
    this.renderInternal();
  }

  onLoad = () => {};

  renderInternal() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(this.render());
    }
  }

  render(): any {
    return null;
  }

  getReactiveValue(value): reactiveValue {
    const r = new reactiveValue(value);
    r.subscribe(this.renderInternal.bind(this));
    return r;
  }

  getReactiveExpression(fn, ...values): reactiveExpression {
    const r = new reactiveExpression(fn, ...values);
    r.subscribe(this.renderInternal.bind(this));
    return r;
  }
}
```

### Widgets
The `Component` class above can be used to build components. This uses the Web Component framework. This comes with some downsides:
- Forced to use classes - A result of using the Shadow DOM technology is that styles cannot be easily inherited in components. Whilst this is the intention (i.e. styles should be contained within a component), there are often needs for styling to be inherited downwards. After all, the 'C' in CSS refers to 'cascading'.
- Forced to use classes to create custom elements - note that once custom elements have been created, you are not limited to classes to use them. Components can be injected within functions or anywhere else in your JavaScript code.

To provide an additional lightweight way to create components, I've added a `/widgets` folder. Widgets have the following in common:
- A widget generally exposes a single function which can be parameterised
- The widget generally returns an HTML DOM fragment in the form of JSX
- Widgets can use CSS Modules to scope styles. Widgets can also inherit styles from above, as they are not HTML Web Components, and have no ShadowDOM

Out of the box, I've created the following widgets

| Widget       | Purpose                               |
| ------------ | ------------------------------------- |
| appWidget    | The main entry point to the app.      |
| buttonWidget | Creates a simple button.              |
| footerWidget | Content for the footer of the app.    |
| formWidget   | Creates a form for editing an object. |
| headerWidget | Content for the header of the app.    |
| inputWidget  | Creates a form element.               |
| mainWidget   | Content for the main area of the app. |
| modalWidget  | Creates a modal popout.               |
| tableWidget  | Creates a table.                      |
| toastWidget  | Create a toast component.             |

## Environment Variables
The Vite framework supports environment variables via `.env` files (https://vite.dev/guide/env-and-mode). However, I've adopted to roll a simple DIY envionment variables approach:

### /src/js/lib/environment.js
This exports a single variable: `API_URL`:
``` js
const config = {
  development: {
    API_URL: 'http://localhost:5017/',
  },
  production: {
    API_URL: 'https://api.example.com/',
  },
};

// Automatically detect the environment
const ENV =
  window.location.hostname === 'localhost' ? 'development' : 'production';

export const API_URL = config[ENV].API_URL;
```

## Api Integration
In order to provide dynamic data for the web app, the app typically connects to an API. The API methods should be placed in a separate file and imported into the component file

### /src/js/lib/httpWrapper.ts
This file 

## Set up Default App Structure Using TS + JSX
At this point, the basic configuration is set up using ESLint, Prettier, typed CSS module support and JSX. We can now proceed to gut the demo app and place in our skeleton app using JSX.

### /src/assets/logo.png
This is the default site icon.

### /src/css/style.css
A default CSS file was added to /src/css/style.css. Note that no normalise.css or reset css is used, as modern browsers are generally consistent when it comes to CSS defaults.

### /src/index.html
The root page was updated to reference a new root tsx file: `app.tsx`:
``` html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>dbarone-ui-vanilla</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="js/app.tsx"></script>
  </body>
</html>
```

### /src/js/app.tsx
This is the Javascript entry point. This gets injected into the main div in the above HTML:
``` tsx
import '@root/css/style.css';
import './lib/createElement.js';
import './lib/createFragment.js';
import Header from '@root/js/widgets/header/header.tsx';
import Footer from '@root/js/widgets/footer/footer.tsx';
import Main from '@root/js/widgets/main/main.tsx';
import HomeRoute from '@root/js/routes/homeRoute';
import { type RouteRuleArray } from '@root/js/lib/router';

// Set up routing
const routes: RouteRuleArray = [
  { Name: 'Home', Path: '/', Handler: HomeRoute },
];

const x = (
  <div class="app">
    {Header(routes)}
    {Main(routes)}
    {Footer()}
  </div>
);

document.querySelector<HTMLDivElement>('#app')!.appendChild(x);
```

### Page Layout Widgets
The following can be found in the /src/js/widgets folder:
- header: Provides a simple header bar that disappears when the user scrolls down the page.
- main: The main content area. Uses routing to change the content based on the url path.
- footer: A simple footer bar. 

## Environment Variables (Dev, Prod)

## Other Items

### Coding Standards

General JavaScript coding standards:
- Google JavaScript style guide: https://google.github.io/styleguide/jsguide.html
- AirBnB JavaScript style guide: https://github.com/airbnb/javascript
- W3Schools JavaScript style guide: https://www.w3schools.com/js/js_conventions.asp

Filename conventions (React)
- https://github.com/airbnb/javascript/tree/master/react

Paradigms, Coding Standards:
- Clean Code (Robert C Martin): https://www.amazon.com/gp/product/0132350882/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0132350882&linkCode=as2&tag=brandonwoz-20&linkId=8af093cb2b8d9a87993f285341ff015a
- Clean Code (Ryan McDermott - focus on JavaScript): https://github.com/ryanmcdermott/clean-code-javascript

## Testing

# Full Debug using Visual Studio Code
The API (server) and web app (client) can both be run independently:
- API: `dotnet run` will launch the application from source code
- UI: `npm run dev` will start the development server, serving the web app to a browser

Instead of running each layer separately, both launches can be combined using Visual code workspace configuration:
1. Create a new workspace at the root of this project
2. Add root folders for api and ui projects
3. Add a `webapp.code-workspace` file. This contains sections for:
   1. tasks (includes the api build task)
   2. launch.configurations (includes 2 launch configurations - one for api and one for ui)
   3. launch.compounds (includes a compound configuration to run both projects)

To run the `build-api` task open the command palette and type `Tasks:Run Task` and select the `build-api` task.
To run the api + ui projects, just click the F5 run button and select `Launch API + UI`.

## /webapp.code-workspace
``` json
{
  "folders": [
    {
      "name": "root",
      "path": "."
    },
    {
      "name": "api",
      "path": "src/webapp-api"
    },
    {
      "name": "ui",
      "path": "src/webapp-ui"
    }
  ],
  "settings": {},
  "tasks": {
    "version": "2.0.0",
    "tasks": [
      {
        "label": "build-api",
        "command": "dotnet",
        "type": "process",
        "args": [
          "build",
          "${workspaceFolder:api}/webapp-api.csproj"
        ],
        "problemMatcher": "$msCompile"
      },
      {
        "label": "build-ui",
        "type": "shell",
        "command": "npm run dev",
        "options": {
          "cwd": "${workspaceFolder:ui}/src"
        },
        "isBackground": true,
        "problemMatcher": {
          "owner": "custom",
          "pattern": [
            {
              "regexp": ".",
              "file": 1,
              "location": 2,
              "message": 3
            }
          ],
          "background": {
            "activeOnStart": true,
            "beginsPattern": ".*",
            "endsPattern": "ready|compiled|running at|Local:"
          }
        }
      }
    ]
  },
  "launch": {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Launch API",
        "type": "coreclr",
        "request": "launch",
        "preLaunchTask": "build-api",
        "program": "dotnet",
        "args": [
          "run",
          "--project",
          "${workspaceFolder:api}/webapp-api.csproj"
        ],
        "cwd": "${workspaceFolder:api}/bin/debug/net8.0",
        "env": {
          "ASPNETCORE_ENVIRONMENT": "Development"
        }
      },
      {
        "name": "Launch UI",
        "preLaunchTask": "build-ui",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceFolder:ui}/src",
      }
    ],
    "compounds": [
      {
        "name": "Launch API + UI",
        "configurations": [
          "Launch API",
          "Launch UI"
        ]
      }
    ]
  }
}
```

# Screenshots
TO DO

## Viewing all posts:
![view posts](https://github.com/davidbarone/webapp/blob/main/images/webapp-1.png?raw=true)

## View / edit individual post
![edit post](https://github.com/davidbarone/webapp/blob/main/images/webapp-2.png?raw=true)

# Links
TO DO