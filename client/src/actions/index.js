import products from '../apis/products';
import artworksBase from '../apis/artworksBase';

export const fetchOneArtWork = (workId) => {
  const oneArtwork = products.find((p) => p._id === workId);
  return {
    type: 'FETCH_THE_ARTWORK',
    payload: oneArtwork,
  };
};

export const fetchAllArtWorks = () => async (dispatch) => {
  try {
    const response = await artworksBase.get('api/artworks');
    console.log(response);
    dispatch({
      type: 'FETCH_ALL_ARTWORKS',
      payload: response.data,
    });
  } catch (e) {
    alert('looks like there is problem with your internet connection');
  }
};
