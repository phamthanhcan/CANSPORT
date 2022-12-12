import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { getTotalPrice } from "../containers/Cart";
import { postApi } from "../../../shared/helper/api";
import { useSelector } from "react-redux";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user.data);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { price } = props;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment success");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        payment_method_data: {
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
        return_url: "http://localhost:3000/order?isFromPayment=1",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <p className="txt-center txt-demi mb-3 txt-lg">Thanh toán {price}VND</p>
      <PaymentElement id="payment-element" />
      <button
        className="payment-btn"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <button id="btn btn-primary">Pay now</button>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
