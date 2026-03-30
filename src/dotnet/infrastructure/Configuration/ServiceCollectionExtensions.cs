using Application.Jobs;
using Infrastructure.Jobs;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IJobQueryService, MockJobQueryService>();
            return services;
        }
    }
}
