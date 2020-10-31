module.exports = (e, res) => {
    const { errors } = e
    const errorsArray = Object.keys(errors).map(errorKey => (
        errors[errorKey].message
    ))

    return res.status(400).send({error: errorsArray})
    
    

}