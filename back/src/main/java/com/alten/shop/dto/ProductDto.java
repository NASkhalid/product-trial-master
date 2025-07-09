package com.alten.shop.dto;

import com.alten.shop.model.Product;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class ProductDto {
    
    private Long id;
    
    @NotBlank
    private String code;
    
    @NotBlank
    private String name;
    
    private String description;
    
    private String image;
    
    @NotBlank
    private String category;
    
    @NotNull
    @PositiveOrZero
    private Double price;
    
    @NotNull
    @PositiveOrZero
    private Integer quantity;
    
    private String internalReference;
    
    private Long shellId;
    
    private Product.InventoryStatus inventoryStatus;
    
    @PositiveOrZero
    private Integer rating;
    
    private Long createdAt;
    
    private Long updatedAt;
    
    // Constructors
    public ProductDto() {}
    
    public ProductDto(Product product) {
        this.id = product.getId();
        this.code = product.getCode();
        this.name = product.getName();
        this.description = product.getDescription();
        this.image = product.getImage();
        this.category = product.getCategory();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
        this.internalReference = product.getInternalReference();
        this.shellId = product.getShellId();
        this.inventoryStatus = product.getInventoryStatus();
        this.rating = product.getRating();
        this.createdAt = product.getCreatedAt();
        this.updatedAt = product.getUpdatedAt();
    }
    
    public Product toEntity() {
        Product product = new Product();
        product.setId(this.id);
        product.setCode(this.code);
        product.setName(this.name);
        product.setDescription(this.description);
        product.setImage(this.image);
        product.setCategory(this.category);
        product.setPrice(this.price);
        product.setQuantity(this.quantity);
        product.setInternalReference(this.internalReference);
        product.setShellId(this.shellId);
        product.setInventoryStatus(this.inventoryStatus);
        product.setRating(this.rating);
        return product;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    
    public String getInternalReference() { return internalReference; }
    public void setInternalReference(String internalReference) { this.internalReference = internalReference; }
    
    public Long getShellId() { return shellId; }
    public void setShellId(Long shellId) { this.shellId = shellId; }
    
    public Product.InventoryStatus getInventoryStatus() { return inventoryStatus; }
    public void setInventoryStatus(Product.InventoryStatus inventoryStatus) { this.inventoryStatus = inventoryStatus; }
    
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    
    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }
    
    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
}