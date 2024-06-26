import { ACCESS_TOKEN } from "./config.json";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

console.log("ACCESS_TOKEN:", ACCESS_TOKEN);

export const handleIntegrationMP = async (planSelect) => {
    const { name, price } = planSelect;
    const preferencia = {
        items: [
            {
                title: name,
                description: `Plano ${name}`,
                quantity: 1,
                currency_id: "BRL",
                unit_price: price
            }
        ],
        payment_methods: {
            excluded_payment_types: [
                { id: "ticket" }, { id: "pix" }, // Exclui boleto
            ]
        },
    };

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencia)
        });

        const data = await response.json();

        return data.init_point;

    } catch (error) {
        console.log(error);
    }
};

export const handleIntegrationMPPix = async (planSelect) => {
    const { name, price } = planSelect;
    const newIdEmpotency = uuidv4();
    console.log(newIdEmpotency)

    const preferencia = {
            additional_info: {
            items: [
              {
                "title": "Point Mini",
                "description": "Point product for card payments via Bluetooth.",
                "quantity": 1,
                "unit_price": price
              }
            ],
            payer: {
              first_name: "Test",
              last_name: "Test",
              phone: {
                area_code: 11,
                number: "987654321"
              },
              address: {
                street_number: null
              }
            }
           
          },
          "payer": {
            entity_type: "individual",
            type: "customer",
            id: null,
            email: "test_user_123@testuser.com"
          },
          payment_method_id: "pix",
          transaction_amount: price
        }
    


    try {
        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'X-Idempotency-Key': newIdEmpotency,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencia)
        });

        const data = await response.json();
        console.log(data.id)

        return {
            url : data.point_of_interaction.transaction_data.ticket_url,
            id: data.id
        } 

    } catch (error) {
        console.log(error);
    }
};
