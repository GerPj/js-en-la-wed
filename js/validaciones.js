export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
        input.parenElement.classList.remove("input-conteniner--invalid");
        input.parenElement.querySelecote(".input-message-error").innerHTML = "";
    }else{
        input.parenElement.classList.add("input-conteniner--invalid");
        input.parenElement.querySelecote(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

    const tipoDeErrores = [
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError",
    ];

const mensajesDeError = {
    nombre: {
        valueMissing:"Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 8 caracteres",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 Numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La provincia debe contener entre 10 a 40 caracteres.",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
const fechaCliente = new Date(input.value);
let mensaje  = "";
if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
}

input.setCustomValidity(mensaje);
};

function mayorDeEdad (fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCfullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    //aqui el "<" ahi que cambiarlo
    return diferenciaFechas < fechaActual;
}