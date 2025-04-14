
using Microsoft.Extensions.Options;
using WebApi_courtbook.Models;
using WebApi_courtbook.Services;

namespace WebApi_courtbook
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<CourtBookDataBaseSettings>(
                builder.Configuration.GetSection("CourtBookDatabase"));
            builder.Services.AddSingleton<IMongoService<Usuario>>(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<CourtBookDataBaseSettings>>();
                return new MongoService<Usuario>(settings, settings.Value.UsuarioCollectionName);
            });

            builder.Services.AddSingleton<IMongoService<Quadra>>(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<CourtBookDataBaseSettings>>();
                return new MongoService<Quadra>(settings, settings.Value.QuadraCollectionName);
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
