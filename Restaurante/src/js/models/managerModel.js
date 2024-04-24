'use strict';

import { Allergen } from "../enteties/Allergen.js";
import { Category } from "../enteties/Category.js";
import { Coordinate } from "../enteties/Coordinate.js";
import { Dish } from "../enteties/Dish.js";
import { Menu } from "../enteties/Menu.js";
import { Restaurant } from "../enteties/Restaurant.js";
import { ExceptionFactory } from "../exceptions/Exceptions.js";


const managerModel = (function () {

    let instanciated;

    class managerModel {

        #allergens;
        #categories;
        #dishes;
        #menus;
        #restaurants;

        constructor() {

            this.#allergens = new Map();
            this.#categories = new Map();
            this.#dishes = new Map();
            this.#menus = new Map();
            this.#restaurants = new Map();

        }

        //Getters
        getDishes() {
            return Array.from(this.#dishes.values());
        }

        getCategories() {
            return Array.from(this.#categories.values());
        }

        getMenus() {
            return Array.from(this.#menus.values());
        }

        getAllergens() {
            return Array.from(this.#allergens.values());
        }

        getRestaurants() {
            return Array.from(this.#restaurants.values());
        }

        //Add
        addCategory(...categories) {
            categories.forEach(category => {

                if (!(category instanceof Category)) throw ExceptionFactory.InvalidInstanceException('Category');
                if (this.#categories.has(category.name)) throw ExceptionFactory.ExistValueException(category.name);
                this.#categories.set(category.name, category);

            });

            return this;
        }

        addMenu(...menus) {
            menus.forEach(menu => {

                if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');
                if (this.#menus.has(menu.name)) throw ExceptionFactory.ExistValueException(menu.name);
                this.#menus.set(menu.name, menu);

            });

            return this;
        }

        addAllergen(...allergens) {
            allergens.forEach(allergen => {
                if (!(allergen instanceof Allergen)) throw ExceptionFactory.InvalidInstanceException('Allergen');
                if (this.#allergens.has(allergen.name)) throw ExceptionFactory.ExistValueException(allergen.name);
                this.#allergens.set(allergen.name, allergen);
            });

            return this;
        }

        addDish(...dishes) {
            dishes.forEach(dish => {
                if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');
                if (this.#dishes.has(dish.name)) throw ExceptionFactory.ExistValueException(dish.name);
                this.#dishes.set(dish.name, dish);
            });
            return this;
        }

        addRestaurant(...restaurants) {
            restaurants.forEach(restaurant => {
                if (!(restaurant instanceof Restaurant)) throw ExceptionFactory.InvalidInstanceException('Restaurant');
                if (this.#restaurants.has(restaurant.name)) throw ExceptionFactory.ExistValueException(restaurant.name);
                this.#restaurants.set(restaurant.name, restaurant);
            });

            return this;
        }

        //remove

        removeCategory(category) {
            let categoryName;

            if (category instanceof Category) {
                categoryName = category.name;
            } else if (typeof category === 'string') {
                categoryName = category;
            } else {
                throw ExceptionFactory.InvalidInstanceException('Category or Category name');
            }

            if (!this.#categories.has(categoryName)) {
                throw ExceptionFactory.NoExistValueException(categoryName);
            }

            this.#categories.delete(categoryName);

            this.#dishes.forEach(dish => {
                if (dish.categories.has(categoryName)) {
                    dish.categories.delete(categoryName);
                }
            });

            return this;
        }


        removeAllergen(allergen) {

            if (!(allergen instanceof Allergen)) throw ExceptionFactory.InvalidInstanceException('Allergen');
            if (!this.#allergens.has(allergen.name)) throw ExceptionFactory.NoExistValueException(allergen.name);

            this.#allergens.delete(allergen.name);

            this.#dishes.forEach(dish => {
                dish.allergens = dish.allergens.filter(al => al.name !== allergen.name);
            });

            return this;
        }

        removeDish(dish) {

            let dishName;

            // Verificar si 'dish' es una instancia de Dish o un string
            if (dish instanceof Dish) {
                dishName = dish.name;
            } else if (typeof dish === 'string') {
                dishName = dish;
            } else {
                throw ExceptionFactory.InvalidInstanceException('Dish or Dish name');
            }

            // Verificar si el plato existe
            if (!this.#dishes.has(dishName)) {
                throw ExceptionFactory.NoExistValueException(dishName);
            }

            // Eliminar el plato de todos los menús
            this.#menus.forEach(menu => {
                if (menu.dishes.has(dishName)) {
                    menu.dishes.delete(dishName);
                }
            });

            // Eliminar el plato del mapa de platos
            this.#dishes.delete(dishName);

            return this;
        }

        removeMenu(menu) {

            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');
            if (!this.#menus.has(menu.name)) throw ExceptionFactory.NoExistValueException(menu.name);

            this.#menus.delete(menu.name);

            return this;
        }

        removeRestaurant(restaurant) {

            if (!(restaurant instanceof Restaurant)) throw ExceptionFactory.InvalidInstanceException('Restaurant');
            if (!this.#restaurants.has(restaurant.name)) throw ExceptionFactory.NoExistValueException(restaurant.name);

            this.#restaurants.delete(restaurant.name);

            return this;
        }

        assignCategoryToDish(categories, dish) {
            if (typeof dish === 'string') {
                if (!this.#dishes.has(dish)) {
                    throw new Error(`No existe un plato con el nombre ${dish}`);
                }
                dish = this.#dishes.get(dish);
            } else if (!(dish instanceof Dish)) {
                throw ExceptionFactory.InvalidInstanceException('Dish');
            }

            categories.forEach(categoryName => {
                let category = this.#categories.get(categoryName);
                if (!category) {
                    throw new Error(`No existe una categoría con el nombre ${categoryName}`);
                }
                dish.categories.set(category.name, category);
            });

            return this;
        }

        assignAllergenToDish(allergen, dish) {
            if (typeof allergen === 'string') {
                if (!this.#allergens.has(allergen)) {
                    throw new Error(`No existe un alérgeno con el nombre ${allergen}`);
                }
                allergen = this.#allergens.get(allergen);
            } else if (!(allergen instanceof Allergen)) {
                throw ExceptionFactory.InvalidInstanceException('Allergen');
            }

            if (!(dish instanceof Dish)) {
                throw ExceptionFactory.InvalidInstanceException('Dish');
            }

            if (!this.#dishes.has(dish.name)) {
                this.#dishes.set(dish.name, dish);
            }

            dish.allergens.set(allergen.name, allergen);

            return this;
        }


        assignDishToMenu(menu, dishNames) {
            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');
            if (!Array.isArray(dishNames)) throw new Error('dishNames must be an array of dish names');

            if (!this.#menus.has(menu.name)) {
                this.#menus.set(menu.name, menu);
            }

            dishNames.forEach(dishName => {
                const dish = this.#dishes.get(dishName);
                if (dish) {
                    menu.dishes.set(dish.name, dish);
                } else {
                    console.warn(`Dish with name ${dishName} not found.`);
                }
            });

            return this;
        }


        deassignCategoryToDish(categories, dish) {
            if (!Array.isArray(categories)) {
                categories = [categories];
            }

            if (typeof dish === 'string') {
                if (!this.#dishes.has(dish)) {
                    throw ExceptionFactory.NoExistValueException(dish);
                }
                dish = this.#dishes.get(dish);
            } else if (!(dish instanceof Dish)) {
                throw ExceptionFactory.InvalidInstanceException('Dish');
            }

            categories.forEach(category => {
                if (typeof category === 'string') {
                    if (!this.#categories.has(category)) {
                        throw ExceptionFactory.NoExistValueException(category);
                    }
                    category = this.#categories.get(category);
                } else if (!(category instanceof Category)) {
                    throw ExceptionFactory.InvalidInstanceException('Category');
                }

                if (dish.categories.has(category.name)) {
                    dish.categories.delete(category.name);
                } else {
                    throw ExceptionFactory.NoExistValueException(`El plato no tiene la categoría ${category.name}`);
                }
            });

            return this;
        }


        deassignAllergenToDish(allergen, dish) {

            if (!(allergen instanceof Allergen)) throw ExceptionFactory.InvalidInstanceException('Allergen');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            if (!this.#allergens.has(allergen.name)) {
                throw ExceptionFactory.NoExistValueException(allergen.name);
            }
            if (!this.#dishes.has(dish.name)) {
                throw ExceptionFactory.NoExistValueException(dish.name);
            }

            dish.allergens.delete(allergen.name);

            return this;
        }

        deassignDishToMenu(menu, dish) {

            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');


            if (!this.#menus.has(menu.name)) {
                throw ExceptionFactory.NoExistValueException(menu.name);
            }
            if (!this.#dishes.has(dish.name)) {
                throw ExceptionFactory.NoExistValueException(dish.name);
            }

            menu.dishes.delete(dish.name);

            return this;
        }

        //cambiar posicion
        changeDishesPositionsInMenu(menu, dish1, dish2) {

            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');

            if (!(dish1 instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');
            if (!(dish2 instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            if (!menu.dishes.has(dish1.name) || !menu.dishes.has(dish2.name)) throw new Error('Uno o ambos platos no están registrados en el menú.');

            let newDishes = new Map();

            for (const [key, value] of menu.dishes.entries()) {

                if (key === dish1.name) {
                    newDishes.set(dish2.name, dish2);
                } else if (key === dish2.name) {
                    newDishes.set(dish1.name, dish1);
                } else {
                    newDishes.set(key, value);
                }
            }

            menu.dishes = newDishes;

            return this;
        }

        //Busqueda

        *getDishesInCategory(category) {

            if (!category) { throw ExceptionFactory.EmptyValueException('category name'); }

            for (const dish of this.#dishes.values()) {
                if (dish.categories.has(category)) { yield dish; }
            }

        }

        *getDishesWithAllergen(allergen) {

            if (!allergen) { throw ExceptionFactory.EmptyValueException('allergen name'); }

            for (const dish of this.#dishes.values()) {
                if (dish.allergens.has(allergen)) { yield dish; }
            }

        }

        *getDishesWithMenu(menu) {

            if (!menu) { throw ExceptionFactory.EmptyValueException('menu name'); }

            let menuSel = this.#menus.get(menu);

            for (const dish of menuSel.dishes.values()) {
                yield dish;
            }
        }

        *findDishes(criteria) {

            if (typeof criteria !== 'function') throw ExceptionFactory.FilterException('El criterio debe ser una función.');

            for (const dish of this.#dishes.values()) {

                if (criteria(dish)) { yield dish; }
            }

        }

        //Creates
        createDish(name, description = '', ingredients = new Map(), image = '', categories = new Map(), allergens = new Map()) {
            if (!name) {
                throw ExceptionFactory.EmptyValueException('name');
            }
        
            if (this.#dishes.has(name)) {
                return undefined;
            }
        
            let newDish = new Dish(name, description, ingredients, image, categories, allergens);
            this.#dishes.set(name, newDish);
        
            return newDish;
        }

        createMenu(name, description = '') {

            if (!name) { throw ExceptionFactory.EmptyValueException('name'); }

            if (this.#menus.has(name)) { return this.#menus.get(name); }

            let newMenu = new Menu(name, description);
            this.#menus.set(name, newMenu);
            return newMenu;

        }

        createAllergen(name, description = '') {

            if (!name) { throw ExceptionFactory.EmptyValueException('name'); }

            if (this.#allergens.has(name)) { return this.#allergens.get(name); }

            let newAllergen = new Allergen(name, description);
            this.#allergens.set(name, newAllergen);
            return newAllergen;
        }

        createCategory(name, description = '') {

            if (!name) { throw ExceptionFactory.EmptyValueException('name'); }

            if (this.#categories.has(name)) { return this.#categories.get(name); }

            let newCategory = new Category(name, description);
            this.#categories.set(name, newCategory);
            return newCategory;
        }

        createRestaurant(name, description = '', location = null) {

            if (!name) { throw ExceptionFactory.EmptyValueException('name'); }

            if (this.#restaurants.has(name)) { return this.#restaurants.get(name); }

            let newCoordinate = new Coordinate(location.latitude, location.longitude)
            let newRestaurant = new Restaurant(name, description, newCoordinate);

            this.#restaurants.set(name, newRestaurant);

            return newRestaurant;

        }

        [Symbol.iterator]() {
            return this;
        }
    }

    function init() { return new managerModel(); }

    return {

        getInstance: function () {

            if (!instanciated) instanciated = init();
            return instanciated;

        }

    };

})();

export default managerModel;