'use strict';

class Menu {

  #name;
  #description;
  #dishes;

  constructor(name, description = '') {

    if (!name) ExceptionFactory.EmptyValueException('name');

    this.#name = name;
    this.#description = description;
    this.#dishes = new Map(); // Inicializamos lalista de platos como vacía
  }

  // Getters
  get name() { return this.#name; }
  get description() { return this.#description; }
  get dishes() { return this.#dishes; }

  // Setters
  set name(value) {
    if (!value) ExceptionFactory.EmptyValueException('name');
    this.#name = value;
  }

  set description(value) {
    if (!value) ExceptionFactory.EmptyValueException('description');
    this.#description = value;
  }

  //Add dish
  addDish(value) { if (!this.#dishes.has(value)) this.#dishes.add(value); }

  //remove dish 
  removeAdd(value) { if (this.#dishes.has(value)) this.#dishes.delete(value); }

  // Método para representar el objeto como una cadena de texto
  toString() {
    return `Menu: ${this.#name}, Description: ${this.#description}, 
    Dishes: ${this.dishes.join(', ')}`;
  }
}

Object.defineProperty(Menu.prototype, 'name', { enumerable: true });
Object.defineProperty(Menu.prototype, 'description', { enumerable: true });
Object.defineProperty(Menu.prototype, 'dishes', { enumerable: true });
