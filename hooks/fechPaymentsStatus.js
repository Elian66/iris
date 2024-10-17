import { ACCESS_TOKEN } from "../config.json";
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const fetchPaymentStatus = async (paymentId, planName) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    const data = await response.json();
    console.log(data.status)
    if (data.status === 'approved') {

      try {
        const auth = getAuth(); // Obter a autenticação
        const user = auth.currentUser; // Usuário atualmente autenticado
        if (user) {
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
          console.log(userRef)
          await update(userRef, { plano: planName, planoUsado: false, lastPaymentId: paymentId, paymentPeding : false });
          console.log('Plano cadastrado com sucesso!');
        } else {
          console.log('Usuário não autenticado.');
        }

      } catch (error) {
        console.error('Erro ao atualizar plano do usuário:', error);
        // Implementar um feedback para o usuário sobre o erro
      }
    }
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
  } 
};

export default fetchPaymentStatus;