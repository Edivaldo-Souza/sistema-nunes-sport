using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Model
{
    public class Product
    {
        public Product(string name, string code, string description, double value)
        {
            Name = name;
            Code = code;
            Description = description;
            Value = value;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id{get;set;}
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name{get;set;}
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Code{get;set;}
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Description{get;set;}
        [Column(TypeName = "double")]
        public double Value{get;set;}   
    }

}