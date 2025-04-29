import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router';

export const CartPage = () =>  {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">
             Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 flex gap-4 justify-end">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Continue shoping
              </button>
              <button
                onClick={() => alert('xxx')}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
