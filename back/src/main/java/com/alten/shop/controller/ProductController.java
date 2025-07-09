package com.alten.shop.controller;

import com.alten.shop.dto.ProductDto;
import com.alten.shop.model.User;
import com.alten.shop.service.ProductService;
import com.alten.shop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<Page<ProductDto>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProductDto> products = productService.getAllProducts(category, name, pageable);
        
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
    
    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDto productDto, 
                                         Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        if (!user.isAdmin()) {
            return ResponseEntity.status(403).body("Only admin can create products");
        }
        
        ProductDto createdProduct = productService.createProduct(productDto);
        return ResponseEntity.ok(createdProduct);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, 
                                         @Valid @RequestBody ProductDto productDto,
                                         Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        if (!user.isAdmin()) {
            return ResponseEntity.status(403).body("Only admin can update products");
        }
        
        ProductDto updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        if (!user.isAdmin()) {
            return ResponseEntity.status(403).body("Only admin can delete products");
        }
        
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}