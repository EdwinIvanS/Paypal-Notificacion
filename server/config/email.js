const nodemailer = require('nodemailer');
// const nodemailerSendGrid =  require('nodemailer-sendgrid'); // envios para produccion
//TODO: Crear transporte 

const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "83f31d44f5bd74",
            pass: "79f8e0f8a508d1"
        }
    })

    /*
    const transport = nodemailer.createTransport({
        nodemailerSendGrid({
            apikey: sacar la llave de app.sendgrid.com/settings/api_key
        })
    })
    */
    return transport;
}

//TODO: dispara o enviar el correo 

const sendMail = async () => {
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from: '"Fred Food" <foo@example.com>', 
        to: "bar@example.com, baz@example.com", // correo receptor
        subject: "Compra exitosa",  // asunto
        html: "<b>Transaccion exitosa</b> <p>La compra fue realizada con exito, para ver mas detalle dirigirse al carrito de comprar</p>",  //Cuerpo del correo
        attachments : [
            {
                filename: 'license.txt',
                path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            }
        ]
    });

    console.log("Id envio : ", info.messageId);
    return
}


exports.sendMail = () => sendMail()