import bcrypt from 'bcrypt'

export function encryptPassword(password) {
    return bcrypt.hashSync(password, 10)
}

export  function comparePassword (encryptPassword, password){
    const match =  bcrypt.compare(encryptPassword, password)
    if (!match){
        res.status(401).send('Senha incorreta');
        return;
    }
}