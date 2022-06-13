import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styles from "/styles/Cart.module.css";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { removeProduct, reset } from "../redux/cartSlice";
import axios from "axios";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post(
        "https://phoxiclo.vercel.app/api/orders",
        data
      );
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        Thank you for ordering with Pho Xic Lo! Your cart total is ${cart.total}
        . <br />
      </div>
      <div className={styles.cart}>
        {cart.products.map((p) => (
          <div key={p.id} className={styles.product}>
            <div className={styles.imgContainer}>
              <Image
                src={p.img}
                width="200"
                height="200"
                alt=""
                className={styles.productimg}
              />
            </div>
            <div className={styles.desc}>
              <b>
                {" "}
                Total Cost: ${p.price * p.quantity}
                <br />
                <br />
              </b>
              <span className={styles.title}>{p.title}</span>

              <span>Quantity: {p.quantity}</span>
              <span>Price: ${p.price}</span>
              {p.extras.length !== 0 && (
                <span>
                  Extra:
                  {p.extras.map((extra) => (
                    <span key={extra._id}>{extra.text}</span>
                  ))}
                </span>
              )}
              {p.notes !== "" && <span>Notes: {p.notes}</span>}
            </div>

            <div className={styles.remove}>
              <span
                className={styles.delete}
                onClick={(e) => dispatch(removeProduct(p))}
              >
                ✖
              </span>
            </div>
          </div>
        ))}
        <div className={styles.wrapper}>
          <div className={styles.message}>
            Your cart total is ${cart.total}.
          </div>
          <div className={styles.total}>
            {open ? (
              <div className={styles.paymentMethods}>
                <div className={styles.pickPayment}>
                  Pick a payment method below:
                </div>
                <div className={styles.choose}>
                  <div className={styles.cashPayment}>
                    <button
                      className={styles.payButton}
                      onClick={() => {
                        setCash(true);
                        setOpen(false);
                      }}
                    >
                      Pay cash on delivery
                    </button>
                  </div>
                  <div className={styles.paypalPayment}>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AaMFOZ5J5QOheAOqwAxvjHVp_3ZhDfQ_KgcLiPBuHxn_f1FiQto7QZ6JANLnkoc5iNvcKhSx2_Phvdg2",
                        components: "buttons",
                        currency: "USD",
                      }}
                    >
                      <ButtonWrapper currency={currency} showSpinner={false} />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            ) : cart.total == 0 ? (
              ""
            ) : (
              <button className={styles.button} onClick={() => setOpen(true)}>
                Checkout
              </button>
            )}
          </div>
        </div>
        {cash && (
          <OrderDetail
            total={cart.total}
            createOrder={createOrder}
            close={(e) => {
              setCash(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
