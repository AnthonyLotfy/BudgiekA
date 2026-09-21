import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Feather,
  Menu,
  MessageCircle,
  Search,
  X,
} from 'lucide-react';

const WHATSAPP_NUMBER = 'YOUR_EGYPTIAN_WHATSAPP_NUMBER';

const images = {
  hero: 'https://images.pexels.com/photos/37880722/pexels-photo-37880722.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  green: 'https://images.pexels.com/photos/35513589/pexels-photo-35513589.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  pair: 'https://images.pexels.com/photos/13425890/pexels-photo-13425890.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  blue: 'https://images.pexels.com/photos/34595526/pexels-photo-34595526.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
};

type Product = {
  name: string;
  description: string;
  category: string;
  image: string;
};

const products: Product[] = [
  {
    name: 'Mariposa',
    description: 'for large sized parrots. Disinfected delicate mixture.',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.52_PM.jpeg',
  },
  {
    name: 'Canario',
    description: 'Disneftect seeds mixture for all canary breeds spices .',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.53_PM.jpeg',
  },
  {
    name: 'Cinta',
    description: 'Disinfected delicate formula for medium & small sized parrots',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.53_PM_(1).jpeg',
  },
  {
    name: 'Sexo',
    description: 'Aphrodisiac Pâtée for all exotic birds species.',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.55_PM.jpeg',
  },
  {
    name: 'LoveTiel',
    description: 'Special seeds mixture for lovebirds & Cockatiels',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.56_PM_(1).jpeg',
  },
  {
    name: 'Citro',
    description: 'Citrus Pâtée. Various citrus fruits Rich in vitamin C .',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.56_PM_(2).jpeg',
  },
  {
    name: 'Winter',
    description: 'Moistened Pâtée rich in Mealworm & honey',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.56_PM_(3).jpeg',
  },
  {
    name: 'Special',
    description: 'Disneftected soft mixture for exotic pigeons breeds . Also energy booster for exotic birds species.',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.56_PM_(4).jpeg',
  },
  {
    name: 'Calcium',
    description: 'Calcium blocks with crushed cuttlebones & oysters .',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.56_PM_(5).jpeg',
  },
  {
    name: 'Eco',
    description: 'Economical seed mixture for Zebra finches & budgies',
    category: '',
    image: '/images/products/WhatsApp_Image_2026-09-14_at_9.04.56_PM.jpeg',
  },
];

const whatsappLink = (productName?: string) => {
  const message = productName
    ? `Hello BudgiekA, I am interested in ${productName}.`
    : 'Hello BudgiekA, I would like to ask about your bird food and supplies.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

function BrandMark() {
  return (
    <a className="brand-mark" href="#home" aria-label="BudgiekA home">
      <span className="brand-name">BudgiekA</span>
      <span className="brand-subline">Endless passion for pets</span>
      <span className="brand-year">Since 2020</span>
    </a>
  );
}

function WhatsAppButton({ label, productName, compact = false }: { label: string; productName?: string; compact?: boolean }) {
  return (
    <a className={`whatsapp-button ${compact ? 'is-compact' : ''}`} href={whatsappLink(productName)} target="_blank" rel="noreferrer">
      <MessageCircle size={compact ? 16 : 18} strokeWidth={1.8} />
      <span>{label}</span>
      {!compact && <ArrowUpRight size={16} strokeWidth={1.8} />}
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All products');

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category).filter(Boolean))), []);
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All products' || product.category === activeCategory;
      const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {['Home', 'Collection', 'Categories', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
            ))}
            <div className="mobile-nav-cta"><WhatsAppButton label="WhatsApp BudgiekA" compact /></div>
          </nav>
          <div className="header-actions">
            <WhatsAppButton label="WhatsApp us" compact />
            <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-image-wrap"><img src={images.hero} alt="Blue budgerigar perched in soft natural light" /></div>
          <div className="hero-overlay" />
          <div className="hero-content page-width">
            <p className="eyebrow">Bird food &amp; essentials · Egypt</p>
            <h1>Premium care<br /><em>for exceptional birds.</em></h1>
            <p className="hero-description">Discover BudgiekA's selection of bird food and supplies for owners who care about every detail.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#collection">Explore collection <ArrowUpRight size={17} /></a>
              <WhatsAppButton label="WhatsApp BudgiekA" />
            </div>
          </div>
          <div className="hero-caption"><span>01</span><span className="caption-line" /><span>THE CARE EDIT</span></div>
          <a className="scroll-cue" href="#collection"><span>Scroll to explore</span><ChevronDown size={16} /></a>
        </section>

        <section className="intro-section page-width" id="about">
          <div className="section-number">01 <span>/</span> ABOUT BUDGIEKA</div>
          <div className="intro-grid">
            <h2>Every detail of care,<br /><em>considered.</em></h2>
            <div className="intro-copy"><p>BudgiekA brings together bird food and essentials chosen with care for the everyday lives of birds and the people who look after them.</p><a className="text-link" href="#collection">Discover our collection <ArrowUpRight size={16} /></a></div>
          </div>
        </section>

        <section className="collection-section" id="collection">
          <div className="page-width">
            <div className="section-heading-row">
              <div><div className="section-number">02 <span>/</span> THE COLLECTION</div><h2>The BudgiekA<br /><em>collection.</em></h2></div>
              <p>Carefully selected food and essentials for birds that deserve the best.</p>
            </div>
            <div className="collection-toolbar" id="categories">
              <div className="category-tabs" role="tablist" aria-label="Product categories">
                {['All products', ...categories].map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} type="button" onClick={() => setActiveCategory(category)}>{category}</button>)}
              </div>
              <label className="search-field"><Search size={16} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" /></label>
            </div>
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <article className="product-card" key={product.name} onClick={() => setSelectedProduct(product)}>
                  <button className="product-image-button" type="button" aria-label={`View ${product.name}`}><img src={product.image} alt={`${product.name} bird care product presentation`} loading={index > 1 ? 'lazy' : 'eager'} /><span className="product-arrow"><ArrowUpRight size={19} /></span></button>
                  <div className="product-meta"><div>{product.category && <span className="product-category">{product.category}</span>}<h3>{product.name}</h3><p className="product-description">{product.description}</p></div><button className="inquire-button" type="button" onClick={(event) => { event.stopPropagation(); window.open(whatsappLink(product.name), '_blank', 'noopener,noreferrer'); }}>Ask about this product <ArrowUpRight size={14} /></button></div>
                </article>
              ))}
            </div>
            {filteredProducts.length === 0 && <div className="empty-state"><Feather size={22} /><p>No products match your search yet.</p><button type="button" onClick={() => setQuery('')}>Clear search</button></div>}
          </div>
        </section>

        <section className="feature-section page-width">
          <div className="feature-image"><img src={images.green} alt="Green budgerigar perched in a calm indoor setting" loading="lazy" /><span className="image-label">A considered approach to care</span></div>
          <div className="feature-copy"><div className="section-number">03 <span>/</span> OUR APPROACH</div><h2>Good care begins<br />with <em>good choices.</em></h2><p>From daily food to thoughtful essentials, our collection is made for bird owners looking for suitable products without the noise.</p><a className="text-link" href="#contact">Talk to BudgiekA <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" />
          <div className="page-width contact-content"><div className="section-number">04 <span>/</span> GET IN TOUCH</div><h2>Have a question<br /><em>about a product?</em></h2><p>Talk to BudgiekA directly on WhatsApp. We are here to help you find a suitable choice for your bird.</p><WhatsAppButton label="Talk to BudgiekA" /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main"><div className="footer-brand"><BrandMark /><p>Premium bird food and supplies for considered care.</p></div><div className="footer-links"><div><span className="footer-label">Explore</span><a href="#collection">Collection</a><a href="#categories">Categories</a><a href="#about">About</a></div><div><span className="footer-label">Connect</span><WhatsAppButton label="WhatsApp BudgiekA" compact /></div></div></div>
        <div className="page-width footer-bottom"><span>© 2026 BudgiekA. All rights reserved.</span><span>Made for birds, chosen with care.</span></div>
      </footer>

      {selectedProduct && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}><div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X size={20} /></button><div className="modal-image"><img src={selectedProduct.image} alt={`${selectedProduct.name} bird care product presentation`} /></div><div className="modal-details">{selectedProduct.category && <span className="product-category">{selectedProduct.category}</span>}<h2 id="product-title">{selectedProduct.name}</h2><p>{selectedProduct.description}</p><WhatsAppButton label="Ask about this product" productName={selectedProduct.name} /></div></div></div>}
    </div>
  );
}

export default App;
