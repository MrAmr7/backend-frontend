// PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();

    // Simple validation
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardholderName) {
      alert('Please fill in all fields.');
      return;
    }

    alert('Payment processed successfully!');
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-indigo-800 mb-8">Secure Payment</h1>
        
        {/* Payment Methods Selector */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-3 text-sm rounded-xl shadow-lg ${paymentMethod === 'creditCard' ? 'bg-indigo-700 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setPaymentMethod('creditCard')}
          >
            Credit Card
          </button>
          <button
            className={`px-6 py-3 text-sm rounded-xl shadow-lg mx-4 ${paymentMethod === 'paypal' ? 'bg-indigo-700 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            PayPal
          </button>
        </div>

        {paymentMethod === 'creditCard' && (
          <form onSubmit={handleSubmitPayment} className="space-y-6">
            {/* Cardholder Name */}
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-800">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={paymentInfo.cardholderName}
                onChange={handleInputChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-800">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            {/* Expiry Date and CVV */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-800">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-800">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition duration-300"
            >
              Complete Payment
            </button>
          </form>
        )}

        {paymentMethod === 'paypal' && (
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-4">You will be redirected to PayPal for payment.</p>
            <button
              onClick={() => {
                alert('Redirecting to PayPal...');
                navigate('/confirmation');
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
            >
              Pay with PayPal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
