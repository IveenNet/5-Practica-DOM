'use strict';

import { Allergen } from './enteties/Allergen.js';
import { Category } from './enteties/Category.js';
import { Dish } from './enteties/Dish.js';
import { Menu } from './enteties/Menu.js';
import { Restaurant } from './enteties/Restaurant.js';

import managerController from './controllers/managerController.js';
import managerModel from './models/managerModel.js';
import managerView from './views/managerView.js'

const managerApp = new managerController(managerModel.getInstance(), new managerView());

export default managerApp;