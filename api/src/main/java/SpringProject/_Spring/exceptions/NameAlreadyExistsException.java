package SpringProject._Spring.exceptions;

public class NameAlreadyExistsException extends RuntimeException {
    public NameAlreadyExistsException(String entityName, String name) {
        super(entityName + ": Name '" + name + "' already exists");
    }
}
