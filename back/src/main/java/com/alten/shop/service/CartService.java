package com.alten.shop.service;

import com.alten.shop.dto.CartItemDto;
import com.alten.shop.model.CartItem;
import com.alten.shop.model.Product;
import com.alten.shop.model.User;
import com.alten.shop.repository.CartItemRepository;
import com.alten.shop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartService {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<CartItemDto> getCartItems(User user) {
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        return cartItems.stream()
                .map(CartItemDto::new)
                .collect(Collectors.toList());
    }
    
    public CartItemDto addToCart(User user, Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        CartItem existingItem = cartItemRepository.findByUserAndProduct(user, product)
                .orElse(null);
        
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            CartItem savedItem = cartItemRepository.save(existingItem);
            return new CartItemDto(savedItem);
        } else {
            CartItem newItem = new CartItem(user, product, quantity);
            CartItem savedItem = cartItemRepository.save(newItem);
            return new CartItemDto(savedItem);
        }
    }
    
    public CartItemDto updateCartItem(User user, Long cartItemId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        cartItem.setQuantity(quantity);
        CartItem savedItem = cartItemRepository.save(cartItem);
        return new CartItemDto(savedItem);
    }
    
    public void removeFromCart(User user, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        cartItemRepository.delete(cartItem);
    }
    
    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }
}