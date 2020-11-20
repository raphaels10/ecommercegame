const { transport, myEmail } = require('../config/smtp')


module.exports = (req, res, next) => {
    const { reason, email, title, description } = req.body

    transport.sendMail({
        subject: `[${reason.toUpperCase()}] ${title}`,
        from: `App Provider <${myEmail}>`,
        to: "contatowolfstore995@gmail.com",
        html: `
            E-mail do remetente: ${email}
            <hr>
            ${description}
        
        `
                        
    }).then(r => {
        return res.send("Ticket enviado com sucesso! Entraremos em contato em breve")
        }
    )
    .catch(e => {
        return res.status(400).json({error: ['Não foi possível enviar o ticket agora. Tente novamente mais tarde!']})
    }

    )

}