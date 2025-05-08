import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import Axios from '../../../Axios/Axios'

// Function to load script and append it in the DOM tree.
const loadScript = (src) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('Razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.log('Error loading Razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});

const serverBaseUrl = "https://yourserver.com"; // Replace with your actual server URL

const RenderRazorpay = ({ orderId, keyId, keySecret, amount }) => {
    console.log(orderId, keyId, keySecret, amount,"----------------")
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  // Function to display the Razorpay checkout modal
  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: "rzp_test_mSqsAVGi288zyw",
      amount: amount * 100, // Convert amount to the lowest currency unit (paise)
      currency :"INR",
      name: "Bus Booking Govind",
      description: "Order Payment",
      order_id: orderId,
      handler: async (response) => {
        console.log("Payment Success:", response);
        
        await handlePayment("success", response);
      },
      prefill: {
        name: "Neo Tokyo",
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "User Address",
      },
      theme: {
        color: "#528FF0",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on('payment.failed', async (response) => {
      console.log("Payment Failed:", response.error);
      paymentId.current = response.error.metadata.payment_id;

      await handlePayment("failed", response.error);
    });

    rzp1.open();
  };

  // Function to inform the server about the payment status
  const handlePayment = async (status, orderDetails = {}) => {
    try {
      await Axios.post(`${serverBaseUrl}/payment`, {
        status,
        orderDetails,
      });
      console.log("Payment status updated on server");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  useEffect(() => {
    console.log('Initializing Razorpay');
    displayRazorpay();
  }, []); // Ensure dependencies are correctly passed

  return null;
};

RenderRazorpay.propTypes = {
  orderId: PropTypes.string.isRequired,
  keyId: PropTypes.string.isRequired,
  keySecret: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default RenderRazorpay;