
  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // CPF inválido
    }
  
    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) {
      firstDigit = 0;
    }
  
    // Verifica o primeiro dígito verificador
    if (firstDigit !== parseInt(cpf[9])) {
      return false; // CPF inválido
    }
  
    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) {
      secondDigit = 0;
    }
  
    // Verifica o segundo dígito verificador
    return secondDigit === parseInt(cpf[10]);
  };
  

export { isValidCPF }