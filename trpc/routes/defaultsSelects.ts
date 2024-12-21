export const defaultUsersSelect = {
  email: true,
  id: true,
  name: true,
  activeWallet: true,
  Wallet: {
    select: {
      name: true,
      id: true,
      currentAmount: true,
      profits: true,
      profitPercentage: true,
      invested: true,
      availableCash: true,
      Stocks: {
        select: {
          id: true,
          ticket: true,
        },
      },
    },
  },
};
