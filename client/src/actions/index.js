// import randomNeed from '../apis/randomNeed';
// import etherPrice from '../apis/EtherPrice';
import products from '../apis/products';

export const fetchOneArtWork = (_id) => {
  const oneArtwork = products._id;
  return {
    type: 'FETCH_THE_ARTWORK',
    payload: oneArtwork,
  };
};

export const fetchAllArtWorks = () => {
  const allArtworks = products;
  return {
    type: 'FETCH_ALL_ARTWORK',
    payload: allArtworks,
  };
};

// export const fetchNeed = () => async (dispatch) => {
//   try {
//     const response = await randomNeed.get(
//       '/api/v2/public/random/need?_lang=en'
//     );
//     dispatch({
//       type: 'FETCH_NEED',
//       payload: response.data,
//     });
//   } catch (e) {
//     alert('looks like there is problem with your internet connection');
//   }
// };

// export const fetchEthPrice = (needFetchedCost) => async (dispatch) => {
//   try {
//     const response = await etherPrice.get('/api/v3/coins/ethereum');
//     // Due to $ / IRR sever volatility in recent years we are using a constant rate for this version.
//     const USDtoIRR = 25000;
//     const needUsdCost = needFetchedCost / USDtoIRR;
//     const needCostUSD = needUsdCost.toFixed(2);
//     const ethCurrentPrice = response.data.market_data.current_price.usd;
//     const needEthCost =
//       Math.round((needCostUSD / ethCurrentPrice) * 1000000) / 1000000;

//     dispatch({
//       type: 'FETCH_ETH',
//       payload: {
//         ethCurrentPrice,
//         needEthCost,
//       },
//     });
//   } catch (error) {
//     alert('looks like there is problem with your internet connection');
//   }
// };

// export const connectWallet = (accounts, web3, networkId, nakama) => ({
//   type: 'CONNECT_WALLET',
//   payload: {
//     accounts,
//     userAccount: accounts[0],
//     web3,
//     nakama,
//     networkId,
//   },
// });

// export const activateModal = () => ({
//   type: 'NAK_MODAL',
//   payload: true,
// });

// export const deactivateModal = () => ({
//   type: 'NO_NAK_MODAL',
//   payload: false,
// });

// export const fetchIsOwner = (isOwner) => ({
//   type: 'IS_OWNER',
//   payload: isOwner,
// });

// export const fetchTokenURI = (link) => {
//   console.log(link);
//   return {
//     type: 'LINK',
//     payload: link,
//   };
// };

// export const updateMintButton = (text, status) => ({
//   type: 'UPDATE_BUTTON_TEXT',
//   payload: { text, status },
// });
