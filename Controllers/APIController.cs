using Microsoft.AspNetCore.Mvc;
using FSDI_107_TaskManager.Models;
using System.Collections.Generic;
using System.Linq;

namespace taskManager.Controllers
{
    public class APIController : Controller
    {   
        static List<Task> data;
        DataContext dbContext;

        public APIController(DataContext db)
        {
            dbContext = db;
        }
        [HttpPost]
        public IActionResult SaveTask([FromBody] Task theTask)
        {
            dbContext.Tasks.Add(theTask);
            dbContext.SaveChanges();
            return Json(theTask);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var list = dbContext.Tasks.ToList();
            return Json(list);
        }
        [HttpDelete]
        public IActionResult DelTask(int id)
        {
            Task t = dbContext.Tasks.Find(id);

            if(t == null)
            {
                return NotFound();
            }
            dbContext.Tasks.Remove(t);
            dbContext.SaveChanges();
            return Ok();
        }
        [HttpPost]
        public IActionResult SaveMsg([FromBody] ContactMsg newContactMsg)
        {
            dbContext.Messages.Add(newContactMsg);
            dbContext.SaveChanges();
            return Json(newContactMsg);
            
        }
    }
}