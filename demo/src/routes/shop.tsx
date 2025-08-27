import {
  Button,
  Card,
  Drawer,
  DrawerContent,
  Table,
  Input,
  ToastContainer,
  toast,
} from 'pui';
import {useState, useRef} from 'preact/hooks';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  {id: 1, name: 'PUI T‑Shirt', price: 25},
  {id: 2, name: 'PUI Hoodie', price: 50},
  {id: 3, name: 'Sticker Pack', price: 5},
];

interface CartItem {
  id: number;
  qty: number;
}

export default function ShopDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const drawerRef = useRef<HTMLDialogElement>(null);

  function addToCart(id: number) {
    setCart(items => {
      const existing = items.find(i => i.id === id);
      if (existing) {
        return items.map(i => (i.id === id ? {...i, qty: i.qty + 1} : i));
      }
      return [...items, {id, qty: 1}];
    });
    const product = products.find(p => p.id === id)!;
    toast.show(`${product.name} added to cart`);
  }

  function updateQty(id: number, qty: number) {
    setCart(items => items.map(i => (i.id === id ? {...i, qty} : i)));
  }

  const total = cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id)!;
    return sum + p.price * item.qty;
  }, 0);

  return (
    <div class="shop">
      <ToastContainer />
      <nav class="shop-nav">
        <Button onClick={() => drawerRef.current?.showModal()}>
          Cart ({cart.reduce((s, i) => s + i.qty, 0)})
        </Button>
      </nav>
      <div class="shop-products">
        {products.map(p => (
          <Card class="shop-product" key={p.id}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Button onClick={() => addToCart(p.id)}>Add to Cart</Button>
          </Card>
        ))}
      </div>
      <Drawer>
        <DrawerContent ref={drawerRef} class="shop-cart">
          <h2>Cart</h2>
          {cart.length ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => {
                    const p = products.find(pr => pr.id === item.id)!;
                    return (
                      <tr key={item.id}>
                        <td>{p.name}</td>
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
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <p class="shop-total">Total: ${total}</p>
              <Button onClick={() => drawerRef.current?.close()}>Close</Button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
