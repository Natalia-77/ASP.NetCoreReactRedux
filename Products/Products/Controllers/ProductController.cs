using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Products.Data;
using Products.Models;

namespace Products.Controllers
{
    
    [Route("[controller]")]
    [ApiController]

    public class ProdController : ControllerBase
    {
        private AppEFContext _context { get; set; }
        public ProdController(AppEFContext context)
        {
            _context = context;
        }

        [HttpGet]       
        public IActionResult GetData([FromQuery] SearchParamsModel model)
        {
            var prod = _context.Productss.Select(x => new ProductViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description
            }).AsQueryable();
            int count = 2;
            string search = model.Name != null ? model.Name : "";
            var res = _context.Productss.Where(x => x.Name.Contains(search));

            return Ok(new
            {
                data = new
                {

                    data = res.Select(x => x).ToList(),
                    search = model.Name,
                    current_page = model.Page,
                    last_page = (Math.Ceiling((decimal)prod.Count() / count)),
                    total = prod.Count(),
                }

            });
        }


    }
}
