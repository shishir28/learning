using BankApp.Common;
using BankApp.Domain.Entities;
using BankApp.Domain.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System;

namespace BankApp.Infrastructure.Data
{

    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly AppSettings _appSettings;
        public Repository(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public virtual void Create(T entity)
        {

            try
            {
                // In ideal scenario this should be done to DB . But for this project, based on requirement 
                var filePath = Path.Combine(_appSettings.DBFilePath, typeof(T).Name + ".txt");
                var fileContents = "";
                IList<T> entities = new List<T>() { };
                if (!File.Exists(filePath))
                {
                    File.Create(filePath).Dispose();
                }
                else
                {
                    fileContents = File.ReadAllText(filePath);
                    if (!string.IsNullOrWhiteSpace(fileContents))
                        entities = JsonConvert.DeserializeObject<IList<T>>(fileContents);
                }

                entity.Id = entities.Count + 1;
                entities.Add(entity);
                File.WriteAllText(filePath, JsonConvert.SerializeObject(entities));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
            }
            finally
            {
                Console.WriteLine("Executing finally block.");
            }
        }

        public void CreateCollections(IList<T> entities)
        {
            throw new System.NotImplementedException();
        }

        public virtual void Delete(T entity)
        {
            throw new System.NotImplementedException();
        }

        public virtual void Deletecollection(IList<T> entities)
        {
            throw new System.NotImplementedException();
        }

        public virtual IQueryable<T> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public virtual T GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public virtual void Update(T entity)
        {
            throw new System.NotImplementedException();
        }

        public virtual void UpdateCollections(IList<T> entities)
        {
            throw new System.NotImplementedException();
        }
    }
}
