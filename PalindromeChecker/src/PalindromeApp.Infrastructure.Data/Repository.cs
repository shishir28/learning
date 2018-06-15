using PalindromeApp.Domain.Entities;
using PalindromeApp.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace PalindromeApp.Infrastructure.Data
{
    public class Repository<T> :  IRepository<T> where T : BaseEntity
    {
        protected DbSet<T> DbSet;
        private DbContext _dbContext;
        public Repository(DbContext dataContext)
        {
            _dbContext = dataContext;
            DbSet = _dbContext.Set<T>();
        }
        public virtual void Create(T entity)
        {
            DbSet.Add(entity);
            _dbContext.SaveChanges();
        }

        public virtual void CreateCollections(IList<T> entities)
        {
            DbSet.AddRange(entities);
            _dbContext.SaveChanges();
        }

        public virtual void Update(T entity)
        {
            DbSet.Update(entity);
            _dbContext.SaveChanges();
        }

        public virtual void UpdateCollections(IList<T> entities)
        {
            DbSet.UpdateRange(entities);
            _dbContext.SaveChanges();
        }

        public virtual void Delete(T entity)
        {
            DbSet.Remove(entity);
            _dbContext.SaveChanges();
        }

        public virtual void Deletecollection(IList<T> entities)
        {
            DbSet.RemoveRange(entities);
            _dbContext.SaveChanges();
        }

        public virtual IQueryable<T> GetAll() =>
            DbSet;

        public virtual T GetById(int id) =>
            DbSet.FirstOrDefault(x => x.Id == id);      
    }
}
