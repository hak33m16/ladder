export class System {
    constructor(name, eventManager = null) {
        this.name = name;
        this.eventManager = eventManager;
    }

    getName() {
        return this.name;
    }

    update() {
        // Emulate pure virtuals :)
        throw new Error(
            'update() must be redefined in concrete of class System'
        );
    }

    setEntityManager(entityManager) {
        this.entityManager = entityManager;
    }
}
