'use strict';

class Coordinate {

  #latitude;
  #longitude;

  constructor(latitude, longitude) {

    if (!latitude) ExceptionFactory.EmptyValueException("latitude");
    if (!longitude) ExceptionFactory.EmptyValueException("longitude");

    if (isNaN(latitude)) ExceptionFactory.InvalidValueException("latitude", latitude);
    if (isNaN(longitude)) ExceptionFactory.InvalidValueException("longitude", longitude);

    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  // Getters
  get latitude() { return this.#latitude; }
  get longitude() { return this.#longitude; }

  //setters
  set latitude(value) {
    if (!value) ExceptionFactory.EmptyValueException("latitude");
    if (isNaN(value)) ExceptionFactory.InvalidValueException("latitude", value);

    this.#latitude = value;
  }

  set longitude(value) {
    if (!value) ExceptionFactory.EmptyValueException("longitude");
    if (isNaN(value)) ExceptionFactory.InvalidValueException("longitude", value);

    this.#longitude = value;
  }

  // Método para representar el objeto como una cadena de texto
  toString() {
    return `Latitude: ${this.#latitude}, Longitude: ${this.#longitude}`;
  }
}

Object.defineProperty(Category.prototype, "latitude", { enumerable: true });
Object.defineProperty(Category.prototype, "longitude", { enumerable: true });

