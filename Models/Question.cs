using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestSystem.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }

        public string RightAnswer { get; set; }

        public int CategoryId { get; set; }
    }
}
