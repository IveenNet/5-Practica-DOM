'use strict';

class Restaurant {

  #name;
  #description;
  #location;

  constructor(name, description = '', location = null) {

    if (!name) ExceptionFactory.EmptyValueException('name');

    this.name = name;
    this.description = description;
    this.location = location; // Esto debería ser una instancia de Coordinate o null

  }

  // Getters

  get name() { return this.#name; }
  get description() { return this.#description; }
  get location() { return this.#location; }

  // Setters
  set name(value) {
    if (!value) ExceptionFactory.EmptyValueException('name');
    this.#name = value;
  }

  set description(value) {
    if (!value) ExceptionFactory.EmptyValueException('description');
    this.#description = value;
  }

  set location(value) {
    if (!value) ExceptionFactory.EmptyValueException('location');
    this.#location = value;
  }

  // Método para representar el objeto como una cadena de texto
  toString() {
    return `Restaurant: ${this.name}, Description: ${this.description}, 
    Location: ${this.location ? this.location.toString() : 'Not specified'}`;
  }

}

Object.defineProperty(Restaurant.prototype, 'name', { enumerable: true });
Object.defineProperty(Restaurant.prototype, 'description', { enumerable: true });
Object.defineProperty(Restaurant.prototype, 'location', { enumerable: true });
