// Load modules


// Declare internals

var internals = {};


exports.errors = {
    root: 'value',
    key: '"{{!key}}" ',
    messages: {
        wrapArrays: true
    },
    any: {
        unknown: 'no es permitido',
        invalid: 'contiene un valor no válido',
        empty: 'no es permitido estar vacio',
        required: 'es requerido',
        allowOnly: 'Debe ser uno de {{valids}}',
        default: 'arrojo un error cuando corria un metodo por defecto'
    },
    alternatives: {
        base: 'no coincide con ninguna de las alternativas permitidas'
    },
    array: {
        base: 'debe ser una matriz',
        includes: 'en la posición {{pos}} does not match any of the allowed types',
        includesSingle: 'único valor de"{{!key}}" no coincide con ninguno de los tipos permitidos',
        includesOne: 'en la posición {{pos}} falla porque {{reason}}',
        includesOneSingle: 'único valor de "{{!key}}" falla porque {{reason}}',
        includesRequiredUnknowns: 'no contiene {{unknownMisses}} valor requerido(s)',
        includesRequiredKnowns: 'no contiene {{knownMisses}}',
        includesRequiredBoth: 'no contiene {{knownMisses}} y {{unknownMisses}} otro valor requerido(s)',
        excludes: 'en la posición {{pos}} contiene un valor excluido',
        excludesSingle: 'único valor de  "{{!key}}" contiene un valor excluido',
        min: 'debe contener al menos {{limit}} items',
        max: 'debe contener al menos o igual to {{limit}} items',
        length: 'debe contener {{limit}} items',
        sparse: 'no debe ser una matriz dispersa',
        unique: 'posición {{pos}} contains a duplicate value'
    },
    boolean: {
        base: 'debe ser verdadero o falso'
    },
    binary: {
        base: 'debe ser un buffer o una cadena de texto',
        min: 'debe ser menor {{limit}} bytes',
        max: 'debe ser menor que o igual a {{limit}} bytes',
        length: 'debe ser {{limit}} bytes'
    },
    date: {
        base: 'debe ser un numero de milisegundo o cadena de fecha valid',
        min: 'debe ser mayor que o igual a "{{limit}}"',
        max: 'debe ser menor que o igual a "{{limit}}"',
        isoDate: 'debe ser una fecha valida la norma ISO 8601',
        ref: 'referencia "{{ref}}" que no es una fecha'
    },
    function: {
        base: 'debe ser una funcion'
    },
    object: {
        base: 'debe ser un objeto',
        child: 'hijo "{{!key}}" ffallo porque{{reason}}',
        min: 'debe tener al menos {{limit}} hijo',
        max: 'debe tener menor que o igual a {{limit}} hijo',
        length: 'debe tener {{limit}} hijo',
        allowUnknown: 'no es permitido',
        with: 'falta de pares requeridos"{{peer}}"',
        without: 'conflicto con pares permitido "{{peer}}"',
        missing: 'debe contener al menos uno de {{peers}}',
        xor: 'contine un conflicto entre parejas exclusivas {{peers}}',
        or: 'debe contener al menos uno de {{peers}}',
        and: 'contiene {{present}} sin su pareja requerida {{missing}}',
        nand: '!!"{{main}}" no debe existir simultaneamente con {{peers}}',
        assert: '!!"{{ref}}" la validacion a fallado porque "{{ref}}" logrado {{message}}',
        rename: {
            multiple: 'no puede cambiar el renombrar del hijo"{{from}}" debido a que varios renombres estan desactivados y otra de las claves que ya pasó a llamarse a "{{to}}"',
            override: 'no puede cambiar el renombre hijo "{{from}}" debido a la redefinición es discapacitado y destino "{{to}}" existe'},
        type: 'debe ser una instancia de "{{type}}"'
    },
    number: {
        base: 'debe ser un numero',
        min: 'debe ser mayor que o igual a {{limit}}',
        max: 'debe ser menor que o igual a {{limit}}',
        less: 'debe ser inferior a {{limit}}',
        greater: 'debe ser mayor que {{limit}}',
        float: 'debe ser float o  double',
        integer: 'debe ser entero',
        negative: 'debe ser un número negativo',
        positive: 'debe ser un número positivo',
        precision: 'debe tener no mas de {{limit}} cifras decimales',
        ref: 'referencias "{{ref}}" que no es un numero',
        multiple: 'debe ser multiplo de {{multiple}}'
    },
    string: {
        base: 'debe ser una cadena',
        min: 'longitud debe ser almenos {{limit}} caracteres largos',
        max: 'longitud debe ser menor que o igual a {{limit}} characteres largos',
        length: 'longitud debe ser {{limit}} caracteres largos',
        alphanum: 'solo debe contener alfa-caracteres numericos',
        token: 'solo debe contener alfa-caracteres numericos y caracteres subrayados',
        regex: {
            base: 'con valor "{{!value}}" no coincide con el patrón requerido: {{pattern}}',
            name: 'con valor "{{!value}}" no coincide con la {{name}} patron'
        },
        email: 'debe ser email valido',
        uri: 'debe ser una uri valida',
        uriCustomScheme: 'debe ser una uri valida con un esquema de búsqueda de la {{scheme}} patron',
        isoDate: 'debe ser una fecha valida norma ISO 8601',
        guid: 'debe ser un GUID valido',
        hex: 'solo debe contener caracteres hexadecimal',
        hostname: 'debe ser un hostname valido',
        lowercase: 'solo debe contener minúsculas',
        uppercase: 'debe contener mayúsculas',
        trim: 'no debe tener iniciales o finales espacios en blanco',
        creditCard: 'dete tener una tarjeta de credito',
        ref: 'referencia "{{ref}}" que no es un número',
        ip: 'debe ser una dirección IP válida con un {{cidr}} CIDR',
        ipVersion: 'debe ser una dirección IP válida de una de las siguientes versiones {{version}} con un {{cidr}} CIDR'
    }
};
