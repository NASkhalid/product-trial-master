package com.alten.shop.repository;

import com.alten.shop.model.WishlistItem;
import com.alten.shop.model.User;
import com.alten.shop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUser(User user);
    Optional<WishlistItem> findByUserAndProduct(User user, Product product);
}