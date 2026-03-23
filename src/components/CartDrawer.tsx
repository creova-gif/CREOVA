import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(t('cart.removed'));
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl">{t('cart.title')}</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900" aria-label={t('a11y.close')}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-neutral-500 py-12">
              <div className="mb-2">{t('cart.empty')}</div>
              <div className="text-sm">{t('cart.empty.subtitle')}</div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-sm">{item.name}</h3>
                    <p className="text-sm text-neutral-500">${item.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-neutral-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between">
              <span>{t('cart.total')}</span>
              <span className="text-xl">${totalPrice.toFixed(2)} {t('common.currency')}</span>
            </div>
            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
              {t('cart.checkout')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                onClose();
              }}
            >
              {t('cart.continue')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}