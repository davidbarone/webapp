# webapp
Full stack web/api reference application (2025 edition).

- [webapp](#webapp)
- [Key design decisions](#key-design-decisions)
- [Tooling / Libraries / Frameworks](#tooling--libraries--frameworks)
  - [Node](#node)
  - [.NET Core](#net-core)
  - [VSCode](#vscode)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
  - [Post Entity](#post-entity)
  - [Comment Entity](#comment-entity)
- [webapp-api](#webapp-api)
  - [Initialisation](#initialisation)
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
    - [/Program.cs](#programcs)
- [webapp-ui](#webapp-ui)
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
  - [Environment Variables](#environment-variables)
    - [/src/js/lib/environment.js](#srcjslibenvironmentjs)
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
- [Screenshots](#screenshots)
  - [Viewing all posts:](#viewing-all-posts)
  - [View / edit individual post](#view--edit-individual-post)
- [Links](#links)

Modern web development is complicated. There are a million ways to skin a cat, and the average developer has to worry about many design decisions before they evey start to code. This project is an attempt to capture all my personal design decisions into a single place, so I can easily spin up new web projects when needed.

This project began a couple of years ago and was based on a .NET API layer and a React SPA UI. Today, with the improvements of using vanilla js, and the advancement of standard browser APIs, I have decided to update this reference architecture to use vanilla js where possible.

This reference application demonstrates a very basic blog site. The site allows blog posts to be created and edited / deleted. There is also the facility to add comments onto posts.

# Key design decisions
- Full stack design
  - Web layer: Vanilla JS
    - Using Vite server
  - API layer: Minimal API using .NET / C#
    - API data storage layer: lightweight json server (https://github.com/davidbarone/Dbarone.Net.JsonDataStore)

The following additional design goals are also required:

- 100% API driven - server functionality should be in separate project (normally .NET Core web-api)
- Web UI layer to be 100% javascript application
- Use standard modern node build chain, but keep to core well-used 


- Use of TypeScript where possible to get better type checking support over js.
- Use of JSX (native support exists in TypeScript)
- Use of component library
- Data Binding using native js tooling
- CSS Modules
- Testing
  - xunit for server
  - Jest for UI
- Automatic linting
- Automatic prettier / formatting
- Tooling
  - VS Code for development environment
- Support for testing - both API testing and UI testing (using Jest)
- Build / debugging features:
  - Hot module loading (HML)
  - Debugging
  - Linting
  - Formatting

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

# Project Structure
Before starting, the overall project structure needs to be defined. I've ended up going with the following structure:

```
project
├── README.md                   # readme file
├── LICENSE                     # licence file
├── src/                        # source files
|   ├── webapp-api/             # C# api project
|   │   ├── Endpoints/          # Endpoints (minimal api) 
|   │   ├── Models/             # model classes 
|   │   ├── Modules/            # Modules / plugins to other frameworks 
|   │       ├── Configuration/  # Configuration classes 
|   │       ├── Data/           # Data layer classes 

|   │   └── program.cs      # Entry-point 
|   ├── webapp-ui/          # Vanilla js project
|   │   ├── node_modules/
|   │   ├── dist/
|   │   ├── src/
|   │       ├── index.html  # main entry page
|   │       ├── assets/     # static assets (img etc)
|   │       ├── css/        # site css
|
|   │       ├── js/
|   │            ├── lib/
|   │            ├── components/
|   │            ├── components/
|   │            ├── routes/
|   │            ├── widgets/


├── dist/

├── dist/
├── node_modules/
├── src/
│   ├── css/            # Stylesheet(s)
│   │   ├── styles.css  # Stylesheet(s)
│   ├── js/             # Script(s)
│   │   ├── components/ # web components(s)
│   │   ├── lib/        # Library / common
│   │   ├── routes/     # Route(s)
│   │   ├── widgets/    # Smaller static function component(s)
│   │   ├── main.tsx    # Top-level component
│   ├── public/         # Public resources (e.g. images)
│   │   ├── logo.png    # Site image
│   └ index.html        # Main HTML file
├── README.md           # Project documentation
├── .gitignore          # Git ignore
├── .prettierignore     # Prettier ignore
├── .eslint.config.mjs  # ESLint config
├── package-lock.json   # package-lock file
├── package.json        # package settings
├── tsconfig.json       # TypeScript config
└── vite.config.js      # Vite config
```

# Data Model
Before starting with any code, the data model must be defined. The following data model will be used:

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
The comment entity stores comments for posts. Furthermore, a comment can also be made against another comment

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

## Configuration
Development and production environments often require different configurations, for example connection information to databases. The ability to configure dev/prod environments has been configured as follows:

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

### /Program.cs
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
```
"scripts": {
    "lint": "eslint . --ext .js,.ts",
    "lint-fix": "eslint . --ext .js,.ts --fix",
    "format": "prettier --write ."}
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

## JSX Support
When building html content, using html strings everywhere is error-prone. JSX is a domain-specific language that enables developer to write HTML elements directly within their JavaScript code. JSX is primarily used in React, but TypeScript supports JSX too.

JSX compiles to JavaScript function calls like `createElement` that produce DOM elements. This means that JSX can be type-checked and syntax-checked at compile time. A great advantage over HTML strings.

The following configuration was required to implement JSX:

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

## Set up Default App Structure Using TS + JSX
At this point, the basic configuration is set up using ESLint, Prettier, typed CSS module support and JSX. We can now proceed to gut the demo app and place in our skeleton app using JSX.

### /src/assets/logo.png
This is the default site icon.

### /src/css/style.css
A default CSS file was added to /src/css/style.css. Note that no normalise.css or reset css is used, as modern browsers are generally consistent when it comes to CSS defaults. The following default CSS was used:
``` css
/* -----------------------------------------------
A SIMPLE CSS STYLESHEET BASED ON
SKELETON CSS (http://getskeleton.com/)
-------------------------------------------------- */

/* -----------------------------------------------
 Table of contents
--------------------------------------------------
- Base Styles
- Typography
- Links
- Icon Links
- Buttons
- Forms
- Modal Forms
- Definitions
- Lists
- Code / Pre
- Blockquote + cite
- Tables
- Tabbed dialog
- Spacing
- Utilities
- Misc
- Clearing
- Colors
- Page Elements
*/

/* -----------------------------------------------
 Base Styles
-------------------------------------------------- */

:root,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  font-family:
    Inter, ui-sans-serif, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: #3c3c43;
  overflow-y: scroll;
  line-height: 1.5;
  font-weight: 400;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
}

.route,
main {
  flex: 1 1;
}

/* ------------------------------------
 Typography
--------------------------------------- */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.4;
  color: rgb(61, 79, 93);
  margin: 0px;
}

h1 {
  font-size: 2em;
  letter-spacing: -0.05em;
}

h2 {
  font-size: 1.8em;
  letter-spacing: -0.05em;
}

h3 {
  font-size: 1.6em;
  letter-spacing: -0.05em;
}

h4 {
  font-size: 1.4em;
  letter-spacing: -0.025em;
}

h5 {
  font-size: 1.2em;
  letter-spacing: -0.025em;
}

h6 {
  font-size: 1em;
  letter-spacing: 0;
}

/* -----------------------------------
 Links
-------------------------------------- */

a {
  color: #456789;
  text-decoration: none;
}

a:hover {
  color: #123456;
}

/* -----------------------------------
 Icon Links
-------------------------------------- */

a.icon {
  border: solid 0.2em #ddd;
  padding: 0.2em;
  border-radius: 2em;
  cursor: pointer;
}

a.icon:hover {
  border: solid 0.2em;
  padding: 0.2em;
  border-color: steelblue;
  border-radius: 2em;
  cursor: pointer;
}

.clickable-content:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* ----------------------------------
 Buttons
------------------------------------- */

.button,
button,
input[type='submit'],
input[type='reset'],
input[type='button'] {
  display: inline-block;
  height: 30px;
  padding: 0 20px;
  color: #555;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 30px;
  /*letter-spacing: 0.1em;*/
  /*text-transform: uppercase;*/
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  /*background-color: white;*/
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.button:hover,
button:hover,
input[type='submit']:hover,
input[type='reset']:hover,
input[type='button']:hover,
.button:focus,
button:focus,
input[type='submit']:focus,
input[type='reset']:focus,
input[type='button']:focus {
  color: #333;
  background-color: #ccc;
  border-color: #888;
  outline: 0;
  transform: translateY(-0px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.button.primary,
button.primary,
input[type='submit'].primary,
input[type='reset'].primary,
input[type='button'].primary {
  color: #234567;
  background-color: rgb(153, 204, 255); /* #33C3F0; */
  border-color: transparent;
  border-width: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.button.primary:hover,
button.primary:hover,
input[type='submit'].primary:hover,
input[type='reset'].primary:hover,
input[type='button'].primary:hover,
.button.primary:focus,
button.primary:focus,
input[type='submit'].primary:focus,
input[type='reset'].primary:focus,
input[type='button'].primary:focus {
  transform: translateY(-0px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

/* ---------------------------------------------
 Forms
------------------------------------------------ */

input[type='email'],
input[type='number'],
input[type='search'],
input[type='text'],
input[type='checkbox'],
input[type='radio'],
input[type='tel'],
input[type='url'],
input[type='password'],
textarea,
select {
  min-height: 30px;
  min-width: 30px;
  padding: 1px 6px; /* The 1px vertically centers text on FF, ignored by Webkit */
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
}

input[type='checkbox'],
input[type='radio'] {
  min-height: 20px;
  min-width: 20px;
}

/* form elements in tables slightly condensed */
td > input[type='email'],
td > input[type='number'],
td > input[type='search'],
td > input[type='text'],
td > input[type='checkbox'],
td > input[type='radio'],
td > input[type='tel'],
td > input[type='url'],
td > input[type='password'],
td > textarea,
td > select {
  min-height: 20px;
}

textarea {
  min-height: 65px;
  padding: 4px 6px;
}

input[type='email']:focus,
input[type='number']:focus,
input[type='search']:focus,
input[type='text']:focus,
input[type='radio']:focus,
input[type='checkbox']:focus,
input[type='tel']:focus,
input[type='url']:focus,
input[type='password']:focus,
textarea:focus,
select:focus {
  border: 1px solid #33c3f0;
  outline: 0;
}

/* readonly forms */
input[readonly] {
  background: #eee;
  color: #666;
}

form p {
  margin-top: 9px;
}

label,
legend {
  display: block;
  font-weight: 600;
}

fieldset {
  padding: 6px;
  border: 1px solid #ccc;
  border-width: 1px;
  border-radius: 4px;
  /*box-shadow: 12px 12px 5px #666;*/
}

input[type='checkbox'],
input[type='radio'] {
  display: inline;
}

form label {
  text-align: left;
}

/* v-align any text element immediately after radio button */
form input[type='radio'] + *,
form input[type='checkbox'] + * {
  line-height: 20px;
  vertical-align: top;
  padding-left: 6px;
  margin-right: 20px;
}

/* ---------------------------------------------
 Modal Forms
------------------------------------------------ */

.modal {
  /*display: none; */ /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* ---------------------------------------------
 definitions
------------------------------------------------ */

dl {
  border: 3px double #ccc;
  padding: 0.5em;
}

dl * {
  display: none;
  float: left;
}

dl:after {
  content: '';
  display: table;
  clear: both;
}

dt {
  visibility: visible;
  width: 25%;
  text-align: right;
  font-weight: bold;
  display: inline-block;
  color: rgb(61, 79, 93);
  box-sizing: border-box;
  padding-right: 3px;
  margin: 0px;
}

dt:after {
  content: ':';
}

dd {
  visibility: visible;
  width: 75%;
  text-align: left;
  display: inline-block;
  box-sizing: border-box;
  padding-left: 3px;
  margin: 0px;
}

/* ---------------------------------------------
 Lists
------------------------------------------------ */

ul {
  list-style: disc inside;
}

ol {
  list-style: decimal inside;
}

ol,
ul {
  padding-left: 0;
  margin-top: 0.5em;
}

ul ul,
ul ol,
ol ol,
ol ul {
  margin: 0.5em 0 0.5em 3em;
  font-size: 90%;
}

li {
  margin-bottom: 0.25em;
}

/* ---------------------------------------------
 Code / Pre
------------------------------------------------ */

code {
  padding: 0.2em 0.5em;
  margin: 0 0.2em;
  font-size: 90%;
  white-space: nowrap;
  background: #f1f1f1;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

pre {
  font-family: sans-serif, 'Helvetica Neue', Helvetica, Arial;
}

pre > code {
  display: block;
  padding: 1em 1.5em;
  white-space: pre;
}

/* ---------------------------------------------
 Blockquote + cite
------------------------------------------------ */

blockquote {
  border-left: 10px solid rgb(61, 79, 93);
  background: #f9f9f9;
  font-family: Georgia, serif;
  font-style: italic;
  margin: 0.25em 0;
  padding: 0.25em 60px;
  line-height: 1.45;
  position: relative;
  color: #383838;
}

blockquote:before {
  display: block;
  content: '\201C';
  font-size: 60px;
  position: absolute;
  left: 20px;
  top: 0px;
  color: #7a7a7a;
}

blockquote cite {
  color: #999999;
  font-size: 14px;
  display: block;
  margin-top: 5px;
}

blockquote cite:before {
  content: '\2014 \2009';
}

/* ---------------------------------------------
 Tables
------------------------------------------------ */

th,
td {
  padding: 6px 12px;
  text-align: left;
  border-bottom: 1px solid #c1c1c1;
}

th {
  background-color: rgb(153, 204, 255);
}

/* second header line (filter bar?) normal font */
tr:nth-child(2) > th {
  font-weight: 400;
}

/* filter elements on table headers */
th > input {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

/* ---------------------------------------------
 Tabbed dialog
------------------------------------------------ */

ul.tab-nav {
  list-style: none;
  border-bottom: 1px solid #bbb;
  padding-left: 5px;
}

ul.tab-nav li {
  display: inline;
}

ul.tab-nav li a.button {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: -1px;
  border-bottom: none;
}

ul.tab-nav li a.active.button {
  border-bottom: 1px solid #fff;
}

.tab-content .tab-pane {
  display: none;
}

.tab-content .tab-pane.active {
  display: block;
}

/* ---------------------------------------------
 Spacing
------------------------------------------------ */

button,
.button,
input,
textarea,
select,
fieldset,
pre,
blockquote,
dl,
figure,
table,
p,
ul,
ol,
form {
  margin-bottom: 0.5em;
}

td > button,
td > .button,
td > input,
td > textarea,
td > select,
td > fieldset,
td > pre,
td > blockquote,
td > dl,
td > figure,
td > table,
td > p,
td > ul,
td > ol,
td > form {
  margin-bottom: 0em;
}

/* ---------------------------------------------
 Utilities
------------------------------------------------ */

.full-width {
  width: 100%;
  box-sizing: border-box;
}

.half-width {
  width: 50%;
  box-sizing: border-box;
}

.third-width {
  width: 33%;
  box-sizing: border-box;
}

.quarter-width {
  width: 25%;
  box-sizing: border-box;
}

.tiny-width {
  width: 50px;
}

.max-full-width {
  max-width: 100%;
  box-sizing: border-box;
}

.pull-right {
  float: right;
}

.pull-left {
  float: left;
}

.inline {
  display: inline;
}

.center-block {
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.align-center {
  text-align: center;
}

/* ---------------------------------------------
 Misc
------------------------------------------------ */

hr {
  margin-top: 2em;
  margin-bottom: 2em;
  border-width: 0;
  border-top: 1px solid #e1e1e1;
}

/* ---------------------------------------------
 Clearing
------------------------------------------------ */

/* Self Clearing Goodness */
.container:after,
.container-fixed:after,
.row:after,
.clear-float {
  content: '';
  display: table;
  clear: both;
}

/* ---------------------------------------------
 Colors
------------------------------------------------ */

.background-grey {
  background: grey;
}

.color-grey {
  color: grey;
}

.background-blue {
  background: rgb(61, 79, 93);
}

.color-blue {
  color: rgb(61, 79, 93);
}

.background-white {
  background: white;
}

.color-white {
  color: white;
}

.background-yellow {
  background: rgb(255, 255, 204);
}

.color-yellow {
  color: rgb(255, 255, 204);
}

.background-green {
  background: rgb(204, 255, 204);
}

.color-green {
  color: rgb(204, 255, 204);
}

.background-red {
  background: rgb(255, 204, 204);
}

.color-red {
  color: rgb(255, 204, 204);
}

/* ---------------------------------------------
 Page Elements
------------------------------------------------ */

header {
  position: fixed;
  height: 40px;
  top: 0px;
  width: 100%;
  z-index: 999;
  /*opacity: 0.9;*/
  background: #222;
  color: white;
  padding: 0px;
}

.header-down {
  top: 0px;
  transition: top 1s;
}

.header-up {
  top: -40px;
  transition: top 1s;
}

/* main after header starts 40px down */
header + main {
  margin-top: 40px;
}

main {
  padding-top: 0.1px; /* to stop collapsing margins */
}

.route {
  padding: 12px;
}

header a {
  color: #999;
  float: left;
  margin-right: 18px;
  height: 40px;
  line-height: 40px;
  padding: 0px 16px;
}

header a:hover {
  color: white;
  background: #333;
}

nav {
  background: #dadada;
  color: black;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  margin-bottom: 6px 0;
  border: 1px solid rgb(61, 79, 93);
  border-top: 0px solid rgb(61, 79, 93);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0px;
}

nav a {
  padding: 0px 8px;
  float: left;
  height: 40px;
  line-height: 40px;
  border-left: 8px solid transparent;
}

nav a:hover {
  background: #aaa;
  border-left: 8px solid black;
}

.title {
  background: rgb(61, 79, 93);
  color: white;
  font-size: 2em;
  font-weight: 500;
  height: 100px;
  line-height: 100px;
  overflow: hidden;
  text-indent: 12px;
}

.logo {
  text-align: center;
  vertical-align: middle;
}

footer {
  background: rgb(61, 79, 93);
  text-align: center;
  margin-top: 1em;
  padding: 1em;
  color: white;
}

.panel,
.message {
  padding: 4px;
  margin: 0.5em 0;
  border-width: 0.1em;
  border-radius: 0.2em;
  margin-bottom: 1em;
  font-weight: 500;
  border-color: #ddd;
}

.message {
  position: fixed;
  top: 1%;
  left: 1%;
  width: 98%;
  z-index: 999;
  box-sizing: border-box;
}

.error {
  background: rgb(255, 204, 204);
  border: 1px solid red;
  border-left: 10px solid red;
  padding: 12px;
}

.error > ul {
  margin-bottom: 0px;
}

.success {
  background: rgb(204, 255, 204);
  border: 1px solid green;
  border-left: 10px solid green;
  padding: 12px;
}

.sticky-note-green {
  border-left: 12px solid green;
}

.sticky-note-red {
  border-left: 12px solid red;
}

.sticky-note-yellow {
  border-left: 12px solid yellow;
}

.sticky-note-white {
  border-left: 12px solid lightgrey;
}
``` 
 





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

Instead of running each layer separately, both launches can be combined in a `launch.json` file configured at the workspace level

# Screenshots
TO DO

## Viewing all posts:
![view posts](https://github.com/davidbarone/webapp/blob/main/images/webapp-1.png?raw=true)

## View / edit individual post
![edit post](https://github.com/davidbarone/webapp/blob/main/images/webapp-2.png?raw=true)

# Links
TO DO