
export function schemaValidate(schema) {
    return (req, res, next) => {

        const validate = schema.validate(req.body, { abortEarly: false });

        if (validate.error) {
            const errorMessages = validate.error.details.map(err => err.message)
            return res.status(422).send(errorMessages)
        }        
        next();
    }
}