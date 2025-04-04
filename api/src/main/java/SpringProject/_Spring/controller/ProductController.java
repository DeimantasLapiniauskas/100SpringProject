package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.product.*;
import SpringProject._Spring.model.Product;
import SpringProject._Spring.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController extends BaseController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Add new product", description = "Adds new product to the DB")
    @PostMapping("/products/add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ProductResponseDTO> addProduct(@Valid @RequestBody ProductRequestDTO productRequestDTO) {
        Product product = productService.addNewProduct(productRequestDTO);

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(product.getId())
                                .toUri())
                .body(ProductMapping.toProductResponseDTO(product));
    }

    @Operation(summary = "Get product page", description = "Get all products and split them by pages")
    @GetMapping("/products/pagination")
    public ResponseEntity<ApiResponse<ProductPageResponseDTO>> getProductsPage(@RequestParam int page,
                                                                               @RequestParam int size,
                                                                               @RequestParam(required = false) String sort) {
        ProductPageResult result = productService.findAllProductsPage(page, size, sort);
        return ok(result.data(), result.message());
    }

}
