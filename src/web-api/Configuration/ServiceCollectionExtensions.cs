using Microsoft.OpenApi.Models;
using Web.Api.GraphQL.Queries;

namespace Web.Api.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddWebApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("WebApp", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:3000", "http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Siam Tech Jobs REST API",
                    Version = "v1"
                });
            });

            services
                .AddGraphQLServer()
                .AddQueryType<JobQueries>();

            return services;
        }
    }
}
