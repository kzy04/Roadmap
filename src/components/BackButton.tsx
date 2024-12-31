'use client';

export default function BackButton() {
  // Handle back button click
  const handleBack = () => {
    window.history.back(); // Go to the previous page in history
  };

  return (
    <button
      onClick={handleBack}
      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Go Back
    </button>
  );
}
