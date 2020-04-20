using System.ComponentModel.DataAnnotations;

namespace TestSystem.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
