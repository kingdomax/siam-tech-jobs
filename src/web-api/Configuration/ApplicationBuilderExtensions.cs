namespace Web.Api.Configuration
{
    public static class ApplicationBuilderExtensions
    {
        public static WebApplication UseWebApiPipeline(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("WebApp");

            app.MapControllers();
            app.MapGraphQL("/graphql");

            return app;
        }
    }
}
