import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { addMoneyApi } from "../../../utils/services/user/PaymentServices";

const stripePromise = loadStripe("pk_test_51Q0h36Ru6GkJxypiKWTVhEfFFn6QbWP7PpM0gHwpgL9JVcgUi6UrHW6cxdjZOVblRSC56Xy5GwlcPHHZ6T6ILFPS00SpAxYfBb"); // Replace with your Stripe public key

const StripePaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientSecret, amount } = location.state || {};

  const handlePaymentSuccess = async (paidAmount, paymentIntent) => {
   
    try {
      let body = {
        amount: paidAmount,
        transactionId: paymentIntent.id,
        paymentMethod: paymentIntent.payment_method_types[0],
        status: paymentIntent.status,
      };

      let res = await addMoneyApi(body); // Call your API to record the payment
      if (res.success) {
        toast.success(`${paidAmount} added successfully`);
        setTimeout(() => {
          navigate("/user/wallet"); // Navigate to wallet after success
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (error) {
          toast.error(`Payment failed: ${error.message}`);
        } else if (paymentIntent.status === "succeeded") {
          toast.success("Payment successful!");
          handlePaymentSuccess(amount, paymentIntent); // Call the success handler
        }
      } catch (error) {
        toast.error("An error occurred during payment.");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="card-element-wrapper">
          <CardElement className="card-element" />
        </div>
        <button type="submit" className="pay-button">
          Pay ₹{amount}
        </button>
      </form>
    );
  };

  // Check for valid payment data
  if (!clientSecret || !amount) {
    return <p>Invalid payment data</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="payment-page">
        <h2 className="payment-title">Complete Your Payment</h2>
        <StripePaymentForm />
      </div>
    </Elements>
  );
};

export default StripePaymentPage;
