//using BankApp.Web.App.Policies;
using BankApp.Common;
using BankApp.Infrastructure.DependencyResolver;
using BankApp.Web.App.Middlewares;
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

namespace BankApp.Web.App
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

        private RsaSecurityKey key;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.AddOptions();
            var serviceProvider = services.BuildServiceProvider();
            var options = serviceProvider.GetRequiredService<IOptions<AppSettings>>();
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
            // services.AddAuthentication(o =>
            // {
            //     o.DefaultAuthenticateScheme = tokenOptions.DefaultAuthenticateScheme;
            //     o.DefaultChallengeScheme = tokenOptions.DefaultChallengeScheme;
            // })
            // .AddJwtBearer(o =>
            // {
            //     o.TokenValidationParameters.IssuerSigningKey = key;
            //     o.TokenValidationParameters.ValidAudience = tokenOptions.Audience;
            //     o.TokenValidationParameters.ValidIssuer = tokenOptions.Issuer;
            //     o.TokenValidationParameters.ValidateLifetime = true;
            //     o.TokenValidationParameters.ValidateIssuer = true;
            //     o.TokenValidationParameters.ValidateAudience = true;
            //     o.Events = new JwtBearerEvents()
            //     {
            //         OnMessageReceived = context =>
            //         {
            //             context.Token = Convert.ToString(context.HttpContext.Items["x-access-token"]);
            //             return Task.FromResult(0);
            //         },
            //         OnTokenValidated = context => Task.FromResult(0)
            //     };
            // });
        }
        private void ConfigureAuthorization(IServiceCollection services)
        {
            // services.AddAuthorization(auth =>
            // {
            //     auth.AddPolicy(TokenAuthOptions.Scheme, new AuthorizationPolicyBuilder()
            //         .AddAuthenticationSchemes(TokenAuthOptions.Scheme)
            //         .AddRequirements(new TokenAuthRequirement())
            //         .Build());
            // });
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
