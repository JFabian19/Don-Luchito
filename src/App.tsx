import { useMemo, useState } from 'react';
import {
  ChevronRight, Flame, ImageOff, Menu, MessageCircle, Minus, Phone,
  Plus, ShoppingBag, Trash2, X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DEFAULT_MENU_DATA, type Dish } from './data/menuData';

const RESTAURANTE_NAME = "Pollos a la Brasa Leonardo's";
const WHATSAPP_NUMBER = '51907484644';
const PHONE_DISPLAY = '907 484 644';

interface CartItem {
  nombre: string;
  precio: string;
  cantidad: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_MENU_DATA[0].id);
  const [showCart, setShowCart] = useState(false);
  const [showDeliveryNotice, setShowDeliveryNotice] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const cartCount = useMemo(() => cart.reduce((total, dish) => total + dish.cantidad, 0), [cart]);
  const total = useMemo(
    () => cart.reduce((sum, dish) => sum + Number.parseFloat(dish.precio.replace(/[^\d.]/g, '')) * dish.cantidad, 0),
    [cart],
  );

  const addToCart = (dish: Dish) => {
    setCart((current) => {
      const found = current.find((cartDish) => cartDish.nombre === dish.nombre && cartDish.precio === dish.precio);
      return found
        ? current.map((cartDish) => cartDish === found ? { ...cartDish, cantidad: cartDish.cantidad + 1 } : cartDish)
        : [...current, { nombre: dish.nombre, precio: dish.precio, cantidad: 1 }];
    });
  };

  const changeQuantity = (nombre: string, precio: string, amount: number) => {
    setCart((current) => current
      .map((dish) => dish.nombre === nombre && dish.precio === precio
        ? { ...dish, cantidad: dish.cantidad + amount }
        : dish)
      .filter((dish) => dish.cantidad > 0));
  };

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    setShowMenu(false);
    document.getElementById(`category-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sendToWhatsApp = () => {
    const detail = cart.map((dish) => `• ${dish.cantidad} x ${dish.nombre} (${dish.precio})`).join('\n');
    const message = `Resumen del pedido:\n${detail}\n\nTotal: S/ ${total.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="site-shell">
      <div className="menu-page">
        <header className="topbar">
          <a href="#inicio" className="header-logo" aria-label="Inicio de Leonardo's">
            <img src="/logo-leonardos.png" alt="Pollos a la Brasa Leonardo's & Chifa" />
          </a>
          <div className="header-actions">
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="phone-action" aria-label={`Llamar al ${PHONE_DISPLAY}`}>
              <Phone size={16} /> <span>{PHONE_DISPLAY}</span>
            </a>
            <button className="cart-icon" onClick={() => cartCount > 0 && setShowCart(true)} aria-label="Ver pedido">
              <ShoppingBag size={21} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
            <button className="mobile-menu" onClick={() => setShowMenu((visible) => !visible)} aria-label="Ver categorías">
              {showMenu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </header>

        <div className="ember-strip" aria-hidden="true">
          <span>POLLOS A LA BRASA · CHIFA · PARRILLAS · PEDIDOS AL {PHONE_DISPLAY} · </span>
          <span>POLLOS A LA BRASA · CHIFA · PARRILLAS · PEDIDOS AL {PHONE_DISPLAY} · </span>
        </div>

        <section id="inicio" className="hero-section">
          <img className="hero-image" src="/hero-parrilla.png" alt="Pollo dorado a la parrilla sobre brasas" />
          <div className="hero-shade" />
          <div className="hero-content">
            <div className="hero-kicker"><Flame size={16} fill="currentColor" /> Desde la brasa a tu mesa</div>
            <h1>El sabor que<br /><em>enciende</em> el antojo.</h1>
            <p>Pollo jugoso, piel crocante y el aroma inconfundible de nuestras brasas.</p>
            <button className="hero-cta" onClick={() => selectCategory('pollos-a-la-brasa')}>
              Ver nuestra carta <ChevronRight size={18} />
            </button>
          </div>
          <div className="hero-stamp"><span>HECHO</span><strong>AL FUEGO</strong><span>CON SABOR</span></div>
        </section>

        <nav className={`category-nav ${showMenu ? 'is-open' : ''}`} aria-label="Categorías de la carta">
          <div className="category-nav-inner">
            {DEFAULT_MENU_DATA.map((category) => (
              <button key={category.id} onClick={() => selectCategory(category.id)} className={activeCategory === category.id ? 'active' : ''}>
                {category.nombre}
              </button>
            ))}
          </div>
        </nav>

        <main className="menu-content">
          <div className="intro-line"><span>LA CARTA</span><i /><span>LEONARDO'S</span></div>
          {DEFAULT_MENU_DATA.map((category, categoryIndex) => (
            <section id={`category-${category.id}`} key={category.id} className="category-section">
              <div className="category-heading">
                <div className="heading-number">0{categoryIndex + 1}</div>
                <div><p>ESPECIALIDADES</p><h2>{category.nombre}</h2></div>
                <div className="heading-flame"><Flame size={30} fill="currentColor" /></div>
              </div>
              <div className="dish-grid">
                {category.items.map((dish) => (
                  <motion.article key={`${category.id}-${dish.nombre}`} whileHover={{ y: -4 }} transition={{ duration: 0.18 }} className="dish-card">
                    <div className="dish-photo-placeholder" aria-label="Imagen del plato pendiente"><ImageOff size={21} /><span>IMAGEN<br />DEL PLATO</span></div>
                    <div className="dish-copy">
                      <h3>{dish.nombre}</h3>
                      {dish.descripcion && <p>{dish.descripcion}</p>}
                      <div className="dish-bottom"><strong>{dish.precio}</strong><button onClick={() => addToCart(dish)} aria-label={`Agregar ${dish.nombre} al pedido`}><Plus size={18} strokeWidth={3} /></button></div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="site-footer">
          <img src="/logo-leonardos.png" alt="Leonardo's" />
          <p>Pollo a la brasa · Chifa · Parrillas</p>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}><Phone size={16} /> Pedidos: {PHONE_DISPLAY}</a>
          <span>© 2026 Leonardo's. Todos los derechos reservados.</span>
        </footer>
      </div>

      <AnimatePresence>
        {cartCount > 0 && !showCart && (
          <motion.button initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} className="floating-cart" onClick={() => setShowCart(true)}>
            <span className="floating-cart-icon"><ShoppingBag size={19} /></span>
            <span><small>Tu pedido</small>{cartCount} {cartCount === 1 ? 'plato' : 'platos'}</span>
            <b>S/ {total.toFixed(2)}</b><ChevronRight size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCart && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="order-panel" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}>
              <button className="close-button" onClick={() => setShowCart(false)} aria-label="Cerrar pedido"><X size={20} /></button>
              <div className="panel-title"><ShoppingBag size={23} /><div><span>ESTÁS PIDIENDO</span><h2>Tu pedido</h2></div></div>
              <div className="order-list">
                {cart.map((dish) => (
                  <div className="order-row" key={`${dish.nombre}-${dish.precio}`}>
                    <div><h3>{dish.nombre}</h3><p>{dish.precio}</p></div>
                    <div className="quantity-controls"><button onClick={() => changeQuantity(dish.nombre, dish.precio, -1)}><Minus size={15} /></button><span>{dish.cantidad}</span><button onClick={() => changeQuantity(dish.nombre, dish.precio, 1)}><Plus size={15} /></button></div>
                    <button className="remove-item" onClick={() => changeQuantity(dish.nombre, dish.precio, -dish.cantidad)} aria-label={`Eliminar ${dish.nombre}`}><Trash2 size={17} /></button>
                  </div>
                ))}
              </div>
              <div className="total-row"><span>Total estimado</span><strong>S/ {total.toFixed(2)}</strong></div>
              <button className="place-order" onClick={() => setShowDeliveryNotice(true)}>Enviar pedido <ChevronRight size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeliveryNotice && (
          <motion.div className="modal-backdrop delivery-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="delivery-panel" initial={{ scale: 0.94, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 18 }}>
              <button className="close-button" onClick={() => setShowDeliveryNotice(false)} aria-label="Cerrar"><X size={20} /></button>
              <div className="delivery-icon"><Flame size={31} fill="currentColor" /></div>
              <p className="panel-eyebrow">PRONTO DELIVERY</p>
              <h2>Estamos preparando<br />algo buenazo.</h2>
              <p>El formulario para delivery aún está en preparación. No te preocupes: puedes enviarnos el resumen de tu pedido por WhatsApp.</p>
              <button className="whatsapp-button" onClick={sendToWhatsApp}><MessageCircle size={20} /> Enviar por WhatsApp</button>
              <small>Solo se enviará el resumen de tu pedido.</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
