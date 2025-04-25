package SpringProject._Spring.dto.product.category;

import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.product.Category;
import SpringProject._Spring.repository.product.CategoryRepository;

import java.util.List;

public class CategoryMapper {

    public static Category toCategoryFromDTO(CategoryDTO categoryDTO, CategoryRepository categoryRepository) {
        return categoryRepository.findByName(categoryDTO.name()).orElseThrow(() -> new NotFoundException("Category with name '" + categoryDTO.name() + "' not found"));
    }

    public static List<Category> toCategoryListFromDTO(List<CategoryDTO> categoryDTOList, CategoryRepository categoryRepository) {
        return categoryDTOList.stream()
                .map(categoryDTO -> toCategoryFromDTO(categoryDTO, categoryRepository))
                .toList();
    }

    public static CategoryDTO toCategoryDTO(Category category) {
        return new CategoryDTO(category.getName());
    }

    public static List<CategoryDTO> toCategoryDTOList(List<Category> categories) {
        return categories.stream()
                .map(CategoryMapper::toCategoryDTO)
                .toList();
    }
}
