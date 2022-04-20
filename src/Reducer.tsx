export const defaultState = {
    walletAddress: "",
    walletContextDetected: false,
    onFantomNetwork: false,
    totalPopsSupply: 0,
    errorMessage: "",
};

const formatAddress = (addressString:any) => {
  if (addressString.length === 42) {
    return addressString.substring(0,6) + "..." + addressString.substring(38,42);
  } else {
    return "";
  }
}

const Reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'walletAddress':
      return {
        ...state,
        walletAddress: action.content
      };
    case 'walletContextDetected':
      return {
        ...state,
        walletContextDetected: action.content
      }
    case 'onFantomNetwork':
      return {
        ...state,
        onFantomNetwork: action.content
      }
    case 'totalPopsSupply':
      return {
        ...state,
        totalPopsSupply: action.content
      }
    case 'errorMessage':
      return {
        ...state,
        errorMessagee: action.content
      }
    default:
      return state;
  }
};

export default Reducer;