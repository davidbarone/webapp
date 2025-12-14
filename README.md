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
- [Api](#api)
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
  - [Prettier and ESLint](#prettier-and-eslint)
    - [/eslint.config.mjs](#eslintconfigmjs)
    - [/.prettierrc.json](#prettierrcjson)
    - [/.prettierignore](#prettierignore)
    - [/package.json](#packagejson)
    - [VSCode settings (settings.json)](#vscode-settings-settingsjson)
    - [ESLint / Prettier Summary](#eslint--prettier-summary)
  - [Default File Setup](#default-file-setup)
  - [CSS / Styling](#css--styling)
    - [/src/css/style.css](#srccssstylecss)
  - [JSX Support](#jsx-support)
    - [/js/lib/createElement.js](#jslibcreateelementjs)
    - [/js/lib/createFragment.js](#jslibcreatefragmentjs)
    - [/tsconfig.json](#tsconfigjson)
    - [/src/main.ts](#srcmaints)
  - [Routing](#routing)
    - [/src/js/lib/router.tsx](#srcjslibroutertsx)
  - [Set up Default app structure using JSX](#set-up-default-app-structure-using-jsx)
    - [/index.html](#indexhtml)
    - [/src/js/app.tsx](#srcjsapptsx)
  - [Tooling](#tooling)
  - [Setup](#setup)
    - [TypeScript](#typescript)
    - [WebPack Packages](#webpack-packages)
    - [Babel Dependencies](#babel-dependencies)
    - [React Packages](#react-packages)
    - [CSS loaders](#css-loaders)
    - [Webpack Configuration](#webpack-configuration)
    - [Folder Setup](#folder-setup)
    - [index.tsx](#indextsx)
    - [Template.html](#templatehtml)
    - [Npm Scripts](#npm-scripts)
    - [Webpack Watch](#webpack-watch)
    - [Run development web server](#run-development-web-server)
  - [Coding Standards](#coding-standards)
  - [Components](#components)
  - [Environment Variables](#environment-variables)
  - [API](#api-1)
  - [Styles + CSS](#styles--css)
    - [Reset Style](#reset-style)
    - [CSS Modules](#css-modules)
    - [Global.d.ts](#globaldts)
  - [Testing](#testing)
  - [Linting](#linting)
  - [Routes](#routes)
  - [Context](#context)
  - [Debugging (VSCode)](#debugging-vscode)
  - [Fake API](#fake-api)
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

# Api

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

## Default File Setup
TO DO
Add in CSS
Add in default widgets

## CSS / Styling
A default CSS file was added to /src/css/style.css. Note that no normalise.css or reset css is used, as modern browsers are generally consistent when it comes to CSS defaults. The following default CSS was used:
### /src/css/style.css
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

## Set up Default app structure using JSX
At this point, the basic configuration is set up using ESLint, Prettier and JSX. We can not proceed to gut the demo app and place in our skeleton app using JSX.

### /index.html
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
import '/css/normalise.css';
import '@root/css/style.css';
import './hello-world.js';
import './lib/createElement.js';
import './lib/createFragment.js';
import Header from './widgets/header/header.tsx';
import Main from './widgets/main/main.tsx';
import Footer from './widgets/footer/footer.tsx';

const x = (
  <div class="app">
    {Header()}
    {Main()}
    {Footer()}
  </div>
);

document.querySelector<HTMLDivElement>('#app')!.appendChild(x);
```












- 100% API driven - server functionality should be in separate project (normally .NET Core web-api)
- Web UI layer to be 100% javascript application
- Use standard modern node build chain, but keep to core well-used 
- components
  - TypeScript (for typed JavaScript)
  - Webpack (for bundling) - https://webpack.js.org/
  - Babel for Transpiling - https://babeljs.io/
  - React used as default component library - https://reactjs.org/
    - Manual setup to keep in full control
  - Jest (for testing) - https://jestjs.io/
- Modern development features
  - Full typeing (TypeScript)
  - Hot Module Loading (HML)
  - Linting
  - Debugging

## Tooling
- VSCode
  - Extension: ESLint Extension (Microsoft)
  - Extension: Markdown All in One (Yu Zhang)
  - Extension: Prettier - Code Formatter (Prettier)
- React Dev Tools: https://reactjs.org/link/react-devtools
  
## Setup
- Initialising the project: `npm init`

### TypeScript
- Installing TypeScript: `npm install typescript --save-dev`
- TypeScript Loader (if not using Babel 7.0): `npm install ts-loader --save-dev`
- Initialising the TypeScript config file: `npx tsc --init`

### WebPack Packages
- Installing npm packages: `npm install webpack webpack-cli webpack-dev-server --save-dev`
- Babel Loader: `npm install babel-loader --save-dev`
- HTML Webpack Plugin: `npm install html-webpack-plugin --save-dev`
- For environment variables: `npm install dotenv --save-dev`

### Babel Dependencies
- Babel CLI (to test babel transpilations): `npm install @babel/cli --save-dev`
- Presets: `npm install @babel/core @babel/preset-react @babel/preset-env @babel/preset-typescript --save-dev`
- Support of JavaScript async / await in Babel: `npm install --save-dev @babel/plugin-transform-runtime`

### React Packages
- Runtime packages: `npm install react react-dom`
- Development packages (for Webpack & Babel): `npm install @babel/plugin-transform-react-jsx --save-dev`
- Development types for ReactDom: `npm install @types/react-dom --save-dev`
- Types: `npm install @types/react --save-dev`
- React Router: `npm install react-router-dom`

### CSS loaders
- CSS Webpack loaders: `npm install style-loader css-loader --save-dev`
- Normalize.css: `npm install normalize.css`

### Webpack Configuration

TypeScript can be transpiled in this project in 2 ways:
- Using ts-loader Webpack loader
- Using Babel Webpack loader

The TypeScript transpilation method can be controlled using different npm scripts and webpack config files.
``` js
    "serve:ts": "webpack-dev-server --mode development --config webpack.ts.config.js",
    "serve:babel": "webpack-dev-server --mode development --config webpack.babel.config.js",
```

The Babel version uses the additional `.babelrc` configuration file to control which Babel plugings to use.

The default Webpack configuration file is shown below:

``` js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Change variable to change names of output files.
let appName = "webapp";

module.exports = {
  entry: { main: path.resolve("./src/index.tsx") },
  devtool: "inline-source-map",
  module: {
    rules: [
      /*
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      */
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${appName}.js`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: `${appName}.html`,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    server: "http",
    open: [`${appName}.html`],
    port: 8080,
  },
};
```

Notes:
- Configuration for development web server included ('devServer')
- Includes rules for TypeScript
- Includes configuration for HtmlWebpackPlugin
- CSS loader, with CSS Modules (local CSS)

### Folder Setup





```
+--\src
|  +--\assets (for static files)
|  +--\components (for business components that are reused in multiple components)
|  +--\routes (top-level components - accessible from a route)
|  +--\style
|  +--\utils (utilities, helpers)
|  +--\widgets (standard UI components, e.g. inputs, controls etc.)
|  +--index.ts (top-level component)
|  +--template.html (HTML5 template)
+--\tests
|  +--component_a.test.js
|  +--component_b.test.js
```

### index.tsx

This file is used to bootstrap React into the DOM:

``` js
import React from "react";
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './style/index.css';
import App from './components/App';

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />);
```

### Template.html

The following HTML5 template is used:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>Web UI Reference Application</title>
    <!-- <link rel="stylesheet" href="./style/index.css" /> -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Npm Scripts

The following scripts are added to the `package.json` file:

``` json
    "build": "webpack --mode production --node-env production",
    "build:dev": "webpack --mode development --node-env development",
    "build:prod": "webpack --mode production --node-env production",
    "watch": "webpack --watch",
    "serve": "webpack-dev-server --mode development",
    "serve:dev": "webpack-dev-server --mode development",
    "serve:prod": "webpack-dev-server --mode production",
    "serve:ts": "webpack-dev-server --mode development --config webpack.ts.config.js",
    "serve:babel": "webpack-dev-server --mode development --config webpack.babel.config.js",
    "start": "webpack serve --port 8080 --mode development --open --hot",
    "compile": "tsc",
    "test": "jest --collectCoverage",
    "go": "start npm run watch && start npm run serve",
    "babel": "babel src/index.tsx --out-file dist/babel-bundle.js"
```

### Webpack Watch

type `npm run wpw` to start run Webpack in watch mode. This watches for any file changes, then recompiles. Edit the `index.ts` file, and note how Webpack detects the change and recompiles.

### Run development web server

Type `npm run serve`, and open browser to http://localhost:8080. Note this has hot module loading enabled (HMR) - try and change the template.html file and save, and see the browser page automatically refresh.

## Coding Standards

General JavaScript coding standards:
- Google JavaScript style guide: https://google.github.io/styleguide/jsguide.html
- AirBnB JavaScript style guide: https://github.com/airbnb/javascript
- W3Schools JavaScript style guide: https://www.w3schools.com/js/js_conventions.asp

Filename conventions (React)
- https://github.com/airbnb/javascript/tree/master/react

Paradigms, Coding Standards:
- Clean Code (Robert C Martin): https://www.amazon.com/gp/product/0132350882/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0132350882&linkCode=as2&tag=brandonwoz-20&linkId=8af093cb2b8d9a87993f285341ff015a
- Clean Code (Ryan McDermott - focus on JavaScript): https://github.com/ryanmcdermott/clean-code-javascript

## Components

React is used to enable a web site to be built using reusable components. Key decisions for using React are:
- Functional components only
- Typed props is mandatory (Use of TypeScript)

## Environment Variables

Environment variables need to be stored for multiple environments (dev, prod). This includes server names, API endpoints and other settings.

- Variables to be stored in .env files
  - Production: `.env.production`
  - Development: `.env.development`
- Standard .env file format
- The dotenv package to be installed using `npm install dotenv --save-dev`
- Use Webpack `DefinePlugin` plugin to create environment variables:

``` js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { isConditionalExpression } = require("typescript");

// Change variable to change names of output files.
let appName = "webapp";

module.exports = (env, argv) => {
  // Get the correct .env file for the environment:

  const dotenv = require("dotenv").config({
    path: path.join(
      __dirname,
      env.development ? ".env.development" : ".env.production"
    ),
  });
  const appSettings = dotenv.parsed;

  return {

    ...

    plugins: [
      new webpack.DefinePlugin({
        "process.env.APP_SETTINGS": JSON.stringify(appSettings),
      }),
    ],
  };
};
```
- The environment variables will be stored at `process.env.APP_SETTINGS`;
- The environment must be passed in to webpack from the npm script, for example:
``` js
    "build:dev": "webpack --mode development --env development",
    "build:prod": "webpack --mode production --env production",
```
- To use in code (for example in helper class to call API):
``` js
var settings = process.env.APP_SETTINGS as any;
console.debug(settings.API_DOMAIN);
```
- Ensure the .gitignore file excludes .env files from source code repository.

## API

## Styles + CSS

CSS is added to the Webpack configuration as follows:

`npm install --save-dev css-loader style-loader`

webpack.config.js, module section (Note css-loader comes AFTER style-loader):

``` js
 module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
```

### Reset Style
I use normalize.css as the reset style as follows:

`npm install normalize.css`

Then, add the following to the entry `index.ts`:

`import 'normalize.css';`

### CSS Modules

CSS Modules are locally scoped CSS files. CSS Modules are configured in thge `webpack.config.js` file.

``` js
{
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
        ],
      },
```

### Global.d.ts

When referencing .css files in .tsx files, you may get following error:

`Cannot find module 'module.css' or its corresponding type declarations`

To import custom file types, you must use TypeScript's declare module syntax to let it know that it's ok to import. To do this, simply create a globals.d.ts (declaration file) wherever your other code's root directory is and then add in this code:

``` js
declare module '*.css';
```

## Testing

## Linting

Linting is used to check syntax, find problems, and enforce code style. ESLint is used:

https://eslint.org/docs/user-guide/getting-started

`npm install eslint --save-dev`

To initialise, the eslint config file:

`npm init @eslint/config`

Note this will add the @eslint/create-config package.
- How would you like to use ESLint?: **To check syntax, find problems, and enforce code style**
- What type of modules does your project use?: **JavaScript modules (import/export)**
- Which framework does your project use?: **React**
- Does your project use TypeScript? **Yes**
- Where does your code run? **Browser**
- How would you like to define a style for your project: **Answer questions about your style**
- What format do you want your config file to be in? **JSON**
- What style of indentation do you use?: **Spaces** (4 space default)
- What quotes do you use for strings?: **Single**
- What line endings do you use?: **Windows**
- Do you require semicolons?: **Yes**

The eslint config tool may then install additional packages, for example:

`eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest`

- Would you like to install them now with npm?: **Yes**

To perform linting, add the following npm script to `package.json`:

``` js
  "lint": "eslint **/*.tsx"
```

To see all the ESLint rules (and which ones are enabled by default):

https://eslint.org/docs/rules/

## Routes

React Router is used to link components to the Browser's URL.

https://reactrouterdotcom.fly.dev/docs/en/v6

To configure:

- Add react-router-dom: `npm install react-router-dom`
- Add the `BrowserRouter` into the main index.tsx, wrapping the `<App />` component.
- Configure routes in `App.tsx`.
- Add links, for example in the Header component.

## Context

## Debugging (VSCode)

## Fake API

Fake APIs are useful for several reasons:
- Don't need to wait until real API is built
- Can test the API interface early
- Can use for testing (Fake APIs can be seeded with test data)
- Quicker (no network IO)
- Simpler - no dependency on API project

`Json-server` is used for generating fake API servers:

- `npm install json-server npm-run-all --save-dev`
- Create a db.json file (can be in root, or could be in utils folder)
- Populate with data
- Start with `npx json-server --watch db.json`
- To run in parallel with React, use the npm-run-all package

``` js
  "start:api": "npx json-server --watch db.json",
  "start:all" : "run-p start:api serve:dev"
```

(Note this uses run-p to run npm scripts in parallel.)

The `--watch` behaviour results in any POST, DELETE, PUT methods updating the db.json file. This may not be what you require.
For example, to ensure a repeatable data environment, you may require the data file to reinitialise each time the app is restarted.
To do this, two additional modules have been created:
- `createMockDb.js`: This creates a new clean version of db.json
- `jsonServer.js`: This runs Json-Server as a module, and allows extra configuration

``` js
    "start:api": "node tools/jsonServer.js",
    "prestart:api": "node tools/createMockDb.js",
    "start:all": "run-p start:api serve:dev"
```

Note: the `prestart:api` script will always run before `start:api` by convention.

(Thanks to https://github.com/coryhouse/react-flux-building-applications)

Other useful links:
- Lorem Ipsum generator: https://loremipsumgenerator.org/
- Free online fake API server: https://my-json-server.typicode.com/
- Json-server source (GitHub), including instructions: https://github.com/typicode/json-server

## Screenshots

### Viewing all posts:
![view posts](https://github.com/davidbarone/webapp/blob/main/images/webapp-1.png?raw=true)

### View / edit individual post
![edit post](https://github.com/davidbarone/webapp/blob/main/images/webapp-2.png?raw=true)

## Links
- https://dev.to/ruppysuppy/create-react-app-from-scratch-like-a-pro-de0#:~:text=%20Create%20React%20App%20from%20Scratch%20like%20a,use%20npm%20run%20build%20or%20npm...%20More%20
- https://onoya.dev/react-webpack-babel7-typescript/