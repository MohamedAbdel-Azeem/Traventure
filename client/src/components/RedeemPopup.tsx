import React, { useState } from 'react';
import WaitingResponse from './Shenawy/WaitingResponse';
import ShowingResponse from './Shenawy/ShowingResponse';
import { redeemPoints } from '../custom_hooks/touristpoints/redeemPoints';


interface RedeemPopupProps {
  points: number;
  username: string;
  onClose: () => void;
}

const RedeemPopup: React.FC<RedeemPopupProps> = ({  points, username,onClose }) => {
  const [redeemAmount, setRedeemAmount] = useState("");
  const [showWaitingResponse, setShowWaitingResponse] = useState(false);
  const [showingMessage, setShowingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleRedeemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedeemAmount(e.target.value);
    setErrorMessage(''); // Clear error message on input change
  };

  const handleConfirm = async () => {
    const amountToRedeem = Number(redeemAmount);

    // Validate redeem amount
    if (amountToRedeem <= 0 || isNaN(amountToRedeem)) {
      setErrorMessage('Please enter a valid amount greater than zero.'); // Set error message
      return; // Exit the function if the input is invalid
    }
    if(amountToRedeem > points){
      setErrorMessage('You do not have enough points to redeem this amount.'); // Set error message
      return; // Exit the function if the input is invalid
    }



    // If the redeem amount is valid, show the waiting response
    setShowWaitingResponse(true);



    try {

      // Call the redeemPoints function
      const response = await redeemPoints(username, amountToRedeem); // Replace "touristUsername" with the actual username

      // Handle the response
      setShowingMessage(`Successfully redeemed ${redeemAmount} points!`); // Set success message
    } catch (error) {
      setErrorMessage(error.message || 'Error redeeming points'); // Set error message
    } finally {
      setShowWaitingResponse(false); // Close the waiting response dialog
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg relative flex flex-col">
        <div className="flex">
          {/* Left Side - Input Box */}
          <div className="w-1/2 pr-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Redeem Points</h2>
            <input
              type="number"
              value={redeemAmount}
              onChange={handleRedeemChange}
              placeholder="Amount to redeem"
              className="w-full p-2 border border-gray-300 rounded-md"
              min="1" // Prevents negative values and zero
            />
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>} {/* Display error message */}
          </div>
          {/* Right Side - Info Box */}
          <div className="w-1/2 pl-4 border-l border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Points Conversion</h3>
            <p className="text-gray-600">10000 points = $100.00</p>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm} // Directly call handleConfirm
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Okay
          </button>
        </div>
      </div>

      {/* Waiting Response Component */}
      {showWaitingResponse && (
        <WaitingResponse
          message={`Are you sure you want to redeem ${redeemAmount} points?`}
          onConfirm={() => {
            setShowingMessage(`Successfully redeemed ${redeemAmount} points!`); // Set success message
            setShowWaitingResponse(false); // Close the waiting response dialog
          }}
          onCancel={() => setShowWaitingResponse(false)}
        />
      )}

      {/* Showing Response Component */}
      {showingMessage && (
        <ShowingResponse
          message={showingMessage}
          onClose={() => {
            setShowingMessage(''); // Clear the message when closed
            onClose(); // Optionally close the redeem popup
          }}
        />
      )}
    </div>
  );
};

export default RedeemPopup;
