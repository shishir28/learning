using PalindromeApp.Infrastructure.DependencyResolver;
using PalindromeApp.Web.App.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NLog.Extensions.Logging;
using Newtonsoft.Json;
using System.IO;

namespace PalindromeApp.Web.App
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddOptions();
            var serviceProvider = services.BuildServiceProvider();            
            this.ConfigureAuthentication(services);
            this.ConfigureAuthorization(services);
            services.AddMvc().AddJsonOptions(opt =>
              {
                  opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
              });
            DependencyInstaller.InjectDependencies(services, this.Configuration);
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {

        }
        private void ConfigureAuthorization(IServiceCollection services)
        {

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            this.SetupLoggingProvider(loggerFactory);
            app.Use(new UnhandledExceptionMiddleware().Process);

            if (env.IsDevelopment())
                app.UseBrowserLink();
            else
                app.UseExceptionHandler("/Home/Error");

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            if (!env.IsDevelopment())
            {
                app.UseHsts(options => options.MaxAge(days: 30));
            }

            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                //Configuring X-Frame-Options
                app.UseXfo(options => options.SameOrigin()); //need to check if it will work from blackbook . to stop click jacking
                app.UseXXssProtection(options => options.EnabledWithBlockMode());
            }

            app.UseAuthentication();
            app.UseMvc();
            AutoMapperBootStrapper.Bootstrap();
        }

        private void SetupLoggingProvider(ILoggerFactory factory)
        {
            factory.AddDebug();
            factory.AddConsole();
            factory.AddNLog(new NLogProviderOptions { CaptureMessageTemplates = true, CaptureMessageProperties = true });
            factory.ConfigureNLog("nlog.config");
        }
    }
}
