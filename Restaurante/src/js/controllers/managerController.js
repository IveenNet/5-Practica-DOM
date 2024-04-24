'use strict';

import { Allergen } from '../enteties/Allergen.js';
import { Category } from '../enteties/Category.js';
import { Dish } from '../enteties/Dish.js';
import { Menu } from '../enteties/Menu.js';
import { Coordinate } from '../enteties/Coordinate.js';
import { Restaurant } from '../enteties/Restaurant.js';

const MODEL = Symbol('managerModel');
const VIEW = Symbol('managerView');
const LOAD_MANAGER_OBJECTS = Symbol('Load Manager Objects');

class managerController {

    constructor(modelManager, viewManager) {

        this[MODEL] = modelManager;
        this[VIEW] = viewManager;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();

        // Enlazamos handlers con la vista
        this[VIEW].bindInit(this.handleInit);
        this[VIEW].bindCategoryClick(this.handleDishesCategoryList);
        this[VIEW].bindAllergenClick(this.handleDishesAllergenList);
        this[VIEW].bindMenuClick(this.handleDishesMenuList);
        this[VIEW].bindRestaurantClick(this.handleRestaurantList);
        this[VIEW].bindDishClick(this.handleDishClick);
        this[VIEW].bindCreateDishForm(this.handleCreateDishForm);
        this[VIEW].bindDeleteDishForm(this.handleDeleteDish);
        this[VIEW].bindCreateCategoryForm(this.handleCreateCategory);
        this[VIEW].bindDeleteCategoryForm(this.handleDeleteCategory);
        this[VIEW].bindCreateRestaurantForm(this.handleCreateRestaurant);
        this[VIEW].bindModifyDishCategoryForm(this.handleModifyDishCategories);
        this[VIEW].bindManageMenuForm(this.handleManageMenuForm);

        //Saber en que display estamos
        this.currentDisplayType = null;
        this.currentDisplayKey = null;
    }

    [LOAD_MANAGER_OBJECTS]() {

        // Crear Alérgenos
        let alergenoGluten = new Allergen('Gluten', 'Presente en trigo y otros cereales');
        let alergenoLactosa = new Allergen('Lactosa', 'Presente en leche y derivados lácteos');
        let alergenoFrutosSecos = new Allergen('Frutos Secos', 'Incluye almendras, nueces, etc.');
        let alergenoMariscos = new Allergen('Mariscos', 'Incluye camarones, langostas, etc.');

        // Crear Categorías
        let categoriaEntrantes = new Category('Entrantes', 'Platos ligeros para comenzar tu comida');
        let categoriaPrincipales = new Category('Principales', 'Platos fuertes para el plato principal');
        let categoriaPostres = new Category('Postres', 'Dulces delicias para terminar tu comida');

        // Platos de la categoría 'Entrantes'
        let gazpacho = new Dish('Gazpacho', 'Sopa fría de tomate', new Map([['Tomate', 200], ['Pimiento', 50]]), 'assets/img/gazpacho.jpg');
        let ensaladaCaprese = new Dish('Ensalada Caprese', 'Ensalada con tomate, mozzarella y albahaca', new Map([['Tomate', 100], ['Mozzarella', 50]]), 'assets/img/ensaladaCaprese.jpg');
        let bruschetta = new Dish('Bruschetta', 'Pan tostado con tomate y albahaca', new Map([['Pan', 1], ['Tomate', 100]]), 'assets/img/bruschetta.jpg');
        let croquetasJamon = new Dish('Croquetas de Jamón', 'Croquetas cremosas de jamón serrano', new Map([['Jamón', 100], ['Leche', 200]]), 'assets/img/croquetasJamon.jpg');

        // Platos de la categoría 'Principales'
        let paella = new Dish('Paella', 'Paella de mariscos', new Map([['Arroz', 200], ['Mariscos', 300]]), 'assets/img/paella.jpg');
        let carbonara = new Dish('Pasta Carbonara', 'Pasta con salsa de queso y pimienta', new Map([['Pasta', 200], ['Bacon', 100]]), 'assets/img/carbonara.jpg');
        let pizzaMargherita = new Dish('Pizza Margherita', 'Pizza con tomate, mozzarella y albahaca', new Map([['Masa de pizza', 1], ['Tomate', 150]]), 'assets/img/pizzaMargherita.jpg');
        let corderoAsado = new Dish('Cordero Asado', 'Cordero asado con hierbas', new Map([['Cordero', 500], ['Romero', 10]]), 'assets/img/corderoAsado.jpg');

        // Platos de la categoría 'Postres'
        let tiramisu = new Dish('Tiramisú', 'Postre italiano con mascarpone', new Map([['Mascarpone', 250], ['Café', 100]]), 'assets/img/tiramisu.jpg');
        let flan = new Dish('Flan', 'Flan de huevo tradicional', new Map([['Leche', 200], ['Huevo', 3]]), '     assets/img/flan.jpg');
        let pastelDeZanahoria = new Dish('Pastel de Zanahoria', 'Bizcocho de zanahoria y nueces', new Map([['Zanahoria', 150], ['Nueces', 50]]), 'assets/img/pastelDeZanahoria.jpg');
        let cheesecake = new Dish('Cheesecake', 'Tarta de queso cremosa', new Map([['Queso crema', 200], ['Galleta', 100]]), 'assets/img/cheesecake.jpg');

        // Crear Menús
        let menuChef = new Menu('Menú del Chef', 'Una selección especial de nuestros platos más innovadores y populares, escogidos personalmente por nuestro chef.');
        let menuTradicional = new Menu('Menú Tradicional', 'Descubre los sabores clásicos con nuestra selección de platos tradicionales que te harán sentir como en casa.');
        let menuVegetariano = new Menu('Menú Vegetariano', 'Una deliciosa variedad de opciones vegetarianas llenas de sabor y nutrición para satisfacer a todos.');

        // Crear Ubicaciones para los Restaurantes
        let location1 = new Coordinate(40.416775, -3.703790); // Madrid, España
        let location2 = new Coordinate(41.385064, 2.173404); // Barcelona, España
        let location3 = new Coordinate(37.774929, -122.419416); // San Francisco, EE. UU.

        // Crear Restaurantes
        let restaurant1 = new Restaurant('La Buena Paella', 'Especializados en paellas variadas y mariscos frescos.', location1);
        let restaurant2 = new Restaurant('Tapas Creativas', 'Un innovador enfoque en tapas españolas con ingredientes de temporada.', location2);
        let restaurant3 = new Restaurant('Sabor Mediterráneo', 'Cocina mediterránea auténtica en el corazón de San Francisco.', location3);

        //Añadimos los ejemplos 
        this[MODEL].addAllergen(alergenoGluten, alergenoLactosa, alergenoFrutosSecos, alergenoMariscos);
        this[MODEL].addCategory(categoriaEntrantes, categoriaPrincipales, categoriaPostres);

        let platosEntrantes = [gazpacho, ensaladaCaprese, bruschetta, croquetasJamon];
        let platosPrincipales = [paella, carbonara, pizzaMargherita, corderoAsado];
        let platosPostres = [tiramisu, flan, pastelDeZanahoria, cheesecake];

        platosEntrantes.forEach(plato => {
            this[MODEL].addDish(plato);
            this[MODEL].assignCategoryToDish([categoriaEntrantes.name], plato);
        });

        platosPrincipales.forEach(plato => {
            this[MODEL].addDish(plato);
            this[MODEL].assignCategoryToDish([categoriaPrincipales.name], plato);
        });

        platosPostres.forEach(plato => {
            this[MODEL].addDish(plato);
            this[MODEL].assignCategoryToDish([categoriaPostres.name], plato);
        });

        [gazpacho, paella, bruschetta, pizzaMargherita, ensaladaCaprese].forEach(plato => this[MODEL].assignAllergenToDish(alergenoGluten, plato));
        [pizzaMargherita, corderoAsado, bruschetta, flan, tiramisu].forEach(plato => this[MODEL].assignAllergenToDish(alergenoLactosa, plato));
        [pizzaMargherita, paella, croquetasJamon, flan, carbonara].forEach(plato => this[MODEL].assignAllergenToDish(alergenoFrutosSecos, plato));
        [ensaladaCaprese, corderoAsado, bruschetta, flan, tiramisu].forEach(plato => this[MODEL].assignAllergenToDish(alergenoMariscos, plato));

        this[MODEL].addMenu(menuChef, menuTradicional, menuVegetariano);
        [gazpacho, paella, tiramisu].forEach(plato => this[MODEL].assignDishToMenu(menuChef, [plato.name]));
        [bruschetta, corderoAsado, flan].forEach(plato => this[MODEL].assignDishToMenu(menuTradicional, [plato.name]));
        [ensaladaCaprese, pizzaMargherita, pastelDeZanahoria].forEach(plato => this[MODEL].assignDishToMenu(menuVegetariano, [plato.name]));

        this[MODEL].addRestaurant(restaurant1, restaurant2, restaurant3);
    }

    onLoad = () => {
        this[LOAD_MANAGER_OBJECTS]();
        this[VIEW].displayCategoriesMenu(this[MODEL].getCategories())
        this[VIEW].displayAllergenMenu(this[MODEL].getAllergens())
        this[VIEW].displayMenusMenu(this[MODEL].getMenus())
        this[VIEW].displayRestaurantMenu(this[MODEL].getRestaurants())
        this[VIEW].displayCreateDishForm(this[MODEL].getCategories(), this[MODEL].getAllergens());
    };

    getRandomDishes(dishes, count) {
        const shuffled = dishes.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    onInit = () => {
        let dishes = Array.from(this[MODEL].getDishes());
        let randomDishes = this.getRandomDishes(dishes, 3);
        this[VIEW].init(this[MODEL].getCategories(), this[MODEL].getMenus(), randomDishes);
        this[VIEW].bindFormButtons(
            () => Array.from(this[MODEL].getDishes()),
            () => Array.from(this[MODEL].getCategories()),
            () => Array.from(this[MODEL].getAllergens()),
            () => Array.from(this[MODEL].getMenus())
        );
        this.currentDisplayType = null;
        this.currentDisplayKey = null;
    };

    handleInit = () => {
        this.onInit();
    };

    handleDishesCategoryList = (name) => {
        this.currentDisplayType = 'category';
        this.currentDisplayKey = name;
        this[VIEW].updateBreadcrumb([
            { name: 'Inicio', link: '#' },
            { name: 'Categorías', link: '#categorias' },
            { name: name }
        ]);
        let dishes = Array.from(this[MODEL].getDishesInCategory(name));
        this[VIEW].displayDishesByCategory(dishes, name);
    };

    handleDishesAllergenList = (name) => {
        this.currentDisplayType = 'allergen';
        this.currentDisplayKey = name;
        this[VIEW].updateBreadcrumb([
            { name: 'Inicio', link: '#' },
            { name: 'Alergénos', link: '#' },
            { name: name }
        ]);
        this[VIEW].displayDishesByAllergen(this[MODEL].getDishesWithAllergen(name), name);
    };

    handleDishesMenuList = (name) => {
        this.currentDisplayType = 'menu';
        this.currentDisplayKey = name;
        this[VIEW].updateBreadcrumb([
            { name: 'Inicio', link: '#' },
            { name: 'Menus', link: '#' },
            { name: name }
        ]);
        this[VIEW].displayDishesByMenu(this[MODEL].getDishesWithMenu(name), name);
    };

    handleRestaurantList = (name) => {
        this.currentDisplayType = 'restaurant';
        this.currentDisplayKey = name;
        this[VIEW].updateBreadcrumb([
            { name: 'Inicio', link: '#' },
            { name: 'Restaurantes', link: '#' },
            { name: name }
        ]);

        let restaurants = this[MODEL].getRestaurants();

        for (let restaurant of restaurants) {
            if (restaurant.name === name) {
                this[VIEW].displayRestaurantInfo(restaurant);
                return;
            }
        }
    };

    handleDishClick = (dishName) => {
        this.currentDisplayType = 'dish';
        this.currentDisplayKey = dishName;
        this[VIEW].updateBreadcrumb([
            { name: 'Inicio', link: '#' },
            { name: 'Plato', link: '#' },
            { name: dishName }
        ]);

        let restaurants = this[MODEL].getRestaurants();

        for (let restaurant of restaurants) {
            if (restaurant.name === name) {
                this[VIEW].displayRestaurantInfo(restaurant);
                return;
            }
        }
        let dish = [...this[MODEL].findDishes((dish) => dish.name === dishName)];
        if (dish.length > 0) {
            this[VIEW].displayDishInfo(dish[0]);
        } else {
            console.error(`No se encontró el plato con el nombre "${dishName}"`);
        }
    };

    handleCreateDishForm = (dishData) => {
        try {
            let newDish = this[MODEL].createDish(
                dishData.name,
                dishData.description,
                new Map(),
                dishData.image,
                new Map(),
                new Map()
            );
    
            if (newDish) {
                this[MODEL].assignCategoryToDish(dishData.category, newDish);
    
                dishData.allergens.forEach(allergenName => {
                    this[MODEL].assignAllergenToDish(allergenName, newDish);
                });
    
                this[VIEW].resetForm();
                this.refreshDishesDisplay();
                this[VIEW].displaySuccessMessage('Plato creado con éxito');
            } else {
                this[VIEW].displayErrorMessage(`El plato ${dishData.name} ya existe`);
            }
    
        } catch (error) {
            this[VIEW].displayErrorMessage('Error al crear el plato: ' + error.message);
        }
    };

    handleDeleteDish = (dishName) => {
        try {

            this[MODEL].removeDish(dishName);

            this[VIEW].resetForm();
            this[VIEW].displayDeleteDishForm(Array.from(this[MODEL].getDishes()));

            this.refreshDishesDisplay();

            this[VIEW].displaySuccessMessage('Plato eliminado correctamente.');

        } catch (error) {

            this[VIEW].displayErrorMessage('Error al eliminar el plato: ' + error.message);
        }

    };

    refreshDishesDisplay = () => {

        if (this.currentDisplayType && this.currentDisplayKey) {

            switch (this.currentDisplayType) {
                case 'category':
                    this[VIEW].displayDishesByCategory(this[MODEL].getDishesInCategory(this.currentDisplayKey), this.currentDisplayKey);
                    break;
                case 'menu':
                    this[VIEW].displayDishesByMenu(this[MODEL].getDishesWithMenu(this.currentDisplayKey), this.currentDisplayKey);
                    break;
                case 'allergen':
                    this[VIEW].displayDishesByAllergen(this[MODEL].getDishesWithAllergen(this.currentDisplayKey), this.currentDisplayKey);
                    break;
                default:
                    console.warn('Unknown display type:', this.currentDisplayType);
            }
        }
    };

    handleCreateCategory = (categoryData) => {

        try {
            this[MODEL].addCategory(new Category(categoryData.name, categoryData.description));
            this[VIEW].displaySuccessMessage(`Categoría ${categoryData.name} creada con éxito.`);
            this.refreshCategoriesView();
            this[VIEW].resetForm();
        } catch (error) {
            this[VIEW].displayErrorMessage('Error al crear la categoría: ' + error.message);
        }

    };

    handleDeleteCategory = (categoryName) => {

        try {
            this[MODEL].removeCategory(categoryName);
            this[VIEW].displaySuccessMessage('Categoría eliminada con éxito.');

            if (this.currentDisplayKey === categoryName) {

                this[VIEW].displayRandomDishes(this.getRandomDishes(Array.from(this[MODEL].getDishes()), 3));

            }

            this.refreshCategoriesView();
            this[VIEW].displayDeleteCategoryForm(Array.from(this[MODEL].getCategories()));

        } catch (error) {
            this[VIEW].displayErrorMessage('Error al eliminar la categoría: ' + error.message);
        }
    };

    refreshCategoriesView = () => {
        const categories = Array.from(this[MODEL].getCategories());
        this[VIEW].displayCategoriesMenu(categories);
        this[VIEW].displayCategories(categories);
    };

    handleCreateRestaurant = (restaurantData) => {

        try {

            this[MODEL].createRestaurant(
                restaurantData.name,
                restaurantData.description,
                restaurantData.location
            );

            this[VIEW].displayRestaurantMenu(Array.from(this[MODEL].getRestaurants()));
            this[VIEW].displaySuccessMessage('Restaurante creado con éxito.');

            this[VIEW].resetForm();
        } catch (error) {

            this[VIEW].displayErrorMessage('Error al crear el restaurante: ' + error.message);
        }
    }

    handleModifyDishCategories = (formData) => {
        try {

            const dishIterator = this[MODEL].findDishes(dish => dish.name === formData.dishName);
            const dish = Array.from(dishIterator)[0];

            dish.categories.clear();

            this[MODEL].assignCategoryToDish(formData.categoryNames, dish);

            this.refreshDishesDisplay();

            this[VIEW].displaySuccessMessage('Categorías actualizadas con éxito.');
        } catch (error) {
            this[VIEW].displayErrorMessage('Error al modificar las categorías del plato: ' + error.message);
        }
    }

    handleManageMenuForm = (selectedMenuName, selectedDishes) => {
        try {

            let menu = this[MODEL].getMenus().find(m => m.name === selectedMenuName);

            menu.dishes.clear();

            this[MODEL].assignDishToMenu(menu, selectedDishes);

            this.refreshDishesDisplay();

            this[VIEW].displaySuccessMessage('Menú actualizado correctamente con orden de platos.');

        } catch (error) {

            this[VIEW].displayErrorMessage('Error al actualizar el menú: ' + error.message);

        }

    }
}

export default managerController;