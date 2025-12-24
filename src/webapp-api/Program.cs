var builder = WebApplication.CreateBuilder(args);

// Add configuration
builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection("ApiSettings"));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS service.
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


// Add dbarone services to the container
builder.Services.AddScoped<IDataStore, JsonDataStore>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.RegisterPostEndpoints();
app.RegisterCommentEndpoints();
app.RegisterAdminEndpoints();

// Use the CORS policy
app.UseCors("AllowSpecificOrigin");

app.Run();
