'use strict';

import managerModel  from "../js/models/managerModel.js";

function test(managerModel) {
    console.log('##################################################################');
    console.log('######## Inicio de Pruebas de RestaurantsManager ########');

    // Categorías
    console.log('######## Creamos Categorías ########');
    const tapasCategory = managerModel.createCategory('Tapas');
    const postresCategory = managerModel.createCategory('Postres');
    const principalesCategory = managerModel.createCategory('Platos Principales');

    // Alérgenos
    console.log('######## Creamos Alérgenos ########');
    const glutenAllergen = managerModel.createAllergen('Gluten');
    const lactosaAllergen = managerModel.createAllergen('Lactosa');
    const mariscosAllergen = managerModel.createAllergen('Mariscos');

    // Platos
    console.log('######## Creamos Platos ########');
    const tortillaEspanola = managerModel.createDish(
        'Tortilla Española',
        'Clásica tortilla de patatas con o sin cebolla, según preferencia',
        new Map([['patatas', 500], ['huevos', 6], ['cebolla', 1]]),  // Ingredientes con cantidades
        'img/tortilla.jpg',
        new Map().set(tapasCategory.name, tapasCategory),
        new Map()
    );

    const gazpacho = managerModel.createDish(
        'Gazpacho',
        'Refrescante sopa fría de tomate, ideal para el verano',
        new Map([['tomate', 1], ['pimiento', 1], ['pepino', 1], ['ajo', 2]]),
        'img/gazpacho.jpg',
        new Map().set(tapasCategory.name, tapasCategory),
        new Map().set(glutenAllergen.name, glutenAllergen)
    );

    const paellaValenciana = managerModel.createDish(
        'Paella Valenciana',
        'Auténtica paella con pollo, conejo, judías verdes y azafrán',
        new Map([['arroz', 300], ['pollo', 200], ['conejo', 200], ['judías verdes', 100], ['azafrán', '1 pizca']]),
        'img/paella.jpg',
        new Map().set(principalesCategory.name, principalesCategory),
        new Map().set(mariscosAllergen.name, mariscosAllergen)
    );

    const flanDeHuevo = managerModel.createDish(
        'Flan de Huevo',
        'Suave y cremoso flan de huevo cubierto de caramelo',
        new Map([['huevos', 4], ['leche', 500], ['azúcar', 150]]),
        'img/flan.jpg',
        new Map().set(postresCategory.name, postresCategory),
        new Map().set(lactosaAllergen.name, lactosaAllergen)
    );

    // Menús
    console.log('######## Creamos Menús ########');
    const menuTradicional = managerModel.createMenu('Menú Tradicional');
    const menuGourmet = managerModel.createMenu('Menú Gourmet');

    // Asignar platos a menús
    console.log('######## Asignamos Platos a Menús ########');
    managerModel.assignDishToMenu(menuTradicional, tortillaEspanola);
    managerModel.assignDishToMenu(menuTradicional, gazpacho);
    managerModel.assignDishToMenu(menuGourmet, paellaValenciana);
    managerModel.assignDishToMenu(menuGourmet, flanDeHuevo);

    // Restaurantes
    console.log('######## Creamos Restaurantes ########');
    const restauranteCasero = managerModel.createRestaurant('Restaurante Casero', 'Disfruta de los sabores de casa en cada bocado', 'Calle Ficticia, 123, Valencia', [menuTradicional]);
    const restauranteDelMar = managerModel.createRestaurant('Restaurante Del Mar', 'Saborea los mejores platos del mar en un ambiente único', 'Avenida del Puerto, 45, Barcelona', [menuGourmet]);

    console.log('---------- FIN DE PRUEBAS DE RestaurantsManager ----------');

    console.log('##################################################################');
    console.log('######## Mostrando Todos los Menús Registrados ########');

    for (const menu of managerModel.getMenus()) {
        console.log(`Menú: ${menu.name}`);
        console.log('Platos:');
        menu.dishes.forEach(dish => {
            console.log(`- ${dish.name}`);
        });
        console.log('--------------------------------');
    }

    console.log('---------- FIN DEL TEST COMPLETO DE RestaurantsManager ----------');

}

window.onload = function() {
    test(managerModel.getInstance());
};
