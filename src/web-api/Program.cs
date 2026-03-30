using Infrastructure.Configuration;
using Web.Api.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddWebApiServices(builder.Configuration)
                .AddInfrastructure();

var app = builder.Build();
app.UseWebApiPipeline();
app.Run();