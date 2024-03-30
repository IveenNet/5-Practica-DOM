'use strict';

function test(restaurantManager) {
    console.log('##################################################################');
    console.log('######## Inicio de Pruebas de RestaurantsManager ########');

    // Categorías
    console.log('######## Creamos Categorías ########');
    const tapasCategory = restaurantManager.createCategory('Tapas');
    const postresCategory = restaurantManager.createCategory('Postres');
    const principalesCategory = restaurantManager.createCategory('Platos Principales');

    // Alérgenos
    console.log('######## Creamos Alérgenos ########');
    const glutenAllergen = restaurantManager.createAllergen('Gluten');
    const lactosaAllergen = restaurantManager.createAllergen('Lactosa');
    const mariscosAllergen = restaurantManager.createAllergen('Mariscos');

    // Platos
    console.log('######## Creamos Platos ########');
    const tortillaEspanola = restaurantManager.createDish(
        'Tortilla Española',
        'Clásica tortilla de patatas con o sin cebolla, según preferencia',
        new Map([['patatas', 500], ['huevos', 6], ['cebolla', 1]]),  // Ingredientes con cantidades
        'img/tortilla.jpg',
        new Map().set(tapasCategory.name, tapasCategory),
        new Map()
    );

    const gazpacho = restaurantManager.createDish(
        'Gazpacho',
        'Refrescante sopa fría de tomate, ideal para el verano',
        new Map([['tomate', 1], ['pimiento', 1], ['pepino', 1], ['ajo', 2]]),
        'img/gazpacho.jpg',
        new Map().set(tapasCategory.name, tapasCategory),
        new Map().set(glutenAllergen.name, glutenAllergen)
    );

    const paellaValenciana = restaurantManager.createDish(
        'Paella Valenciana',
        'Auténtica paella con pollo, conejo, judías verdes y azafrán',
        new Map([['arroz', 300], ['pollo', 200], ['conejo', 200], ['judías verdes', 100], ['azafrán', '1 pizca']]),
        'img/paella.jpg',
        new Map().set(principalesCategory.name, principalesCategory),
        new Map().set(mariscosAllergen.name, mariscosAllergen)
    );

    const flanDeHuevo = restaurantManager.createDish(
        'Flan de Huevo',
        'Suave y cremoso flan de huevo cubierto de caramelo',
        new Map([['huevos', 4], ['leche', 500], ['azúcar', 150]]),
        'img/flan.jpg',
        new Map().set(postresCategory.name, postresCategory),
        new Map().set(lactosaAllergen.name, lactosaAllergen)
    );

    // Menús
    console.log('######## Creamos Menús ########');
    const menuTradicional = restaurantManager.createMenu('Menú Tradicional');
    const menuGourmet = restaurantManager.createMenu('Menú Gourmet');

    // Asignar platos a menús
    console.log('######## Asignamos Platos a Menús ########');
    restaurantManager.assignDishToMenu(menuTradicional, tortillaEspanola);
    restaurantManager.assignDishToMenu(menuTradicional, gazpacho);
    restaurantManager.assignDishToMenu(menuGourmet, paellaValenciana);
    restaurantManager.assignDishToMenu(menuGourmet, flanDeHuevo);

    // Restaurantes
    console.log('######## Creamos Restaurantes ########');
    const restauranteCasero = restaurantManager.createRestaurant('Restaurante Casero', 'Disfruta de los sabores de casa en cada bocado', 'Calle Ficticia, 123, Valencia', [menuTradicional]);
    const restauranteDelMar = restaurantManager.createRestaurant('Restaurante Del Mar', 'Saborea los mejores platos del mar en un ambiente único', 'Avenida del Puerto, 45, Barcelona', [menuGourmet]);

    console.log('---------- FIN DE PRUEBAS DE RestaurantsManager ----------');

    console.log('##################################################################');
    console.log('######## Mostrando Todos los Menús Registrados ########');

    for (const menu of restaurantManager.getMenus()) {
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
    test(restaurantManager.getInstance());
};
