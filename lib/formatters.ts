export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function handleStockTypes(value: string) {
  const formattedValue = value.toLowerCase();

  if (formattedValue === "stock" || formattedValue === "stocks") {
    return "Ações";
  }

  if (formattedValue === "fund" || formattedValue === "funds") {
    return "Fundos";
  }

  if (formattedValue === "bdr" || formattedValue === "bdrs") {
    return "BDR's";
  }

  return value;
}

export function handleStockTypesDescription(value: string) {
  const formattedValue = value.toLowerCase();

  if (formattedValue === "stock" || formattedValue === "stocks") {
    return "Invista diretamente em empresas listadas na bolsa de valores. Escolha entre diferentes setores e potencialize seus ganhos com papéis de alta liquidez. Descubra empresas listadas e invista em papéis que atendem às suas estratégias e objetivos financeiros.";
  }

  if (formattedValue === "fund" || formattedValue === "funds") {
    return "Diversifique seus investimentos com fundos geridos por especialistas. Uma forma prática de acessar carteiras diversificadas e reduzir riscos.";
  }

  if (formattedValue === "bdr" || formattedValue === "bdrs") {
    return "Tenha acesso às maiores empresas globais sem sair do mercado brasileiro. Invista em BDRs e participe do crescimento de gigantes internacionais.";
  }

  return value;
}
