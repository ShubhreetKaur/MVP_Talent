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
    public class SalesController : Controller
    {
        private MVP_TalentEntities db = new MVP_TalentEntities();


        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetSaleData()
        {
            try
            {
                var saleList = db.Sales.Select(x => new {
                    x.Id, x.CustomerId, x.ProductId, x.StoreId,
                    CustomerName = x.Customer.Name,
                    ProductName = x.Product.Name,
                    StoreName = x.Store.Name,
                    DateSold = x.DateSold
                }).ToList();

                return new JsonResult { Data = saleList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        //Get data for create
        public JsonResult GetCustomer()
        {
            try
            {
                var customerList = db.Customers.Select(x => new { x.Id, x.Name }).ToList();
                return new JsonResult { Data = customerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        public JsonResult GetProduct()
        {
            try
            {
                var productList = db.Products.Select(x => new { x.Id, x.Name }).ToList();
                return new JsonResult { Data = productList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        public JsonResult GetStore()
        {
            try
            {
                var storeList = db.Stores.Select(x => new { x.Id, x.Name }).ToList();
                return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        //Create customer
        
                public JsonResult CreateSale(Sale sale)
                {
                    try
                    {
                        db.Sales.Add(sale);
                        db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        Console.Write("Exception Occured /n {0}", e.Data);
                        return new JsonResult { Data = "Create Sales Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                    }
                    return new JsonResult { Data = "Sale created", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
        //Update Sale
        public JsonResult EditSale(Sale sale)
        {
            try
            {
                
                Sale dbSale = db.Sales.Where(x => x.Id == sale.Id).SingleOrDefault();
                dbSale.CustomerId = sale.CustomerId;
                dbSale.ProductId = sale.ProductId;
                dbSale.StoreId = sale.StoreId;
                dbSale.DateSold = sale.DateSold;
                
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Sale details updated", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Delete Sale
        public JsonResult DeleteSale(int id)
        {
            try
            {
                var sale = db.Sales.Where(x => x.Id == id).SingleOrDefault();
                if (sale != null)
                {
                    db.Sales.Remove(sale);
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult { Data = "Deletion Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }

            return new JsonResult { Data = "Success Sale Deleted", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
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
