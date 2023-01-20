const dotenv = require('dotenv').config();
const request = require('request')
const CLIENT = process.env.CLIENT;
const SECRET = process.env.SECRET;
const PAYPAL_API_DEV = process.env.PAYPAL_API_DEV;
const auth = { user: CLIENT, pass : SECRET }

const mainController = {
    //TODO: Crear orden de pago, generar url para el cliente
    createPayment : (req, res)=>{ 
        console.log(CLIENT)
        const body = {
            intent: 'CAPTURE',
            purchase_units:[{
                amount: {
                    currency_code: 'USD',
                    value: '11'
                }
            }],
            application_context:{
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                payment_method_selected: "PAYPAL",
                brand_name : 'EMPRESA FICTISIA.COM',
                locale: "en-US",
                landing_page : 'NO_PREFERENCE',
                user_action : 'PAY_NOW',
                return_url : 'http://localhost:3001/api/execute-payment',
                cancel_url : 'http://localhost:3001/api/cancel-payment'
            }
        }
        
        request.post(`${PAYPAL_API_DEV}/v2/checkout/orders`,{
                auth,
                body,
                json : true
            }, (err, response) =>{ 
                res.json({ data: response.body })
            }
        )        
    },

    //TODO: captura el dinero de la trasnaccion
    executePayment : (req, res) =>{
        const token = req.query.token;
        request.post(`${PAYPAL_API_DEV}/v2/checkout/orders/${token}/capture`,{
                auth,
                body: {},
                json : true
            }, (err, response) =>{ res.json({ data: response.body })}
        )
    },

    cancelPayment : (req, res) =>{
        res.send("Transaccion cancelada")
    }
}

module.exports = mainController;