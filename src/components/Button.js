export default function Button({ children, onClick }) {
  return (
    <button
      className="self-start rounded-full  bg-lime-500 py-4 px-6 text-base font-medium text-gray-900 transition-opacity hover:opacity-90"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
