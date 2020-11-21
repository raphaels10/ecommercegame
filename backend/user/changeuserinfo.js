const bcrypt = require('bcrypt')
const User = require('../database/user')


module.exports = (req, res, next) => {
    const {actualPassword, newPassword, confirmNewPassword} = req.body
    const name = req.body.name || ''
    const profilePic = req.body.fileUrl || ''
    const {decoded} = res.locals


        if(profilePic) {
            User.findOneAndUpdate({username: decoded.user.username}, 
                {$set: {name, profilePic}}, (err, user) => {
                    if (err) return res.status(400).json({error: ['Erro na comunicação com o banco de dados']})
                    if (!user) return res.status(400).json({error: ['Usuário não encontrado']})

                    if(Boolean(actualPassword && newPassword && confirmNewPassword)) {

                        const passwordsMatch = newPassword === confirmNewPassword

                        bcrypt.compare(actualPassword, user.password, (err, same) => {
                            if (err || !same) return res.status(400).json({error: ['Senha atual inválida']})
                            if(passwordsMatch) {
                                bcrypt.hash(newPassword, 10, (err, string) => {
                                    if (err) return res.status(400).json({error: ["Não foi possível alterar a senha"]})
                                    user.update({$set: {password: string}}, (err, raw) => {
                                        if (err) return res.status(400).json({error: ["Não foi possível alterar a senha"]})
                                        return res.send("Dados do usuário alterados com sucesso! Faça login novamente para refletir as mudanças")
                                    })

                                })
                            }
                            else {
                                return res.status(400).json({error: ["Senhas não conferem"]})
                            }
                        })
                    }
                    else {
                        return res.send("Dados do usuário alterados com sucesso! Faça login novamente para refletir as mudanças")
                    }
                    
                })
        }
        else {
            User.findOneAndUpdate({username: decoded.user.username}, 
                {$set: {name}}, (err, user) => {
                    if (err) return res.status(400).json({error: ['Erro na comunicação com o banco de dados']})
                    if (!user) return res.status(400).json({error: ['Usuário não encontrado']})

                    if(Boolean(actualPassword && newPassword && confirmNewPassword)) {
                        console.log("Passou pelo if")
                        const passwordsMatch = newPassword === confirmNewPassword

                        bcrypt.compare(actualPassword, user.password, (err, same) => {
                            if (err || !same) return res.status(400).json({error: ['Senha atual inválida']})
                            if(passwordsMatch) {
                                console.log("Senhas conferem")
                                bcrypt.hash(newPassword, 10, (err, string) => {
                                    if (err) return res.status(400).json({error: ["Não foi possível alterar a senha"]})
                                    console.log("O hash da senha deu certo")
                                    user.update({$set: {password: string}}, (err, raw) => {
                                        console.log("Dentro do user.update")
                                        if (err) return res.status(400).json({error: ["Não foi possível alterar a senha"]})
                                        console.log("Não deu erro no user update")
                                        return res.send("Dados do usuário alterados com sucesso! Faça login novamente para refletir as mudanças")
                                    })

                                })
                            }
                            else {
                                return res.status(400).json({error: ["Senhas não conferem"]})
                            }
                        })
                    }
                    else{
                        return res.send("Dados do usuário alterados com sucesso!")
                    }

                    
                })
        }

    


}