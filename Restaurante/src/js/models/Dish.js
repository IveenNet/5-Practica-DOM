'use strict';

class Dish {

    #name;
    #description;
    #ingredients;
    #image;
    #categories;
    #allergens;

    constructor(name, description = '', ingredients = new Map(), image = '', categories = new Map(), allergens = new Map()) {

        if (!name) ExceptionFactory.EmptyValueException('name');

        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image; // URL or path of the image
        this.#categories = categories;
        this.#allergens = allergens;

    }

    // Getters
    get name() { return this.#name; }
    get description() { return this.#description; }
    get ingredients() { return this.#ingredients; }
    get image() { return this.#image; }
    get categories() { return this.#categories; }
    get allergens() { return this.#allergens; }


    // Setters
    set name(value) {
        if (!value) ExceptionFactory.EmptyValueException('name');
        this.#name = value;
    }

    set description(value) {
        if (!value) ExceptionFactory.EmptyValueException('description');
        this.#description = value;
    }

    set image(value) {
        if (!value) ExceptionFactory.EmptyValueException('image');
        this.#image = value;
    }

    //add ingredient, category or allergen
    addIngredient(value) { if (!this.#ingredients.has(value)) this.#ingredients.add(value); }
    addCategory(value) { if (!this.#categories.has(value)) this.#categories.add(value); }
    addAllergen(value) { if (!this.#allergens.has(value)) this.#allergens.add(value); }

    //remove category, 
    removeIngredient(value) { if (this.#ingredients.has(value)) this.#ingredients.delete(value); }
    removeCategory(value) { if (this.#categories.has(value)) this.#categories.delete(value); }
    removeAllergen(value) { if (this.#allergens.has(value)) this.#allergens.delete(value); }

    // Method to represent the object as a string
    toString() {
        return `Dish: ${this.#name}, Description: ${this.#description}, Image: ${this.#image},
        Ingredients: ${this.#ingredients.join(', ')},  
        Categories: ${this.#categories.join(', ')}, 
        Allergens: ${this.#allergens.join(', ')}`;
    }
}

Object.defineProperty(Dish.prototype, 'name', { enumerable: true });
Object.defineProperty(Dish.prototype, 'description', { enumerable: true });
Object.defineProperty(Dish.prototype, 'image', { enumerable: true });
Object.defineProperty(Dish.prototype, 'ingredients', { enumerable: true });
Object.defineProperty(Dish.prototype, 'categories', { enumerable: true });
Object.defineProperty(Dish.prototype, 'allergens', { enumerable: true });