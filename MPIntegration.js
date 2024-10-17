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

export const handleIntegrationMPPix = async (planSelect, cpf) => {
    const { name, price } = planSelect;
    const newIdEmpotency = uuidv4();

    const preferencia = {
        transaction_amount: price,
        description: `Pagamento Plano ${name}`,
        payment_method_id: "pix",
        payer: {
            email: "email@email.com",
            identification: {
                type: "CPF",
                number: cpf
            }
        }
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
