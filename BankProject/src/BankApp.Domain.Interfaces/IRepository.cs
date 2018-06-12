using System.Collections.Generic;
using System.Linq;

namespace BankApp.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        void Create(T entity);
        void CreateCollections(IList<T> entities);
        void Update(T entity);
        void UpdateCollections(IList<T> entities);
        void Delete(T entity);
        void Deletecollection(IList<T> entities);
    }
}