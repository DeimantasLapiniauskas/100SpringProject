package SpringProject._Spring.controller;

import SpringProject._Spring.dto.product.ProductMapping;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.model.Product;
import SpringProject._Spring.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Add new product", description = "Adds new product to the DB")
    @PostMapping("/products/add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> addProduct(@Valid @RequestBody ProductRequestDTO productRequestDTO) {
        Product product = productService.addNewProduct(productRequestDTO);

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(product.getId())
                                .toUri())
                .body(ProductMapping.toProductResponseDTO(product));
    }

}
