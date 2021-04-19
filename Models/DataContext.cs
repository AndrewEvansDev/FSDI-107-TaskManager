using Microsoft.EntityFrameworkCore;
namespace FSDI_107_TaskManager.Models
{
    public class DataContext : DbContext
    {

    /*
            Run migrations everytime something changes on the models

            - dotnet ef migrations add <someName>
            - dotnet ef database update
    */

        public DataContext(DbContextOptions<DataContext> conInfo) : base(conInfo)
        {

        }

        //which of my models should become tables inside of the DataBase
        public DbSet<Task> Tasks {get;set;}

    }
}