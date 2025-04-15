package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.product.*;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController extends BaseController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private S3Client s3Client;

    @Operation(summary = "Add new product", description = "Adds new product to the DB")
    @PostMapping("/products")
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


    //TODO: move inner logic to Mapper and Service
    @PostMapping(value = "/products/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> uploadImage(@RequestPart("file") MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            return badRequest(null, "File must have a valid name");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return badRequest(null, "Only image files are allowed");
        }

        long maxFileSize = 5 * 1024 * 1024;
        if (file.getSize() > maxFileSize) {
            return badRequest(null, "File too large. Max allowed size is 5MB.");
        }

        String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(originalFilename);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(contentType)
                //.metadata(Map.of("Access-Control-Allow-Origin", "*"))
                .build();
        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromInputStream(
                file.getInputStream(), file.getSize()));

        String fileUrl = String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName);

        return ok(fileUrl, "Image uploaded successfully");
    }
}
