package com.alten.shop.dto;

import com.alten.shop.model.CartItem;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CartItemDto {
    
    private Long id;
    
    @NotNull
    private Long productId;
    
    @NotNull
    @Positive
    private Integer quantity;
    
    private ProductDto product;
    
    // Constructors
    public CartItemDto() {}
    
    public CartItemDto(CartItem cartItem) {
        this.id = cartItem.getId();
        this.productId = cartItem.getProduct().getId();
        this.quantity = cartItem.getQuantity();
        this.product = new ProductDto(cartItem.getProduct());
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public ProductDto getProduct() { return product; }
    public void setProduct(ProductDto product) { this.product = product; }
}