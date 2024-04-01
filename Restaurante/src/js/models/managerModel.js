'use strict';

import { Allergen } from "../enteties/Allergen.js";
import { Category } from "../enteties/Category.js";
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
        * getDishes() {
            for (const d of this.#dishes.values()) {
                yield d;
            }
        }

        * getCategories() {
            for (const c of this.#categories.values()) {
                yield c;
            }
        }

        * getMenus() {
            for (const m of this.#menus.values()) {
                yield m;
            }
        }

        * getAllergens() {
            for (const a of this.#allergens.values()) {
                yield a;
            }
        }

        * getRestaurants() {
            for (const r of this.#restaurants.values()) {
                yield r;
            }
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

            if (!(category instanceof Category)) throw ExceptionFactory.InvalidInstanceException('Category');
            if (this.#categories.has(category.name)) throw ExceptionFactory.NoExistValueException(category.name);

            this.#categories.delete(category.name);

            this.#dishes.forEach(dish => {
                dish.categories = dish.categories.filter(cat => cat.name !== category.name);
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

            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');
            if (!this.#dishes.has(dish.name)) throw ExceptionFactory.NoExistValueException(dish.name);

            this.#menus.forEach(menu => {
                menu.dishes = menu.dishes.filter(menuDish => menuDish.name !== dish.name);
            });

            this.#dishes.delete(dish.name);

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

        //Assiganmos platos, categorias ...
        assignCategoryToDish(category, dish) {

            if (!(category instanceof Category)) throw ExceptionFactory.InvalidInstanceException('Category');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            // Si Category no existe, añádimos
            if (!this.#categories.has(category.name)) {
                this.#categories.set(category.name, category);
            }

            // Si Dish no existe, añádimos
            if (!this.#dishes.has(dish.name)) {
                this.#dishes.set(dish.name, dish);
            }

            // Añade la categoría al Map de categorías del plato
            dish.categories.set(category.name, category);

            return this; // Permitir encadenamiento
        }

        assignAllergenToDish(allergen, dish) {

            if (!(allergen instanceof Allergen)) throw ExceptionFactory.InvalidInstanceException('Allergen');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            // Si el alérgeno no existe, lo añadimos al sistema
            if (!this.#allergens.has(allergen.name)) {
                this.#allergens.set(allergen.name, allergen);
            }

            // Si el plato no existe, lo añadimos al sistema
            if (!this.#dishes.has(dish.name)) {
                this.#dishes.set(dish.name, dish);
            }

            // Añade el alérgeno al Map de alérgenos del plato
            dish.allergens.set(allergen.name, allergen);

            return this; // Permitir encadenamiento
        }

        assignDishToMenu(menu, dish) {

            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            // Si el Menu no existe, lo añadimos al sistema
            if (!this.#menus.has(menu.name)) {
                this.#menus.set(menu.name, menu);
            }

            // Si el Dish no existe, lo añadimos al sistema
            if (!this.#dishes.has(dish.name)) {
                this.#dishes.set(dish.name, dish);
            }

            // Añade el Dish al Map de dishes del Menu
            menu.dishes.set(dish.name, dish);

            return this;
        }

        //Desasignar
        deassignCategoryToDish(category, dish) {

            if (!(category instanceof Category)) throw ExceptionFactory.InvalidInstanceException('Category');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            // Verificar si la categoría y el plato están registrados
            if (!this.#categories.has(category.name)) {
                throw ExceptionFactory.NoExistValueException(category.name);
            }
            if (!this.#dishes.has(dish.name)) {
                throw ExceptionFactory.NoExistValueException(dish.name);
            }

            // Desasignar la categoría del plato
            dish.categories.delete(category.name);

            return this; // Permitir encadenamiento
        }

        deassignAllergenToDish(allergen, dish) {

            if (!(allergen instanceof Allergen)) throw ExceptionFactory.InvalidInstanceException('Allergen');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            // Verificar si el alérgeno y el plato están registrados
            if (!this.#allergens.has(allergen.name)) {
                throw ExceptionFactory.NoExistValueException(allergen.name);
            }
            if (!this.#dishes.has(dish.name)) {
                throw ExceptionFactory.NoExistValueException(dish.name);
            }

            // Desasignar el alérgeno del plato
            dish.allergens.delete(allergen.name);

            return this; // Permitir encadenamiento
        }

        deassignDishToMenu(menu, dish) {

            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');
            if (!(dish instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            // Verificar si el menú y el plato están registrados
            if (!this.#menus.has(menu.name)) {
                throw ExceptionFactory.NoExistValueException(menu.name);
            }
            if (!this.#dishes.has(dish.name)) {
                throw ExceptionFactory.NoExistValueException(dish.name);
            }

            menu.dishes.delete(dish.name);

            return this; // Permitir encadenamiento
        }

        //cambiar posicion
        changeDishesPositionsInMenu(menu, dish1, dish2) {

            if (!(menu instanceof Menu)) throw ExceptionFactory.InvalidInstanceException('Menu');

            if (!(dish1 instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');
            if (!(dish2 instanceof Dish)) throw ExceptionFactory.InvalidInstanceException('Dish');

            if (!menu.dishes.has(dish1.name) || !menu.dishes.has(dish2.name)) throw new Error('Uno o ambos platos no están registrados en el menú.');

            // Crear un nuevo Map temporal con los platos en el nuevo orden
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

            // Reemplazar el Map antiguo con el nuevo
            menu.dishes = newDishes;

            return this; // Permitir encadenamiento
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

            if (!name) { throw ExceptionFactory.EmptyValueException('name'); }

            // Verificar si el plato ya existe
            if (this.#dishes.has(name)) { return this.#dishes.get(name); }

            // Crear un nuevo plato si no existe
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

            let newRestaurant = new Restaurant(name, description, location);
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