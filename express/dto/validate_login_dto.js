//npm install @sinclair/typebox   npm install ajv      errores:  npm install ajv-formats   npm install ajv-errors
import {Type} from '@sinclair/typebox';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';

//const LoginDTOSchema = {
//    type: 'object',
//    properties: {
//        email: {type: 'string', format: 'email'},
//        password: {type: 'string'}
//    },
//    required: ['email', 'password'],
//    additionalProperties: false
//}
const LoginDTOSchema = Type.Object({//Creando esquema de validacion, gracias al typebox se genera lo de arriba pero con funciones
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'email debe ser string',
            format: 'falta email'
        }
    }),
    password: Type.String({
        errorMessage: {type: "password debe ser string"}
    }),

}, {
    additionalProperties: false,
    errorMessage: {additionalProperties: "formato invalido"}
})

const ajv = new Ajv({allErrors: true});
addFormats(ajv, ["email"]).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validate = ajv.compile(LoginDTOSchema);//Esto es del ajv, hay que usar un objeto como el de arriba

const validateLoginDTO = (req, res, next) => {
    const isDTOValid = validate(req.body);//Validando con el esquema
    if(!isDTOValid) res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}));

    next();
}

export default validateLoginDTO;
