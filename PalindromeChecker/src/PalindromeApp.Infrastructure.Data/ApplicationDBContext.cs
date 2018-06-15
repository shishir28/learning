
using Microsoft.EntityFrameworkCore;
using PalindromeApp.Domain.Entities;
using System;

namespace PalindromeApp.Infrastructure.Data
{
    public class ApplicationDBContext : DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    //this.Database.CloseConnection();
                    base.Dispose();
                }
                disposedValue = true;
            }
        }
        void IDisposable.Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Palindrome>(b =>
          {
              b.ToTable("Palindromes");
              b.HasKey(u => u.Id);
          });


            base.OnModelCreating(modelBuilder);
        }
    }

}