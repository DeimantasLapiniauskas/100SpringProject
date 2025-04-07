package SpringProject._Spring.exceptions;

public class EntityIdNotFoundException extends RuntimeException {
    public EntityIdNotFoundException(long id) {
        super("Entity with Id '" + id + "' does not exist!");
    }
}
