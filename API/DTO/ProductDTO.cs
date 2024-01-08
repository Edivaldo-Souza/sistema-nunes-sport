using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.DTO
{
    public class ProductDTO
    {
        public ProductDTO(string name, string code, string description, double value){
            Name = name;
            Code = code;
            Description = description;
            Value = value;
        }
        public string Name{get;set;}
        public string Code{get;set;}
        public string Description{get;set;}
        public double Value{get;set;}   
    }
}