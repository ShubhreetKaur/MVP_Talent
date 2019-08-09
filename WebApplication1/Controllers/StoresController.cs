using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StoresController : Controller
    {
        private MVP_TalentEntities db = new MVP_TalentEntities();


        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetStoreData()
        {
            try
            {
                var storeList = db.Stores.Select(x => new { x.Id, x.Name, x.Address }).ToList();
                return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
        }

        //Create Store
        public JsonResult CreateStore(Store store)
        {
            try
            {
                db.Stores.Add(store);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Create Store Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Store created", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //Update Store
        public JsonResult EditStore(Store store)
        {
            try
            {
                Store dbStore = db.Stores.Where(x => x.Id == store.Id).SingleOrDefault();
                dbStore.Name = store.Name;
                dbStore.Address = store.Address;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Store details updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        //Delete Stores
        public JsonResult DeleteStore(int id)
        {
            try
            {
                var store = db.Stores.Where(x => x.Id == id).SingleOrDefault();
                if (store != null)
                {
                    db.Stores.Remove(store);
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Deletion Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
            return new JsonResult { Data = "Success Store Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
