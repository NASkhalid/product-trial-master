package com.alten.shop.controller;

import com.alten.shop.dto.CartItemDto;
import com.alten.shop.model.User;
import com.alten.shop.service.CartService;
import com.alten.shop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<CartItemDto>> getCartItems(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<CartItemDto> cartItems = cartService.getCartItems(user);
        return ResponseEntity.ok(cartItems);
    }
    
    @PostMapping
    public ResponseEntity<CartItemDto> addToCart(@Valid @RequestBody CartItemDto cartItemDto,
                                                Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        CartItemDto addedItem = cartService.addToCart(user, cartItemDto.getProductId(), cartItemDto.getQuantity());
        return ResponseEntity.ok(addedItem);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CartItemDto> updateCartItem(@PathVariable Long id,
                                                    @RequestBody Map<String, Integer> request,
                                                    Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        Integer quantity = request.get("quantity");
        CartItemDto updatedItem = cartService.updateCartItem(user, id, quantity);
        return ResponseEntity.ok(updatedItem);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long id, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        cartService.removeFromCart(user, id);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping
    public ResponseEntity<?> clearCart(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }
}