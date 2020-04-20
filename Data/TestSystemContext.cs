using Microsoft.EntityFrameworkCore;
using TestSystem.Models;

namespace TestSystem.Models
{
    public class TestSystemContext : DbContext
    {
        public TestSystemContext (DbContextOptions<TestSystemContext> options)
            : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
