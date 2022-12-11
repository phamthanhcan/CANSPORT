import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { postApi } from "../../../shared/helper/api";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe(
  "pk_test_51JN6JuAe7sFLRsUwIR6sdHibNOgJvtknpitwEu83YsqsEOVfWNAL4lk9zqjzXi4yAzAJaQMulbaWrKkF0Q5aOqWC00Q7cQbEan"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const {
    data,
    products,
    totalPrice,
    cartId,
    services,
    province,
    district,
    ward,
  } = location.state;

  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("services", JSON.stringify(services));
  localStorage.setItem("province", JSON.stringify(province));
  localStorage.setItem("ward", JSON.stringify(ward));
  localStorage.setItem("district", JSON.stringify(district));
  localStorage.setItem("cart", JSON.stringify(cartId));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    postApi(["create-payment-intent"], {
      totalPrice,
    }).then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="d-flex f-center-x py-5">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm price={totalPrice} products={products} />
        </Elements>
      )}
    </div>
  );
}
