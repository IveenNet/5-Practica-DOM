'use strict';

class Allergen {

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
    if (!value) ExceptionFactory.EmptyValueException("name");
    this.#name = value;
  }

  set description(value) {
    if (!value) ExceptionFactory.EmptyValueException("description");
    this.#description = value;
  }

  // Method to represent the object as a string
  toString() {
    return `Allergen: ${this.#name}, Description: ${this.#description}`;
  }
}

Object.defineProperty(Allergen.prototype, "name", { enumerable: true });
Object.defineProperty(Allergen.prototype, "description", { enumerable: true });