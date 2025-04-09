package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.product.*;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
    public ResponseEntity<ApiResponse<ProductPageResponseDTO>> getProductsPage(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String sort
    ) {
        ProductPageResult result = productService.findAllProductsPage(page, size, sort);
        return ok(result.data(), result.message());
    }

    @Operation(summary = "Update product information", description = "Updates product information by its unique ID")
    @PutMapping("/products/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> updateProduct(
            @PathVariable long id,
            @Valid @RequestBody ProductRequestDTO productRequestDTO
    ) {
        Product updatedProduct = productService.updateProduct(id, productRequestDTO);

        return ok(ProductMapping.toProductResponseDTO(updatedProduct), "Product updated successfully");
    }

    @Operation(summary = "Get product by ID", description = "Retrieves a product by its unique ID")
    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> getProductById(@PathVariable long id) {
        return ok(ProductMapping.toProductResponseDTO(productService.findProductById(id)));
    }

    @Operation(summary = "Delete product by ID", description = "Deletes product by it's unique ID")
    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);

        return noContent();
    }
}
