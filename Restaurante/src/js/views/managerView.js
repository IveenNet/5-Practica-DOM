'use strict';

class ManagerView {
    constructor() {
        this.categoriesContainer = $('.category-container'); 
        this.menusContainer = $('.menu-container');
        this.dishesContainer = $('.random-dishes-container'); 
        this.restaurantContainer = $('.restaurant-container');
        
        this.breadcrumbContainer = $('#breadcrumb');
    }

    init(categories, menus, dishes) {
        this.displayCategories(categories);
        this.displayMenus(menus)
        this.displayRandomDishes(dishes);

        this.updateBreadcrumb([{ name: 'Inicio', link: '#' }]);
    }

    updateBreadcrumb(path) {
        this.breadcrumbContainer.empty(); // Limpia el contenedor de migas de pan

        path.forEach((crumb, index) => {
            const li = $('<li>').addClass('breadcrumb-item');
            if (index < path.length - 1) {
                // Si no es el último elemento, es un enlace clickeable
                const a = $('<a>').attr('href', crumb.link).text(crumb.name);
                li.append(a);
            } else {
                // El último elemento es el actual, no es un enlace
                li.addClass('active').text(crumb.name);
            }
            this.breadcrumbContainer.append(li);
        });
    }

    bindInit(handler) {
        $('#home-link').on('click', (event) => {
            event.preventDefault();
            handler();
        });
    }

    bindCategoryClick(handler) {
        this.categoriesContainer.on('click', '.category-item', function() {
            let categoryName = $(this).data('category');
            handler(categoryName);
        });

        $('#category-links').on('click', 'a', function(event) {
            event.preventDefault();
            let categoryName = $(this).data('category');
            handler(categoryName);
        });
    }

    bindAllergenClick(handler) {
        $('#allergen-links').on('click', 'a', function(event) {
            event.preventDefault();
            let allergenName = $(this).data('allergen');
            handler(allergenName);
        });
    }

    bindMenuClick(handler) {
        this.menusContainer.on('click', '.menu-item', function() {
            let menuName = $(this).data('menu');
            handler(menuName);
        });

        $('#menu-links').on('click', 'a', function(event) {
            event.preventDefault();
            let menuName = $(this).data('menu');
            handler(menuName);
        });
    }

    bindRestaurantClick(handler) {
        $('#restaurant-links').on('click', 'a', function(event) {
            event.preventDefault();
            let restaurantName = $(this).data('restaurant');
            handler(restaurantName);
        });
    }

    bindDishClick(handler) {
        this.dishesContainer.on('click', '.dish-item', function() {
            let dishName = $(this).data('dish');
            handler(dishName);
        });
    } 

    displayCategories(categories) {
        this.categoriesContainer.empty(); // Limpia el contenido previo, manteniendo el título
        $('<h2>').text('Categorías').appendTo(this.categoriesContainer); // Asegúrate de añadir el título

        categories.forEach(category => {
            let categoryElement = $('<div>').addClass('grid-item category-item').text(category.name).data('category', category.name);
            this.categoriesContainer.append(categoryElement);
        });
        
    }

    displayMenus(menus) {
        this.menusContainer.empty(); // Limpia el contenido previo, manteniendo el título
        $('<h2>').text('Menús').appendTo(this.menusContainer); // Asegúrate de añadir el título

        menus.forEach(menu => {
            let categoryElement = $('<div>').addClass('grid-item menu-item').text(menu.name).data('menu', menu.name);
            this.menusContainer.append(categoryElement);
        });
        
    }

    displayCategoriesMenu(categories) {
        categories.forEach(category => {
            let link = $('<a></a>').text(category.name).data('category', category.name).attr('href', '#');
            $('#category-links').append(link);
        });
    }

    displayAllergenMenu(allergens) {
        allergens.forEach(allergen => {
            let link = $('<a></a>').text(allergen.name).data('allergen', allergen.name).attr('href', '#');
            $('#allergen-links').append(link);
        });
    }

    displayMenusMenu(menus) {
        menus.forEach(menu => {
            let link = $('<a></a>').text(menu.name).data('menu', menu.name).attr('href', '#');
            $('#menu-links').append(link);
        });
    }

    displayRestaurantMenu(restaurant) {
        restaurant.forEach(restaurant => {
            let link = $('<a></a>').text(restaurant.name).data('restaurant', restaurant.name).attr('href', '#');
            $('#restaurant-links').append(link);
        });
    }

    displayDishesByCategory(dishes, name) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        // Limpia el contenido previo
        $('<h2>').text('Platos de la Categoría ' + name).appendTo(this.dishesContainer);

        dishes.forEach(dish => {
            let dishElement = $('<div>').addClass('grid-item dish-item').data('dish', dish.name);
            $('<img>').attr('src', dish.image).attr('alt', `Imagen de ${dish.name}`).appendTo(dishElement);
            $('<h3>').text(dish.name).appendTo(dishElement);
            $('<p>').text(dish.description).appendTo(dishElement);
            this.dishesContainer.append(dishElement);
        });
    }

    displayDishesByAllergen(dishes, name) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        // Limpia el contenido previo
        $('<h2>').text('Platos del Alérgeno ' + name).appendTo(this.dishesContainer);

        dishes.forEach(dish => {
            let dishElement = $('<div>').addClass('grid-item dish-item').data('dish', dish.name);
            $('<img>').attr('src', dish.image).attr('alt', `Imagen de ${dish.name}`).appendTo(dishElement);
            $('<h3>').text(dish.name).appendTo(dishElement);
            $('<p>').text(dish.description).appendTo(dishElement);
            this.dishesContainer.append(dishElement);
        });
    }

    displayDishesByMenu(dishes, name) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        // Limpia el contenido previo
        $('<h2>').text('Platos de ' + name).appendTo(this.dishesContainer);

        dishes.forEach(dish => {
            let dishElement = $('<div>').addClass('grid-item dish-item').data('dish', dish.name);
            $('<img>').attr('src', dish.image).attr('alt', `Imagen de ${dish.name}`).appendTo(dishElement);
            $('<h3>').text(dish.name).appendTo(dishElement);
            $('<p>').text(dish.description).appendTo(dishElement);
            this.dishesContainer.append(dishElement);
        });
    }

    displayDishesByMenu(dishes, name) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        // Limpia el contenido previo
        $('<h2>').text('Platos de ' + name).appendTo(this.dishesContainer);

        dishes.forEach(dish => {
            let dishElement = $('<div>').addClass('grid-item dish-item').data('dish', dish.name);
            $('<img>').attr('src', dish.image).attr('alt', `Imagen de ${dish.name}`).appendTo(dishElement);
            $('<h3>').text(dish.name).appendTo(dishElement);
            $('<p>').text(dish.description).appendTo(dishElement);
            this.dishesContainer.append(dishElement);
        });
    }

    displayRandomDishes(dishes) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        // Limpia el contenido previo, manteniendo el título
        $('<h2>').text('Platos Aleatorios').appendTo(this.dishesContainer); // Asegúrate de añadir el título

        dishes.forEach(dish => {
            let dishElement = $('<div>').addClass('grid-item dish-item').data('dish', dish.name);
            $('<img>').attr('src', dish.image).attr('alt', `Imagen de ${dish.name}`).appendTo(dishElement);
            $('<h3>').text(dish.name).appendTo(dishElement);
            $('<p>').text(dish.description).appendTo(dishElement);
            this.dishesContainer.append(dishElement);
        });
    }

    displayRestaurantInfo(restaurant) {

        this.dishesContainer.empty();
        this.restaurantContainer.empty();

        let restaurantInfo = $('<div>').addClass('restaurant-info');
        $('<h2>').text(restaurant.name).appendTo(restaurantInfo);
        $('<p>').text(restaurant.description).appendTo(restaurantInfo);

        // Verificar si tenemos la ubicación
        if (restaurant.location) {
            $('<h3>').text('Ubicación').appendTo(restaurantInfo);
            $('<p>').text(`Latitud: ${restaurant.location.latitude}, Longitud: ${restaurant.location.longitude}`).appendTo(restaurantInfo);
        } else {
            $('<p>').text('Ubicación no especificada').appendTo(restaurantInfo);
        }

        this.restaurantContainer.append(restaurantInfo);
    }

    displayDishInfo(dish) {

        this.dishesContainer.empty();
        this.restaurantContainer.empty();


        let dishInfo = $('<div>').addClass('dish-info');
        $('<h2>').text(dish.name).appendTo(dishInfo);
        $('<p>').text(dish.description).appendTo(dishInfo);
        $('<img>').attr('src', dish.image).attr('alt', `Imagen de ${dish.name}`).appendTo(dishInfo);

        // Agrega los ingredientes del plato
        $('<h3>').text('Ingredientes').appendTo(dishInfo);
        let ingredientsList = $('<ul>').appendTo(dishInfo);
        dish.ingredients.forEach((quantity, ingredient) => {
            $('<li>').text(`${ingredient}: ${quantity}`).appendTo(ingredientsList);
        });

        $('<h3>').text('Categorias').appendTo(dishInfo);
        // Agrega las categorías del plato
        let categoriesList = $('<ul>').appendTo(dishInfo);
        dish.categories.forEach(category => {
            $('<li>').text(category.name).appendTo(categoriesList);
        });

        $('<h3>').text('Alérgenos').appendTo(dishInfo);
        // Agrega los alérgenos del plato
        let allergensList = $('<ul>').appendTo(dishInfo);
        dish.allergens.forEach(allergen => {
            $('<li>').text(allergen.name).appendTo(allergensList);
        });

        this.dishesContainer.append(dishInfo);
    }

}

export default ManagerView;
