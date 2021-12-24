using Microsoft.AspNetCore.Mvc;

namespace Products.Models
{
    public class SearchParamsModel
    {
        
        public int Page { get; set; }
        
        public string? Name { get; set; }
        
    }
}
