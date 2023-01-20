const dotenv = require('dotenv').config();
const request = require('request')
const CLIENT = "Adbtc8CjC4oWmuefe8FZfa9KL3sJzmH6cHQVJ6gXIM7_wn14-Q49u0iIacLhHRrieHx8JMVroXH3TCeP";
const SECRET = "ELHftDP_Ev98Xa7-2sYbbNakqJR98FxfILXXp5LuWWKpvz6Xyr5ADoeSaZS0HQnf61BGd4yF79zsiFrp";
const PAYPAL_API_DEV = "https://api-m.sandbox.paypal.com";

const auth = { user: CLIENT, pass : SECRET }

const mainController = {
    //TODO: Crear orden de pago para paypal alt + 96
    createPayment : (req, res)=>{        

        const body = {
            intent: 'CAPTURE',
            purchase_units:[{
                amount: {
                    currency_code: 'USD',
                    value: '151'
                }
            }],
            application_context:{
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                payment_method_selected: "PAYPAL",
                brand_name : 'EMPRESA FICTISIA.COM',
                locale: "en-US",
                landing_page : 'NO_PREFERENCE',
                user_action : 'PAY_NOW',
                return_url : 'http://localhost:3001/execute-payment',
                cancel_url : 'http://localhost:3001/cancel-payment'
            }
        }

        //TODO: https://api-m.sandbox.paypal.com/v2/checkout/orders [post]`  
        
        request.post(`${PAYPAL_API_DEV}/v2/checkout/orders`,{
            auth,
            body,
            json : true
        }, (err, response) =>{
            res.json({data: response.body})
        })
    }
}

module.exports = mainController;