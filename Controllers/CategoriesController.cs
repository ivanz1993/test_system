using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestSystem.Data;
using TestSystem.Models;

namespace TestSystem.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly TestSystemContext _context;
        private readonly IDataRepository<Category> _repo;

        public CategoriesController(TestSystemContext context, IDataRepository<Category> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Categories
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _context.Categories;
        }

        [HttpPut]
        public async Task<IActionResult> PutCategory([FromBody] Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
           
            _repo.Update(category);

            var save = await _repo.SaveAsync(category);

            return Ok(save);
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory([FromBody] Category category)
        {
            _repo.Add(category);

            var save = await _repo.SaveAsync(category);

            return Ok(save);
        }
    }
}
