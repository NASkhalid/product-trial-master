package com.alten.shop.service;

import com.alten.shop.dto.ProductDto;
import com.alten.shop.model.Product;
import com.alten.shop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public Page<ProductDto> getAllProducts(String category, String name, Pageable pageable) {
        Page<Product> products = productRepository.findByFilters(category, name, pageable);
        return products.map(ProductDto::new);
    }
    
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return new ProductDto(product);
    }
    
    public ProductDto createProduct(ProductDto productDto) {
        Product product = productDto.toEntity();
        Product savedProduct = productRepository.save(product);
        return new ProductDto(savedProduct);
    }
    
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        existingProduct.setCode(productDto.getCode());
        existingProduct.setName(productDto.getName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setImage(productDto.getImage());
        existingProduct.setCategory(productDto.getCategory());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setQuantity(productDto.getQuantity());
        existingProduct.setInternalReference(productDto.getInternalReference());
        existingProduct.setShellId(productDto.getShellId());
        existingProduct.setInventoryStatus(productDto.getInventoryStatus());
        existingProduct.setRating(productDto.getRating());
        
        Product updatedProduct = productRepository.save(existingProduct);
        return new ProductDto(updatedProduct);
    }
    
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}