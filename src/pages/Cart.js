import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash, BsArrowLeft, BsCurrencyRupee } from "react-icons/bs";
import "./Cart.css";

const Cart = () => {
  const [InCartItems, setInCartItems] = useState([]);
  const navigate = useNavigate();
  const storedId = localStorage.getItem('id');
 
  function getCartItems() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    };
    
    // Append storedId to the API URL
    fetch(`https://6657-103-93-20-138.ngrok-free.app/api/cartitems/customer/${storedId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setInCartItems(result);
        console.log("InCartItems:", InCartItems);
      })
      .catch((error) => console.log("error", error));
  }
  const handleDeleteItem = (cartItemId) => {
    fetch(`https://6657-103-93-20-138.ngrok-free.app/api/cartitems/${cartItemId}`, {
      method: "DELETE",
    })
      .then(() => {
        getCartItems();
      })
      .catch((error) => console.log("error", error));
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: InCartItems,
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const calculateTotalAmount = () => {
    return InCartItems.reduce((total, item) => total + item.item_price, 0);
  };

  console.log("InCartItems:", InCartItems);
  return (
    <div className="cart-container">
      <div className="back-icon" onClick={() => navigate(-1)}>
        <BsArrowLeft />
      </div>
      <h2>Cart</h2>
      <ul>
        {InCartItems.length > 0 &&
          InCartItems.map((row) => (
            <div key={row?.id} className="cart-item">
              <li>
                {row?.product?.name} <BsCurrencyRupee />{row?.product?.price || 0}
              </li>
              <img src={row?.product?.image} height={200} width={200} />
              <div>
              
              <div className="item-detail">
                <div className="detail-label">Toppings</div>
                <div className="detail-content">
                {row?.toppings?.map((top, index) => (
                <span key={top?.id}>
                {top?.name} {top?.price > 0 && <>{'  '}<BsCurrencyRupee />{top?.price}</>} {index !== row.toppings.length - 1 && " + "}
                </span>
                ))}
                </div>
                </div>

                <div className="item-detail">
                <div className="detail-label">Crust</div>
                <div className="detail-content">
                 {row?.crust?.name} <BsCurrencyRupee />{row?.crust?.price}
                </div>
                </div>

                <div className="item-detail">
                <div className="detail-label">Size</div>
                <div className="detail-content">
                {row?.size?.name} <BsCurrencyRupee />{row?.size?.price_adjustment}
                </div>
                </div>


                <div className="item-detail">
                  <div className="detail-label">Quantity</div>
                  <div className="detail-content">
                    {row?.quantity}
                  </div>
                </div>
              </div>

              <div>
                <div className="item-detail">
                  <div className="detail-label">Total price</div>
                  <div className="detail-content">
                    <strong>
                      <BsCurrencyRupee />
                      {row?.item_price}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="delete-icon" onClick={() => handleDeleteItem(row?.id)}>
                <BsTrash />
              </div>

            </div>
          ))}
      </ul>

             <div className="total-amount">
                Sub Total: <BsCurrencyRupee />
                {calculateTotalAmount()}
               </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;