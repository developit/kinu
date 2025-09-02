import {
  Button,
  Card,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  Table,
  Input,
  ToastContainer,
  toast,
} from 'pui';
import {useState} from 'preact/hooks';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'PUI T‑Shirt',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 2,
    name: 'PUI Hoodie',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1520975718311-ff9c1eb3e0dd?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 3,
    name: 'Sticker Pack',
    price: 5,
    image:
      'https://images.unsplash.com/photo-1585386959984-a4155229ae9d?auto=format&fit=crop&w=400&q=60',
  },
];

interface CartItem {
  id: number;
  qty: number;
}

export default function ShopDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState('');

  function addToCart(id: number) {
    setCart(items => {
      const existing = items.find(i => i.id === id);
      if (existing) return items.map(i => (i.id === id ? {...i, qty: i.qty + 1} : i));
      return [...items, {id, qty: 1}];
    });
    const product = products.find(p => p.id === id)!;
    toast.show(`${product.name} added to cart`);
  }

  function removeFromCart(id: number) {
    setCart(items => items.filter(i => i.id !== id));
    const product = products.find(p => p.id === id)!;
    toast.show(`${product.name} removed from cart`);
  }

  function updateQty(id: number, qty: number) {
    setCart(items => items.map(i => (i.id === id ? {...i, qty} : i)));
  }

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const p = products.find(pr => pr.id === item.id)!;
    total += p.price * item.qty;
  }

  let count = 0;
  for (let i = 0; i < cart.length; i++) count += cart[i].qty;

  const visible = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Drawer>
      <div class="shop">
        <ToastContainer />
        <nav class="shop-nav">
          <Input
            placeholder="Search products…"
            value={query}
            onInput={e => setQuery((e.target as HTMLInputElement).value)}
          />
          <DrawerTrigger>
            <Button>Cart ({count})</Button>
          </DrawerTrigger>
        </nav>
        <div class="shop-products">
          {visible.map(p => (
            <Card class="shop-product" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              <Button onClick={() => addToCart(p.id)}>Add to Cart</Button>
            </Card>
          ))}
        </div>
      </div>
      <DrawerContent class="shop-cart">
        <h2>Cart</h2>
        {cart.length ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => {
                  const p = products.find(pr => pr.id === item.id)!;
                  return (
                    <tr key={item.id}>
                      <td class="cart-name">
                        <img src={p.image} alt="" />
                        {p.name}
                      </td>
                      <td>
                        <Input
                          type="number"
                          min="1"
                          value={item.qty}
                          onInput={e =>
                            updateQty(
                              item.id,
                              parseInt((e.target as HTMLInputElement).value, 10),
                            )
                          }
                        />
                      </td>
                      <td>${p.price * item.qty}</td>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <p class="shop-total">Total: ${total}</p>
            <div class="shop-actions">
              <DrawerClose>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
              <Button onClick={() => toast.show('Checkout not implemented')}>Checkout</Button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </DrawerContent>
    </Drawer>
  );
}
