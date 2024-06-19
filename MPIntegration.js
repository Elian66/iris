import { ACCESS_TOKEN } from "./config.json";

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
                { id: "ticket" }  // Exclui boleto
            ]
        },
        back_urls: {
            success: "https://www.yoursite.com/success",
            failure: "https://www.yoursite.com/failure",
            pending: "https://www.yoursite.com/pending"
        },
        auto_return: "approved"
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
