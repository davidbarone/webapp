using System.Security;
using Dbarone.Net.JsonDataStore;
using Microsoft.Extensions.Options;

public class JsonDataStore : IDataStore
{
    string DataPath { get; set; }
    public JsonDataStore(IOptions<ApiSettings> apiSettings)
    {
        this.DataPath = apiSettings.Value.DataPath;
    }

    public object GetContext(bool create = false)
    {
        if (create)
        {
            return DataStore.Create(DataPath, "", false);
        }
        else
        {
            return DataStore.Open(DataPath, "", false);
        }
    }
    public int Next<T>() where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var next = t.Next<T>();
        t.Commit();
        store.Save(false);
        return next;
    }

    /// <summary>
    /// Gets the next id, and Inserts a new record.
    /// </summary>
    /// <typeparam name="T">The record type.</typeparam>
    /// <param name="row">The record to insert. The Id is generated.</param>
    /// <returns>Returns the Id generated for the record.</returns>
    public int Insert<T>(T row) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        // get new id for insert
        int next = t.Next<T>();
        var coll = t.GetCollection<T>();
        var toInsert = row with { Id = next };
        coll.Insert(toInsert);
        t.Commit();
        store.Save(false);
        return next;
    }

    /// <summary>
    /// Updates a record.
    /// </summary>
    /// <typeparam name="T">The record type.</typeparam>
    /// <param name="row">The record to update..</param>
    public void Update<T>(int id, T row) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        var toUpdate = row with { Id = id };

        coll.Update(r => r.Id.Equals(id), r => toUpdate);

        /*
        var deleted = coll.Delete(r => r.Id.Equals(id));
        if (deleted != 1)
        {
            throw new Exception("Record not found!");
        }
        coll.Insert(toUpdate);
        */

        t.Commit();
        store.Save(false);
    }

    /// <summary>
    /// Deletes a record.
    /// </summary>
    /// <typeparam name="T">The record type.</typeparam>
    /// <param name="row">The record id to delete.</param>
    public void Delete<T>(int id) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        coll.Delete(r => r.Id.Equals(id));
        t.Commit();
        store.Save(false);
    }

    public IEnumerable<T> Get<T>() where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        t.Commit();
        store.Save(false);
        return coll.AsList;
    }

    public T? GetById<T>(int id) where T : Identifiable
    {
        var store = (DataStore)GetContext();
        var t = store.BeginTransaction();
        var coll = t.GetCollection<T>();
        t.Commit();
        store.Save(false);
        return coll.AsList.FirstOrDefault(i => i.Id == id);
    }
}