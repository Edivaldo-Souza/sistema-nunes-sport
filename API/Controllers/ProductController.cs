using API.Model;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController: ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ProductController(ApplicationDbContext context)
        {
            dbContext = context;
        } 

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            return await dbContext.Products.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Post(ProductDTO dto)
        {
            Product product = new Product(dto.Name,dto.Code,dto.Description,dto.Value);
            if(dto.Name==null || dto.Code == null || dto.Description == null || dto.Value <= 0)
            {
                return BadRequest();
            }
            dbContext.Products.Add(product);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get),new {id=product.Id},dto); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> Get(string id){
            Product product = dbContext.Products.FirstOrDefault(p=>p.Code==id);
            if(product == null)
            {
                return NotFound();
            }
            ProductDTO dto = new ProductDTO(product.Name,product.Code,product.Description,product.Value);
            return dto;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> Delete(string id)
        {
            Product product = dbContext.Products.FirstOrDefault(p=>p.Code==id);
            if(product == null)
            {
                return NotFound();
            }
            dbContext.Products.Remove(product);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult<Product>> Update(ProductDTO dto)
        {
           Product product = dbContext.Products.FirstOrDefault(p=>p.Code==dto.Code);
            if(product == null)
            {
                return NotFound();
            }
            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Value = dto.Value;

            dbContext.Products.Update(product);
            await dbContext.SaveChangesAsync();
            return NoContent(); 
        }

    }

