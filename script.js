(function(){
  // navbar solid on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('closeOverlay');
  const overlayLinks = document.querySelectorAll('.overlay-link');

  function openOverlay() {
    gsap.to(overlay, { x: '0%', duration: 0.6, ease: 'power4.out', visibility: 'visible', onStart: () => overlay.style.visibility = 'visible' });
    menuBtn.classList.add('active');
  }
  function closeOverlay() {
    gsap.to(overlay, { x: '100%', duration: 0.5, ease: 'power4.in', onComplete: () => overlay.style.visibility = 'hidden' });
    menuBtn.classList.remove('active');
  }
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    (overlay.style.visibility === 'visible' || menuBtn.classList.contains('active')) ? closeOverlay() : openOverlay();
  });
  closeBtn.addEventListener('click', closeOverlay);
  overlayLinks.forEach(link => link.addEventListener('click', closeOverlay));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });

  // back to top button
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // active section in mobile menu
  const sections = document.querySelectorAll('section');
  function setActiveSection() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
        current = section.getAttribute('id');
      }
    });
    overlayLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveSection);
  window.addEventListener('load', setActiveSection);

  // interactive menu modal with pictures and prices
  const modal = document.getElementById('menuModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalList = document.getElementById('modalList');
  const modalClose = document.getElementById('modalClose');

  // Sub-items data with example prices (in KES) – same as before
  const subItems = {
    'Burgers': [
      { name: 'Classic Beef Burger', price: '650' },
      { name: 'Chicken Burger', price: '580' },
      { name: 'Double Cheeseburger', price: '850' },
      { name: 'Veggie Burger', price: '520' },
      { name: 'BBQ Bacon Burger', price: '720' }
    ],
    'Special C3 Chips': [
      { name: 'Loaded Cheese Fries', price: '450' },
      { name: 'Peri Peri Fries', price: '420' },
      { name: 'Garlic Parmesan Fries', price: '480' },
      { name: 'Chilli Cheese Fries', price: '490' }
    ],
    'Salads': [
      { name: 'Caesar Salad', price: '550' },
      { name: 'Greek Salad', price: '520' },
      { name: 'Garden Salad', price: '450' },
      { name: 'Chicken Avocado Salad', price: '680' }
    ],
    'Wings': [
      { name: 'Hot Wings (6 pcs)', price: '550' },
      { name: 'BBQ Wings (6 pcs)', price: '550' },
      { name: 'Lemon Pepper Wings', price: '580' },
      { name: 'Garlic Wings', price: '580' },
      { name: 'Peri Peri Wings', price: '600' }
    ],
    'Chicken': [
      { name: 'Fried Chicken (4 pcs)', price: '650' },
      { name: 'Grilled Chicken', price: '700' },
      { name: 'Chicken Tikka', price: '620' },
      { name: 'Butter Chicken', price: '750' },
      { name: 'Chicken Shawarma', price: '550' }
    ],
    'Steaks': [
      { name: 'Beef Steak', price: '1200' },
      { name: 'Grilled Chicken Steak', price: '950' },
      { name: 'Pepper Steak', price: '1300' },
      { name: 'Steak & Chips', price: '1100' }
    ],
    'Curries': [
      { name: 'Chicken Curry', price: '680' },
      { name: 'Beef Curry', price: '720' },
      { name: 'Vegetable Curry', price: '550' },
      { name: 'Coconut Fish Curry', price: '750' }
    ],
    'Seafood': [
      { name: 'Grilled Fish', price: '850' },
      { name: 'Prawns (10 pcs)', price: '950' },
      { name: 'Calamari', price: '820' },
      { name: 'Fish & Chips', price: '750' },
      { name: 'Seafood Platter', price: '1650' }
    ],
    'Pasta': [
      { name: 'Bolognese', price: '620' },
      { name: 'Carbonara', price: '650' },
      { name: 'Alfredo', price: '670' },
      { name: 'Pesto Pasta', price: '630' },
      { name: 'Arabiata', price: '600' }
    ],
    'Pizza': [
      { name: 'Margherita', price: '750' },
      { name: 'Pepperoni', price: '890' },
      { name: 'BBQ Chicken', price: '950' },
      { name: 'Hawaiian', price: '850' },
      { name: 'Vegetarian Supreme', price: '820' }
    ],
    'Soups': [
      { name: 'Tomato Soup', price: '350' },
      { name: 'Chicken Soup', price: '400' },
      { name: 'Mushroom Soup', price: '380' },
      { name: 'Lentil Soup', price: '320' }
    ],
    'Sandwiches': [
      { name: 'Chicken Sandwich', price: '520' },
      { name: 'Club Sandwich', price: '580' },
      { name: 'Grilled Cheese', price: '450' },
      { name: 'Veg Sandwich', price: '420' }
    ],
    'Bites': [
      { name: 'Spring Rolls (4 pcs)', price: '350' },
      { name: 'Samosa (2 pcs)', price: '250' },
      { name: 'Onion Rings', price: '320' },
      { name: 'Mozzarella Sticks (4 pcs)', price: '420' }
    ],
    'Cakes': [
      { name: 'Chocolate Cake (slice)', price: '380' },
      { name: 'Red Velvet (slice)', price: '420' },
      { name: 'Carrot Cake (slice)', price: '400' },
      { name: 'Black Forest (slice)', price: '450' }
    ],
    'Premium Cakes': [
      { name: 'Lava Cake', price: '520' },
      { name: 'Tiramisu', price: '550' },
      { name: 'Opera Cake', price: '600' },
      { name: 'Cheesecake', price: '480' }
    ],
    'Cheesecakes': [
      { name: 'New York Cheesecake', price: '500' },
      { name: 'Strawberry Cheesecake', price: '530' },
      { name: 'Oreo Cheesecake', price: '550' }
    ],
    'Buttons': [
      { name: 'Chocolate Buttons (6 pcs)', price: '280' },
      { name: 'Caramel Buttons (6 pcs)', price: '300' },
      { name: 'Assorted Buttons', price: '320' }
    ],
    'Waffles': [
      { name: 'Classic Waffle', price: '450' },
      { name: 'Chocolate Waffle', price: '520' },
      { name: 'Strawberry Waffle', price: '550' }
    ],
    'Extreme Waffles': [
      { name: 'Nutella Extreme', price: '680' },
      { name: 'Caramel Crunch', price: '650' },
      { name: 'Fruit Explosion', price: '700' }
    ],
    'Donuts': [
      { name: 'Glazed Donut', price: '150' },
      { name: 'Chocolate Donut', price: '180' },
      { name: 'Sprinkle Donut', price: '170' },
      { name: 'Jam Donut', price: '160' }
    ],
    'Ice Cream': [
      { name: 'Vanilla (scoop)', price: '120' },
      { name: 'Chocolate (scoop)', price: '120' },
      { name: 'Strawberry (scoop)', price: '120' },
      { name: 'Mango (scoop)', price: '150' },
      { name: 'Pistachio (scoop)', price: '180' }
    ],
    'Juices': [
      { name: 'Fresh Orange', price: '250' },
      { name: 'Mango Juice', price: '270' },
      { name: 'Passion Juice', price: '280' },
      { name: 'Pineapple Juice', price: '250' },
      { name: 'Watermelon Juice', price: '240' }
    ],
    'Brainfreezes': [
      { name: 'Blue Lagoon', price: '320' },
      { name: 'Strawberry Blast', price: '320' },
      { name: 'Green Mint', price: '330' },
      { name: 'Tropical Freeze', price: '350' }
    ],
    'Shakes': [
      { name: 'Chocolate Shake', price: '380' },
      { name: 'Vanilla Shake', price: '360' },
      { name: 'Strawberry Shake', price: '380' },
      { name: 'Oreo Shake', price: '420' }
    ],
    'Freakshakes': [
      { name: 'Freakshake Nutella', price: '550' },
      { name: 'Freakshake Caramel', price: '550' },
      { name: 'Birthday Cake Freakshake', price: '600' }
    ],
    'Healthy drinks': [
      { name: 'Detox Green', price: '320' },
      { name: 'Protein Shake', price: '450' },
      { name: 'Berry Smoothie', price: '380' },
      { name: 'Kale Blast', price: '340' }
    ],
    'Mocktails': [
      { name: 'Virgin Mojito', price: '300' },
      { name: 'Sunrise Delight', price: '320' },
      { name: 'Blue Hawaii', price: '350' },
      { name: 'Cinderella', price: '330' }
    ],
    'Iced teas': [
      { name: 'Lemon Iced Tea', price: '250' },
      { name: 'Peach Iced Tea', price: '270' },
      { name: 'Mango Iced Tea', price: '280' }
    ],
    'Teas': [
      { name: 'Masala Chai', price: '180' },
      { name: 'Green Tea', price: '200' },
      { name: 'Black Tea', price: '160' },
      { name: 'Earl Grey', price: '200' }
    ],
    'Speciality coffee': [
      { name: 'Espresso', price: '220' },
      { name: 'Americano', price: '250' },
      { name: 'Latte', price: '300' },
      { name: 'Cappuccino', price: '300' },
      { name: 'Flat White', price: '320' }
    ],
    'Sweet coffees': [
      { name: 'Caramel Macchiato', price: '380' },
      { name: 'Vanilla Latte', price: '360' },
      { name: 'Hazelnut Coffee', price: '370' }
    ],
    'Iced coffees': [
      { name: 'Iced Latte', price: '330' },
      { name: 'Iced Mocha', price: '350' },
      { name: 'Cold Brew', price: '320' }
    ],
    'Frappes': [
      { name: 'Caramel Frappe', price: '420' },
      { name: 'Mocha Frappe', price: '420' },
      { name: 'Vanilla Bean Frappe', price: '400' }
    ],
    'Matcha': [
      { name: 'Matcha Latte', price: '380' },
      { name: 'Iced Matcha', price: '400' },
      { name: 'Matcha Smoothie', price: '420' }
    ],
    'Lemonades': [
      { name: 'Classic Lemonade', price: '220' },
      { name: 'Strawberry Lemonade', price: '270' },
      { name: 'Mint Lemonade', price: '250' }
    ]
  };

  // Helper to get a relevant Unsplash image URL for each category
  function getImageForCategory(category) {
    const searchTerms = {
      'Burgers': 'burger',
      'Special C3 Chips': 'fries',
      'Salads': 'salad',
      'Wings': 'chicken-wings',
      'Chicken': 'grilled-chicken',
      'Steaks': 'steak',
      'Curries': 'curry',
      'Seafood': 'seafood',
      'Pasta': 'pasta',
      'Pizza': 'pizza',
      'Soups': 'soup',
      'Sandwiches': 'sandwich',
      'Bites': 'appetizer',
      'Cakes': 'cake',
      'Premium Cakes': 'cake',
      'Cheesecakes': 'cheesecake',
      'Buttons': 'chocolate',
      'Waffles': 'waffles',
      'Extreme Waffles': 'waffles',
      'Donuts': 'donuts',
      'Ice Cream': 'ice-cream',
      'Juices': 'juice',
      'Brainfreezes': 'smoothie',
      'Shakes': 'milkshake',
      'Freakshakes': 'milkshake',
      'Healthy drinks': 'smoothie',
      'Mocktails': 'mocktail',
      'Iced teas': 'iced-tea',
      'Teas': 'tea',
      'Speciality coffee': 'coffee',
      'Sweet coffees': 'coffee',
      'Iced coffees': 'iced-coffee',
      'Frappes': 'frappe',
      'Matcha': 'matcha',
      'Lemonades': 'lemonade'
    };
    const term = searchTerms[category] || 'food';
    return `https://source.unsplash.com/60x60/?${term}`;
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      if (!category) return;
      const items = subItems[category] || [{ name: 'Coming soon', price: '' }];
      modalTitle.innerText = category;
      modalList.innerHTML = items.map(i => {
        const imgUrl = getImageForCategory(category);
        return `
          <li>
            <img src="${imgUrl}" alt="${category}" loading="lazy">
            <div class="item-details">
              <span class="item-name">${i.name}</span>
              <span class="item-price">${i.price ? i.price + ' KES' : ''}</span>
            </div>
          </li>
        `;
      }).join('');
      modal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    backgroundPositionY: '30%', ease: 'none'
  });

  const animatedSections = document.querySelectorAll('section');
  animatedSections.forEach(section => {
    const elements = Array.from(section.querySelectorAll('.card, .menu-category, .special-card, .grid-4 > div, .badge-wrapper, .menu-item'));
    if (elements.length) {
      gsap.from(elements, {
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' },
        y: 20, opacity: 0.5, duration: 0.6, stagger: 0.02, ease: 'power2.out'
      });
    }
  });

  gsap.to('.menu-item.highlight', { scale: 1.02, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut' });
})();
