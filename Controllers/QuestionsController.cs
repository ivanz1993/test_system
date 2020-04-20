using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestSystem.Data;
using TestSystem.Models;
using TestSystem.Models.QuestionsDto;

namespace TestSystem.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly TestSystemContext _context;
        private readonly IDataRepository<Question> _repo;

        public QuestionsController(TestSystemContext context, IDataRepository<Question> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Questions
        [HttpGet]
        public IEnumerable<Question> Get()
        {
            return _context.Questions;
        }

        // GET: api/Questions/category/5
        [HttpGet("category/{id}")]
        public IActionResult GetByCategoryId([FromRoute] int id)
        {
            var question = _context.Questions.Where(q => q.CategoryId == id);

            if (question == null)
            {
                return NotFound();
            }

            var questionsCategory = question.Select(q => new QuestionsCategoryDto()
            {
                Id = q.Id,
                Name = q.Name,
                Option1 = q.Option1,
                Option2 = q.Option2,
                Option3 = q.Option3,
                Option4 = q.Option4
            });

            return Ok(questionsCategory);
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitQuestions([FromBody] List<SubmitQuestionDto> submittedQuestions)
        {
            var questions = _context.Questions.Where(q => submittedQuestions.Exists(sq => sq.Id == q.Id));

            var rigthAnswerCount = 0;

            foreach (var submittedQuestion in submittedQuestions)
            {
                var question = questions.FirstOrDefault(q => q.Id == submittedQuestion.Id);
                if (question.RightAnswer == submittedQuestion.SelectedOption)
                {
                    rigthAnswerCount++;
                }
            }

            return Ok(new Result { Score = rigthAnswerCount });
        }


        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
        {
            var question = await _context.Questions.FindAsync(id);
             
            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                _repo.Update(question);
                var save = await _repo.SaveAsync(question);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> QuestionPost([FromBody] Question question)
        {

            _repo.Add(question);

            var save = await _repo.SaveAsync(question);

            return CreatedAtAction("QuestionPost", new { id = question.Id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _repo.Delete(question);
            var save = await _repo.SaveAsync(question);

            return Ok(question);
        }

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok("Hello");
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}
