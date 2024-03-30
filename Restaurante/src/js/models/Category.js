'use strict';

class Category {
    
    #name;
    #description;

    constructor(name, description = '') {
        if (!name) ExceptionFactory.EmptyValueException('name');

        this.#name = name;
        this.#description = description;
    }

    // Getters
    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }

    // Setters
    set name(value) {
        if (!value) ExceptionFactory.EmptyValueException('name');
        this.#name = value;
    }

    set description(value) {
        if (!value) ExceptionFactory.EmptyValueException('name');
        this.#description = value;
    }

    // Method to represent the object as a string
    toString() {
        return `Category: ${this.#name}, Description: ${this.#description}`;
    }
}

Object.defineProperty(Category.prototype, 'name', { enumerable: true });
Object.defineProperty(Category.prototype, 'name', { enumerable: true });
