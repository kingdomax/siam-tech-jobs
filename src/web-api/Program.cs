using Application.Jobs;
using Infrastructure.Jobs;
using Web.Api.GraphQL.Queries;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("WebApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddScoped<IJobQueryService, MockJobQueryService>();
builder.Services.AddGraphQLServer().AddQueryType<JobQueries>();

var app = builder.Build();
app.UseCors("WebApp");
app.MapGet("/", () => "Web API is running");
app.MapGraphQL("/graphql");
app.Run();