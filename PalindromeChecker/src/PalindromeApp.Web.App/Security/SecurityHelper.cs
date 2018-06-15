using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace PalindromeApp.Web.App.Security
{
    internal static class SecurityHelper
    {
        internal static bool SkipRequired(string path)
        {
            var nonAPIPath = !path.StartsWith("/api/");
            var caseInsensitivePath = path.ToLower();
            // add more path as per requirement in the project
            return (nonAPIPath ||
                caseInsensitivePath.Contains("/api/role/addrole") ||
                caseInsensitivePath.Contains("/api/account/login") ||
                caseInsensitivePath.Contains("/api/account/logonwindowuser") ||
                caseInsensitivePath.Contains("/api/account/logoff") ||
                caseInsensitivePath.Contains("/api/account/forgotpassword") ||
                caseInsensitivePath.Contains("/api/account/resetpassword") ||
                caseInsensitivePath.Contains("/api/account/register") ||
                caseInsensitivePath.Contains("/api/account/registerwindowsuser")
                );
        }

        internal static bool HasAllowAnonymous(this ActionContext actionContext) =>
             actionContext.ActionDescriptor.FilterDescriptors.Any(item => item.Filter is IAllowAnonymous);
    }
}
