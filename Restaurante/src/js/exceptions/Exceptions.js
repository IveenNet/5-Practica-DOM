'use strict';

//Clase donde erredaran las demas
class BaseException extends Error {

    constructor(message = 'Default Exception') {

        super(message);
        this.name = this.constructor.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.construct);
        }

    }
}

class InvalidValueException extends BaseException { }
class EmptyValueException extends BaseException { }
class InvalidInstanceException extends BaseException { }
class ExistValueException extends BaseException { }
class NoExistValueException extends BaseException { }
class FilterException extends BaseException { }

class ExceptionFactory {

    //Excepcion para propiedades donde su valor no puede ser vacio
    static EmptyValueException(param) {
        let message = `Error: The parameter ${param} cannot be empty`;
        throw new EmptyValueException(message);
    }

    //Excepcion para las propiedades donde insertamos valores invalidos
    static InvalidValueException(param, value) {
        let message = `Error: The parameter ${param} has an invalid value ${value}`;
        throw new InvalidValueException(message);
    }

    //Excepcion para insertar objetos que no son de la misma clase
    static InvalidInstanceException(param) {
        let message = `Error: The argument needs to be ${param}`;
        throw new InvalidInstanceException(message);
    }

    //Excepcion para insertar un valor que ya existe
    static ExistValueException(value) {
        let message = `Error: The value ${value} already exists`;
        throw new ExistValueException(message);
    }

    //Excepcion de que no existe el valor
    static NoExistValueException(value) {
        let message = `Error: The value ${value} not exist`;
        throw new NoExistValueException(message);
    }

    //Excepcion de que no existe el valor
    static FilterException() {
        let message = 'Not is a filter';
        throw new FilterException(message);
    }

}

export {ExceptionFactory};