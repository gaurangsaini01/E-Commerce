import { ADD_TO_CART_API, GET_CART_API } from "../apis";
import { add } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
async function addToCart(id, token, dispatch) {
  try {
    // console.log(id,token)
    const res = await axios.post(
      ADD_TO_CART_API,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) {
      throw new Error("");
    }
    const cart = res.data.data;
    dispatch(add(cart));
    toast.success("Added to Cart", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  } catch (err) {
    console.log(err);
    toast.error("Couldn't add to cart", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  }
}

async function getCartData(token) {
  try {
    const res = await axios.get(GET_CART_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("");
    }
    const data = res.data.data;
    return data;
  } catch (err) {
    toast.error("Couldn't get cart data", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  }
}
export { addToCart ,getCartData};
