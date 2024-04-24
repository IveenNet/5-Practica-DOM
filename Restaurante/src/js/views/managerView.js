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
                const a = $('<a>').attr('href', crumb.link).text(crumb.name);
                li.append(a);
            } else {
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
        this.categoriesContainer.on('click', '.category-item', function () {
            let categoryName = $(this).data('category');
            handler(categoryName);
        });

        $('#category-links').on('click', 'a', function (event) {
            event.preventDefault();
            let categoryName = $(this).data('category');
            handler(categoryName);
        });
    }

    bindAllergenClick(handler) {
        $('#allergen-links').on('click', 'a', function (event) {
            event.preventDefault();
            let allergenName = $(this).data('allergen');
            handler(allergenName);
        });
    }

    bindMenuClick(handler) {
        this.menusContainer.on('click', '.menu-item', function () {
            let menuName = $(this).data('menu');
            handler(menuName);
        });

        $('#menu-links').on('click', 'a', function (event) {
            event.preventDefault();
            let menuName = $(this).data('menu');
            handler(menuName);
        });
    }

    bindRestaurantClick(handler) {
        $('#restaurant-links').on('click', 'a', function (event) {
            event.preventDefault();
            let restaurantName = $(this).data('restaurant');
            handler(restaurantName);
        });
    }

    bindFormButtons(getDishes, getCategories, getAllergens, getMenus) {
        // Desvinculamos eventos previos
        $('#form-selection').off('click');

        $('#form-selection').on('click', '.form-btn', (event) => {
            const formType = $(event.target).data('form');
            switch (formType) {
                case 'create-dish':
                    this.displayCreateDishForm(getCategories(), getAllergens());
                    break;
                case 'delete-dish':
                    this.displayDeleteDishForm(getDishes());
                    break;
                case 'assign-dish':
                    this.displayManageMenuForm(getMenus(), getDishes());
                    break;
                case 'delete-category':
                    this.displayDeleteCategoryForm(getCategories());
                    break;
                case 'add-category':
                    this.displayCreateCategoryForm();
                    break;
                case 'create-restaurant':
                    this.displayCreateRestaurantForm();
                    break;
                case 'modify-category':
                    this.displayModifyDishCategoryForm(getDishes(), getCategories());
                    break;
                default:
                    console.log('No form associated with:', formType);
            }
        });
    }

    bindDishClick(handler) {
        this.dishesContainer.on('click', '.dish-item', function () {
            let dishName = $(this).data('dish');
            handler(dishName);
        });
    }

    bindCreateDishForm(handler) {
        $('#form-container').on('submit', '#create-dish-form', function (event) {
            event.preventDefault();
            const dishData = {
                name: $('#dish-name').val(),
                description: $('#dish-description').val(),
                image: $('#dish-image')[0].files[0].name, 
                category: $('#dish-category').val(),
                allergens: $('#dish-allergen').val()
            };
            handler(dishData);
        });
    }

    bindDeleteDishForm = (handler) => {
        $(document).on('submit', '#delete-dish-form', function (event) {
            event.preventDefault();
            const dishName = $('#dish-to-delete').val();
            handler(dishName);
        });
    };

    bindCreateCategoryForm(handler) {
        $('#form-container').on('submit', '#create-category-form', function (event) {
            event.preventDefault();
            const categoryName = $('#category-name').val();
            const categoryDescription = $('#category-description').val();
            handler({
                name: categoryName,
                description: categoryDescription
            });
        });
    }

    bindDeleteCategoryForm(handler) {
        $('#form-container').on('submit', '#delete-category-form', function (event) {
            event.preventDefault();
            const categoryName = $('#category-delete-select').val();
            handler(categoryName);
        });
    }

    bindCreateRestaurantForm(handler) {
        $('#form-container').on('submit', '#create-restaurant-form', function (event) {
            event.preventDefault();
            const restaurantData = {
                name: $('#restaurant-name').val(),
                description: $('#restaurant-description').val(),
                location: {
                    latitude: parseFloat($('#restaurant-latitude').val()),
                    longitude: parseFloat($('#restaurant-longitude').val())
                }
            };
            console.log(restaurantData)
            handler(restaurantData);
        });
    }

    bindModifyDishCategoryForm(handler) {
        $('#form-container').on('submit', '#modify-dish-category-form', function (event) {
            event.preventDefault();

            const dishName = $('#dish-select').val();
            const categoryNames = $('#category-select').val();
            handler({
                dishName: dishName,
                categoryNames: categoryNames
            });
        });
    }

    bindManageMenuForm(handler) {
        $('#form-container').on('submit', '#manage-menu-form', function (event) {
            event.preventDefault();

            const selectedMenuName = $('#menu-select').val();
            const selectedDishes = $('#dishes-list input[type="checkbox"]:checked').map(function () {
                return this.value;
            }).get();

            handler(selectedMenuName, selectedDishes, null);
        });
    }

    displayCategories(categories) {
        this.categoriesContainer.empty();
        $('<h2>').text('Categorías').appendTo(this.categoriesContainer);

        categories.forEach(category => {
            let categoryElement = $('<div>').addClass('grid-item category-item').text(category.name).data('category', category.name);
            this.categoriesContainer.append(categoryElement);
        });
    }

    displayMenus(menus) {
        this.menusContainer.empty();
        $('<h2>').text('Menús').appendTo(this.menusContainer); 

        menus.forEach(menu => {
            let categoryElement = $('<div>').addClass('grid-item menu-item').text(menu.name).data('menu', menu.name);
            this.menusContainer.append(categoryElement);
        });

    }

    displayCategoriesMenu(categories) {
        $('#category-links').empty();
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
        $('#restaurant-links').empty();
        restaurant.forEach(restaurant => {
            let link = $('<a></a>').text(restaurant.name).data('restaurant', restaurant.name).attr('href', '#');
            $('#restaurant-links').append(link);
        });
    }

    displayDishesByCategory(dishes, name) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        if (dishes.length === 0) {
            this.dishesContainer.append($('<h2>').text('No hay platos disponibles en esta categoría.'));
            return;
        }
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

    displayRandomDishes(dishes) {
        this.dishesContainer.empty();
        this.restaurantContainer.empty();
        // Limpia el contenido previo, manteniendo el título
        $('<h2>').text('Platos Aleatorios').appendTo(this.dishesContainer); 

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

    displayCreateDishForm(categories, allergens) {
        $('#form-container').empty();
    
        var form = $('<form>').attr({
            'id': 'create-dish-form',
            'class': 'form-style',
            'enctype': 'multipart/form-data'
        });
    
        form.append($('<label>').text('Nombre del Plato:'));
        form.append($('<input>').attr({
            'type': 'text',
            'id': 'dish-name',
            'required': true
        }));
    
        form.append($('<label>').text('Descripción del Plato:'));
        form.append($('<textarea>').attr({
            'id': 'dish-description',
            'required': true,
            'maxlength': 100, // Límite de caracteres para la descripción
            'placeholder': 'Descripción breve (máximo 100 caracteres)'
        }));
    
        form.append($('<label>').text('Imagen del Plato:'));
        form.append($('<input>').attr({
            'type': 'file',
            'id': 'dish-image',
            'required': true,
            'accept': 'image/jpeg, image/jpg', // Restringir tipos de archivos a JPEG y JPG
            'data-max-size': '1048576' // Tamaño máximo del archivo en bytes (1 MB = 1 * 1024 * 1024)
        }));
    
        // Validación del tamaño del archivo en el cliente
        $('#dish-image').on('change', function() {
            var file = this.files[0];
            if (file.size > 1048576) { // Más de 1 MB
                alert('El tamaño del archivo debe ser menor a 1 MB.');
                this.value = '';
            }
        });
    
        var categorySelect = $('<select>').attr({
            'id': 'dish-category',
            'required': true,
            'multiple': 'multiple'
        });
        categories.forEach(category => {
            categorySelect.append($('<option>').attr('value', category.name).text(category.name));
        });
        form.append($('<label>').text('Categoría del Plato:'));
        form.append(categorySelect);
    
        var allergenSelect = $('<select>').attr({
            'id': 'dish-allergen',
            'required': true,
            'multiple': 'multiple'
        });
        allergens.forEach(allergen => {
            allergenSelect.append($('<option>').attr('value', allergen.name).text(allergen.name));
        });
        form.append($('<label>').text('Alérgenos del Plato:'));
        form.append(allergenSelect);
    
        form.append($('<button>').attr('type', 'submit').text('Crear Plato'));
    
        $('#form-container').append(form);
    }    

    displayDeleteDishForm(dishes) {
        $('#form-container').empty();

        var form = $('<form>').attr({
            'id': 'delete-dish-form',
            'class': 'form-style'
        });
        form.append($('<h2>').text('Eliminar un Plato'));

        var dishSelect = $('<select>').attr({
            'id': 'dish-to-delete',
            'required': true
        });
        dishes.forEach(dish => {
            dishSelect.append($('<option>').attr('value', dish.name).text(dish.name));
        });
        form.append($('<label>').text('Seleccione el plato a eliminar:'));
        form.append(dishSelect);

        form.append($('<button>').attr('type', 'submit').text('Eliminar Plato'));

        $('#form-container').append(form);
    }

    displayCreateCategoryForm() {
        $('#form-container').empty();  
    
        var form = $('<form>').attr({
            'id': 'create-category-form',
            'class': 'form-style',
            'enctype': 'multipart/form-data'
        });
    
        form.append($('<label>').attr('for', 'category-name').text('Nombre de la Categoría:'));
        form.append($('<input>').attr({
            'type': 'text',
            'id': 'category-name',
            'name': 'category-name',
            'required': true
        }));
    
        form.append($('<label>').attr('for', 'category-description').text('Descripción de la Categoría:'));
        form.append($('<textarea>').attr({
            'id': 'category-description',
            'name': 'category-description',
            'maxlength': 100,  
            'placeholder': 'Descripción (máximo 100 caracteres)' 
        }));
    
        form.append($('<button>').attr('type', 'submit').text('Añadir Categoría'));
    
        $('#form-container').append(form);
    
        $('#category-description').on('input', function() {
            var remaining = 100 - $(this).val().length;
            $('#char-count').text('Caracteres restantes: ' + remaining);
            if(remaining < 0) {
                $('#char-count').css('color', 'red');
            } else {
                $('#char-count').css('color', 'black');
            }
        });
    
        form.append($('<div>').attr('id', 'char-count').text('Caracteres restantes: 100'));
    }
    
    displayDeleteCategoryForm(categories) {
        $('#form-container').empty(); 

        var form = $('<form>').attr({
            'id': 'delete-category-form',
            'class': 'form-style'
        });

        form.append($('<label>').attr('for', 'category-delete-select').text('Seleccione la categoría a eliminar:'));
        var select = $('<select>').attr({
            'id': 'category-delete-select',
            'required': true
        });
        categories.forEach(category => {
            select.append($('<option>').attr('value', category.name).text(category.name));
        });
        form.append(select);

        form.append($('<button>').attr('type', 'submit').text('Eliminar Categoría'));

        $('#form-container').append(form);
    }

    displayCreateRestaurantForm() {
        $('#form-container').empty();  // Limpia el contenedor de formularios
    
        var form = $('<form>').attr({
            'id': 'create-restaurant-form',
            'class': 'form-style',
            'enctype': 'multipart/form-data'
        });
    
        form.append($('<label>').text('Nombre del Restaurante:'));
        form.append($('<input>').attr({
            'type': 'text',
            'id': 'restaurant-name',
            'required': true
        }));
    
        form.append($('<label>').text('Descripción del Restaurante:'));
        form.append($('<textarea>').attr({
            'id': 'restaurant-description',
            'required': true,
            'maxlength': 100,  
            'placeholder': 'Descripción (máximo 100 caracteres)'
        }));
    
        form.append($('<label>').text('Latitud:'));
        form.append($('<input>').attr({
            'type': 'text',
            'id': 'restaurant-latitude',
            'required': true,
            'placeholder': 'Ej. 34.0522'  
        }));
    
        form.append($('<label>').text('Longitud:'));
        form.append($('<input>').attr({
            'type': 'text',
            'id': 'restaurant-longitude',
            'required': true,
            'placeholder': 'Ej. -118.2437'
        }));

        form.append($('<button>').attr('type', 'submit').text('Crear Restaurante'));
    
        $('#form-container').append(form);
    
        $('#restaurant-latitude, #restaurant-longitude').mask('Z000.0000', {
            translation: {
                'Z': {
                    pattern: /[-]/,
                    optional: true
                }
            },
            onComplete: function(val, e, field, options) {
                field.removeClass('invalid');
                if (field.next('.error').length) {
                    field.next('.error').remove();
                }
            },
            onChange: function(val, e, field, options) {
                if (!/^[-]?\d{3}\.\d{4}$/.test(val)) {
                    field.addClass('invalid');
                    if (!field.next('.error').length) {
                        field.after('<span class="error" style="color: red;">Formato incorrecto. Ejemplo válido: -123.4567 o 123.4567</span>');
                    }
                } else {
                    field.removeClass('invalid');
                    if (field.next('.error').length) {
                        field.next('.error').remove();
                    }
                }
            },
            placeholder: "___.___"
        });     
    }

    displayModifyDishCategoryForm(dishes, categories) {
        $('#form-container').empty();  // Limpia el contenedor de formularios

        let form = $('<form>').attr({
            'id': 'modify-dish-category-form',
            'class': 'form-style'
        });

        // Dropdown para seleccionar el plato
        let dishSelect = $('<select>').attr('id', 'dish-select').attr('required', true);
        dishes.forEach(dish => {
            dishSelect.append($('<option>').val(dish.name).text(dish.name));
        });
        form.append($('<label>').text('Seleccione el Plato:')).append(dishSelect);

        // Dropdown para seleccionar las categorías
        let categorySelect = $('<select>').attr({
            'id': 'category-select',
            'multiple': 'multiple',
            'required': true
        });

        dishSelect.change(function () {
            let selectedDishName = $(this).val();
            let selectedDish = dishes.find(d => d.name === selectedDishName);
            categorySelect.empty();
            categories.forEach(category => {
                let option = $('<option>').val(category.name).text(category.name);
                if (selectedDish.categories.has(category.name)) {
                    option.attr('selected', 'selected');
                }
                categorySelect.append(option);
            });
        }).trigger('change');  // Dispara el evento change para cargar las categorías al cargar el formulario

        form.append($('<label>').text('Seleccione las Categorías:')).append(categorySelect);

        form.append($('<button>').attr('type', 'submit').text('Modificar Categorías'));

        $('#form-container').append(form);
    }

    displayManageMenuForm(menus, dishes, selectedMenuName = menus[0]?.name) {
        $('#form-container').empty();

        const selectedMenu = menus.find(menu => menu.name === selectedMenuName);
        if (!selectedMenu) {
            console.error('No se pudo encontrar un menú seleccionado válido.');
            return;
        }

        const form = $('<form>').attr({
            id: 'manage-menu-form',
            class: 'form-style'
        });

        // Menú selector
        const menuSelect = $('<select>').attr('id', 'menu-select').attr('required', true);
        menus.forEach(menu => {
            menuSelect.append($('<option>').attr('value', menu.name).text(menu.name));
        });
        menuSelect.val(selectedMenu.name); // Establece el valor antes de añadir el evento change
        menuSelect.change(() => {
            const newSelectedMenuName = menuSelect.val();
            this.displayManageMenuForm(menus, dishes, newSelectedMenuName);
        });
        form.append($('<label>').text('Selecciona un Menú:'), menuSelect);

        // Lista de platos con checkboxes
        const dishesList = $('<ul>').attr('id', 'dishes-list').sortable();

        selectedMenu.dishes.forEach(dishName => {
            const dish = dishes.find(d => d.name === dishName.name);
            console
            if (dish) {
                this.appendDishToList(dishesList, dish, true);
            }
        });

        dishes.forEach(dish => {
            if (!selectedMenu.dishes.has(dish.name)) {
                this.appendDishToList(dishesList, dish, false);
            }
        });

        form.append($('<h3>').text('Platos Disponibles:'), dishesList);

        form.append($('<button>').attr('type', 'submit').text('Actualizar Menú'));

        $('#form-container').append(form);

        // Activamos la funcionalidad de ordenable en la lista de platos
        $('#dishes-list').sortable({
            items: 'li:not(.ui-state-disabled)'
        }).disableSelection();
    }

    appendDishToList(dishesList, dish, isChecked) {
        const listItem = $('<li>').addClass('custom-checkbox').attr('id', `dish-${dish.name}`);
        const checkbox = $('<input>').attr({
            type: 'checkbox',
            id: `dish-checkbox-${dish.name}`,
            name: 'dishes',
            value: dish.name,
            checked: isChecked
        });
        const label = $('<label>').attr('for', `dish-checkbox-${dish.name}`).text(dish.name);
        listItem.append(checkbox, label);
        dishesList.append(listItem);
    }

    resetForm() {
        $('#form-container').find('input:text, input:password, input:file, select, textarea, input:checkbox, input:radio').each(function () {
            if ($(this).is(':checkbox') || $(this).is(':radio')) {
                $(this).prop('checked', false);
            } else {
                $(this).val('');
            }
        });
        $('#form-container').find('select').val([]).trigger('change');
    }

    displaySuccessMessage(message) {
        alert(message);
    }

    displayErrorMessage(message) {
        alert(`Error : ${message}`);
    }

}

export default ManagerView;
