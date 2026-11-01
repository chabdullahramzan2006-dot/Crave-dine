
const categories = [
  { id: "cat-special", name: "Special Menu", slug: "special", sort_order: 1 },
  { id: "cat-pizza", name: "Pizza", slug: "pizza", sort_order: 2 },
  { id: "cat-burgers", name: "Burgers", slug: "burgers", sort_order: 3 },
  { id: "cat-snacks", name: "Snacks", slug: "snacks", sort_order: 4 },
  { id: "cat-pasta", name: "Pasta", slug: "pasta", sort_order: 5 },
  { id: "cat-sandwich", name: "Sandwiches", slug: "sandwiches", sort_order: 6 },
  { id: "cat-wraps", name: "Wraps & Shawarma", slug: "wraps", sort_order: 7 },
  { id: "cat-rolls", name: "Paratha Rolls", slug: "rolls", sort_order: 8 },
  { id: "cat-drinks", name: "Fresh Drinks", slug: "drinks", sort_order: 9 },
  { id: "cat-shakes", name: "Shakes", slug: "shakes", sort_order: 10 },
  { id: "cat-coffee", name: "Coffee & Tea", slug: "coffee", sort_order: 11 },
  { id: "cat-icecream", name: "Ice Cream", slug: "ice-cream", sort_order: 12 },
];

/** One professional image per category so cards look uniform */
const categoryImages = {
  special:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  burgers:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  snacks:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
  pasta:
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  sandwiches:
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
  wraps:
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80",
  rolls:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
  drinks:
    "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80",
  shakes:
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
  coffee:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
  "ice-cream":
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80",
  hero: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2200&q=85",
};

function item(
  partial: Omit<MenuItem, "available" | "price_half" | "price_small" | "price_medium" | "price_large"> &
    Partial<Pick<MenuItem, "available" | "price_half" | "price_small" | "price_medium" | "price_large">>
): MenuItem {
  return {
    available: true,
    price_half: null,
    price_small: null,
    price_medium: null,
    price_large: null,
    ...partial,
  };
}

function pizza(
  id: string,
  name: string,
  description: string,
  tier: "classic" | "deluxe" | "signature" | "filled" | "square",
  featured = false,
  bestseller = false
): MenuItem {
  const prices = {
    classic: { s: 550, m: 1100, l: 1400 },
    deluxe: { s: 700, m: 1350, l: 1650 },
    signature: { s: null as number | null, m: 1500, l: 2000 },
    filled: { s: 800, m: 1450, l: 1800 },
    square: { s: null as number | null, m: 2000, l: 2600 },
  }[tier];

  return item({
    id,
    name,
    description,
    category_id: "cat-pizza",
    category_slug: "pizza",
    price_full: prices.l,
    price_small: prices.s,
    price_medium: prices.m,
    price_large: prices.l,
    image: categoryImages.pizza,
    featured,
    bestseller,
  });
}

const menuItems = [
  // —— SPECIAL MENU ——
  item({
    id: "sp-01",
    name: "Lava Burger",
    description: "House special lava burger with molten cheese finish.",
    category_id: "cat-special",
    category_slug: "special",
    price_full: 600,
    image: categoryImages.burgers,
    featured: true,
    bestseller: true,
  }),
  item({
    id: "sp-02",
    name: "Thrill of Grill Burger",
    description: "Flame-grilled special burger from our signature board.",
    category_id: "cat-special",
    category_slug: "special",
    price_full: 500,
    image: categoryImages.burgers,
    featured: true,
  }),
  item({
    id: "sp-03",
    name: "Fish Burger",
    description: "Crispy fish fillet burger with house sauce.",
    category_id: "cat-special",
    category_slug: "special",
    price_full: 500,
    image: categoryImages.burgers,
  }),
  item({
    id: "sp-04",
    name: "Matka Pizza",
    description: "Signature matka-style pizza, rich and loaded.",
    category_id: "cat-special",
    category_slug: "special",
    price_full: 1000,
    image: categoryImages.pizza,
    featured: true,
    bestseller: true,
  }),
  item({
    id: "sp-05",
    name: "Matka Fries",
    description: "Loaded matka fries — a Crave Dine special.",
    category_id: "cat-special",
    category_slug: "special",
    price_full: 1000,
    image: categoryImages.snacks,
  }),
  item({
    id: "sp-06",
    name: "Matka Pasta",
    description: "Creamy matka pasta served hot and rich.",
    category_id: "cat-special",
    category_slug: "special",
    price_full: 1000,
    image: categoryImages.pasta,
  }),

  // —— CLASSIC PIZZA ——
  pizza("pz-01", "Cheese Lover Pizza", "Extra cheese classic pizza.", "classic", false, true),
  pizza("pz-02", "Vegetarian Pizza", "Fresh vegetable classic pizza.", "classic"),
  pizza("pz-03", "Vegetarian Supreme Pizza", "Loaded vegetarian supreme.", "classic"),
  pizza("pz-04", "Firenze Pizza", "Firenze-style classic pizza.", "classic"),

  // —— TRADITIONAL ——
  pizza("pz-05", "Tikka Pizza", "Chicken tikka traditional pizza.", "classic", true, true),
  pizza("pz-06", "Fajita Pizza", "Chicken fajita traditional pizza.", "classic", true),
  pizza("pz-07", "Bone Fire Pizza", "Spicy bone fire pizza.", "classic"),
  pizza("pz-08", "Punjabi Pizza", "Punjabi-spiced pizza.", "classic"),
  pizza("pz-09", "Beef Pepperoni Pizza", "Beef pepperoni traditional pizza.", "classic"),
  pizza("pz-10", "Tandoori Pizza", "Tandoori chicken pizza.", "classic"),
  pizza("pz-11", "Hawaiian Pizza", "Hawaiian sweet & savoury pizza.", "classic"),
  pizza("pz-12", "Malai Boti Pizza", "Creamy malai boti pizza.", "classic", true),

  // —— DELUXE ——
  pizza("pz-13", "Supreme Pizza", "Deluxe supreme pizza.", "deluxe", true),
  pizza("pz-14", "Crown Crust Pizza", "Deluxe crown crust pizza.", "deluxe", true, true),
  pizza("pz-15", "Special Malai Boti Pizza", "Deluxe special malai boti.", "deluxe"),

  // —— SIGNATURE ——
  pizza("pz-16", "Peri Peri Pizza", "Signature peri peri pizza.", "signature", true),
  pizza("pz-17", "Lazania Pizza", "Signature lazania-style pizza.", "signature"),
  pizza("pz-18", "Double Kabab Pizza", "Signature double kabab pizza.", "signature"),
  pizza("pz-19", "Crave Special Pizza", "Our signature Crave Special pizza.", "signature", true, true),
  pizza("pz-20", "Square Pizza", "Signature square pizza.", "square", true),

  // —— FILLED EDGES ——
  pizza("pz-21", "Behari Filled Edge Pizza", "Special filled edges — behari.", "filled"),
  pizza("pz-22", "Kebab Crust Pizza", "Special filled edges — kebab crust.", "filled"),
  pizza("pz-23", "Cheese Crust Pizza", "Special filled edges — cheese crust.", "filled", true),
  pizza("pz-24", "Creamy Pizza", "Special filled edges — creamy.", "filled"),
  pizza("pz-25", "Kababish Pizza", "Special filled edges — kababish.", "filled"),
  pizza("pz-26", "Special Beef Pizza", "Special filled edges — special beef.", "filled"),
  pizza("pz-27", "Barbi-Que Pizza", "Special filled edges — BBQ.", "filled"),
  pizza("pz-28", "Steak Pizza", "Special filled edges — steak.", "filled"),
  item({
    id: "pz-top",
    name: "Extra Toppings",
    description: "Add extra toppings to any pizza size.",
    category_id: "cat-pizza",
    category_slug: "pizza",
    price_full: 350,
    price_small: 150,
    price_medium: 250,
    price_large: 350,
    image: categoryImages.pizza,
  }),

  // —— BURGERS ——
  ...[
    ["bg-01", "Crispy Petty Burger", 320, "Crispy chicken petty burger."],
    ["bg-02", "Zinger Burger", 370, "Classic crispy zinger burger."],
    ["bg-03", "Zinger Cheese Burger", 450, "Zinger with melted cheese."],
    ["bg-04", "Bar B.Q Burger", 500, "BBQ sauce burger."],
    ["bg-05", "Zinger Tower Burger", 850, "Stacked zinger tower burger."],
    ["bg-06", "Chapli Burger", 400, "Spiced chapli-style burger."],
    ["bg-07", "Double Decker Burger", 600, "Double decker loaded burger."],
    ["bg-08", "Mighty Burger", 600, "Mighty sized house burger."],
    ["bg-09", "Special Pizza Burger", 600, "Pizza-inspired special burger."],
    ["bg-10", "Crave Special Zinger", 550, "House special zinger."],
    ["bg-11", "Chicken Grill Burger", 500, "Flame-grilled chicken burger."],
    ["bg-12", "Beef Grill Burger", 550, "Flame-grilled beef burger."],
  ].map(([id, name, price, description], index) =>
    item({
      id: String(id),
      name: String(name),
      description: String(description),
      category_id: "cat-burgers",
      category_slug: "burgers",
      price_full: Number(price),
      image: categoryImages.burgers,
      featured: index < 2,
      bestseller: id === "bg-02" || id === "bg-05",
    })
  ),

  // —— SNACKS ——
  item({
    id: "sn-01",
    name: "French Fries",
    description: "Crispy golden french fries.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 500,
    price_small: 250,
    price_medium: 350,
    price_large: 500,
    image: categoryImages.snacks,
    bestseller: true,
  }),
  item({
    id: "sn-02",
    name: "Salty Fries",
    description: "Classic salted fries.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 350,
    price_small: 250,
    price_medium: 350,
    image: categoryImages.snacks,
  }),
  item({
    id: "sn-03",
    name: "Mayo Garlic Fries",
    description: "Fries tossed in mayo garlic sauce.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 400,
    price_small: 300,
    price_medium: 400,
    image: categoryImages.snacks,
  }),
  item({
    id: "sn-04",
    name: "Crave Platter",
    description: "Crave snack platter for sharing.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 500,
    price_small: 450,
    price_medium: 500,
    image: categoryImages.snacks,
    featured: true,
  }),
  item({
    id: "sn-05",
    name: "Loaded Fries",
    description: "Fully loaded fries with toppings.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 700,
    price_small: 500,
    price_medium: 700,
    image: categoryImages.snacks,
    bestseller: true,
  }),
  item({
    id: "sn-06",
    name: "Wings / Nuggets",
    description: "Crispy wings or nuggets.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 600,
    price_small: 300,
    price_medium: 600,
    image: categoryImages.snacks,
  }),
  item({
    id: "sn-07",
    name: "Honey Wings",
    description: "Sweet honey glazed wings.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 600,
    image: categoryImages.snacks,
  }),
  item({
    id: "sn-08",
    name: "Broast Piece",
    description: "Crispy broast chicken piece.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 350,
    image: categoryImages.snacks,
  }),
  item({
    id: "sn-09",
    name: "Grill Piece",
    description: "Charcoal grill chicken piece.",
    category_id: "cat-snacks",
    category_slug: "snacks",
    price_full: 400,
    image: categoryImages.snacks,
  }),

  // —— PASTA ——
  item({
    id: "pa-01",
    name: "Crispy Pasta",
    description: "Crispy pasta in house sauce.",
    category_id: "cat-pasta",
    category_slug: "pasta",
    price_full: 750,
    price_small: 500,
    price_medium: 750,
    image: categoryImages.pasta,
  }),
  item({
    id: "pa-02",
    name: "Alfredo Pasta",
    description: "Creamy alfredo pasta.",
    category_id: "cat-pasta",
    category_slug: "pasta",
    price_full: 750,
    price_small: 500,
    price_medium: 750,
    image: categoryImages.pasta,
    bestseller: true,
  }),
  item({
    id: "pa-03",
    name: "White Sauce Pasta",
    description: "Classic white sauce pasta.",
    category_id: "cat-pasta",
    category_slug: "pasta",
    price_full: 750,
    price_small: 500,
    price_medium: 750,
    image: categoryImages.pasta,
  }),
  item({
    id: "pa-04",
    name: "Crave Special Pasta",
    description: "House special pasta.",
    category_id: "cat-pasta",
    category_slug: "pasta",
    price_full: 750,
    price_small: 500,
    price_medium: 750,
    image: categoryImages.pasta,
    featured: true,
  }),

  // —— SANDWICHES ——
  ...[
    ["sw-01", "Chicken Sandwich", 500],
    ["sw-02", "Club Sandwich", 650],
    ["sw-03", "Tikka Sandwich", 550],
    ["sw-04", "Bar B.Q Sandwich", 600],
    ["sw-05", "Grill Sandwich", 600],
    ["sw-06", "Pizza Sandwich", 850],
  ].map(([id, name, price]) =>
    item({
      id: String(id),
      name: String(name),
      description: `${name} made fresh to order.`,
      category_id: "cat-sandwich",
      category_slug: "sandwiches",
      price_full: Number(price),
      image: categoryImages.sandwiches,
      bestseller: id === "sw-02",
    })
  ),

  // —— WRAPS ——
  ...[
    ["wr-01", "Vegetable Shawarma", 170],
    ["wr-02", "Chicken Shawarma", 250],
    ["wr-03", "Chicken Cheese Shawarma", 300],
    ["wr-04", "Kebab Shawarma", 320],
    ["wr-05", "Malai Boti Shawarma", 350],
    ["wr-06", "Zinger Shawarma", 370],
    ["wr-07", "Tortilla Wrap", 500],
  ].map(([id, name, price]) =>
    item({
      id: String(id),
      name: String(name),
      description: `${name} wrapped fresh.`,
      category_id: "cat-wraps",
      category_slug: "wraps",
      price_full: Number(price),
      image: categoryImages.wraps,
      bestseller: id === "wr-02" || id === "wr-06",
    })
  ),

  // —— ROLLS ——
  ...[
    ["rl-01", "Chicken Paratha Roll", 300],
    ["rl-02", "Chicken Cheese Paratha Roll", 350],
    ["rl-03", "Kebab Paratha Roll", 350],
    ["rl-04", "Malai Boti Paratha Roll", 370],
    ["rl-05", "Crispy Chicken Paratha Roll", 380],
    ["rl-06", "Crave Special Paratha Roll", 400],
    ["rl-07", "Behari Roll", 650],
  ].map(([id, name, price]) =>
    item({
      id: String(id),
      name: String(name),
      description: `${name} — hot and flavourful.`,
      category_id: "cat-rolls",
      category_slug: "rolls",
      price_full: Number(price),
      image: categoryImages.rolls,
      featured: id === "rl-06",
    })
  ),

  // —— DRINKS ——
  item({
    id: "dr-01",
    name: "Fresh Lime",
    description: "Freshly squeezed lime drink.",
    category_id: "cat-drinks",
    category_slug: "drinks",
    price_full: 170,
    image: categoryImages.drinks,
  }),
  item({
    id: "dr-02",
    name: "Mint Margarita",
    description: "Chilled mint margarita.",
    category_id: "cat-drinks",
    category_slug: "drinks",
    price_full: 170,
    image: categoryImages.drinks,
    bestseller: true,
  }),

  // —— SHAKES ——
  ...[
    ["sk-01", "Vanilla Ice Cream Shake", 300, "shakes"],
    ["sk-02", "Kulfa Ice Cream Shake", 300, "shakes"],
    ["sk-03", "Mango Ice Cream Shake", 300, "shakes"],
    ["sk-04", "Strawberry Ice Cream Shake", 300, "shakes"],
    ["sk-05", "Chocolate Ice Cream Shake", 300, "shakes"],
    ["sk-06", "Oreo Ice Cream Shake", 300, "shakes"],
    ["sk-07", "Kaju Badam Shake", 350, "shakes"],
    ["sk-08", "Khoya Khajoor Shake", 350, "shakes"],
    ["sk-09", "Dates & Almonds Shake", 350, "shakes"],
    ["sk-10", "Fudge Brownie Shake", 350, "shakes"],
  ].map(([id, name, price]) =>
    item({
      id: String(id),
      name: String(name),
      description: `Thick and creamy ${String(name).toLowerCase()}.`,
      category_id: "cat-shakes",
      category_slug: "shakes",
      price_full: Number(price),
      image: categoryImages.shakes,
      bestseller: id === "sk-06" || id === "sk-10",
    })
  ),

  // —— COFFEE ——
  ...[
    ["cf-01", "Mochaccino", 300],
    ["cf-02", "Very Vanilla Frappe", 300],
    ["cf-03", "Caramel Frappe", 300],
    ["cf-04", "White Chocolate Caramel", 300],
    ["cf-05", "Cappuccino", 200],
    ["cf-06", "Vanilla Latte", 250],
    ["cf-07", "Caramel Latte", 250],
    ["cf-08", "Hot Chocolate", 250],
    ["cf-09", "Desi Tea", 100],
  ].map(([id, name, price]) =>
    item({
      id: String(id),
      name: String(name),
      description: `${name} from our cafe menu.`,
      category_id: "cat-coffee",
      category_slug: "coffee",
      price_full: Number(price),
      image: categoryImages.coffee,
    })
  ),

  // —— ICE CREAM ——
  ...["Kulfa", "Mango", "Vanilla", "Strawberry", "Chocolate"].map((flavor, i) =>
    item({
      id: `ic-0${i + 1}`,
      name: `${flavor} Ice Cream`,
      description: `${flavor} ice cream scoop.`,
      category_id: "cat-icecream",
      category_slug: "ice-cream",
      price_full: 250,
      price_small: 200,
      price_medium: 250,
      image: categoryImages["ice-cream"],
    })
  ),
];

const restaurantInfo = {
  name: "Crave Dine",
  tagline: "Your Taste, Our Passion.",
  phones: ["0303-4625553", "0314-6893553", "0346-8952253"],
  whatsapp: "923034625553",
  address: "Shop # G3, G4, Near Elahi College, Salam Center, Multan Road, Dokota.",
  hours: [{ day: "Open Daily", time: "11:00 AM – 01:00 AM" }],
  mapEmbed:
    "https://maps.google.com/maps?q=Elahi%20College%20Salam%20Center%20Multan%20Road%20Dokota&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

const testimonials = [
  {
    id: 1,
    name: "Hassan Ali",
    text: "Best zinger and pizza deal on Multan Road. Crave Special pizza is unreal — always hot and loaded.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ayesha Khan",
    text: "Family deals are perfect for weekend nights. Fast delivery and portions are generous.",
    rating: 5,
  },
  {
    id: 3,
    name: "Usman Malik",
    text: "Matka fries and lava burger are must-tries. Friendly staff and great late-night option.",
    rating: 5,
  },
];

/** Deals from Crave Dine flyer — prices match printed menu */
const deals: Deal[] = [
  {
    id: "deal-s1",
    title: "Single Deal 1",
    subtitle: "For one",
    description: "Chicken Petty Burger + 350ml Drink",
    price: 400,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s2",
    title: "Single Deal 2",
    subtitle: "For one",
    description: "Zinger Burger + 350ml Drink",
    price: 450,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s3",
    title: "Single Deal 3",
    subtitle: "For one",
    description: "Zinger Cheese Burger + 500ml Drink",
    price: 550,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s4",
    title: "Single Deal 4",
    subtitle: "For one",
    description: "Club Sandwich + 500ml Drink",
    price: 700,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s5",
    title: "Single Deal 5",
    subtitle: "For one",
    description: "Small Pizza + 500ml Drink",
    price: 700,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s6",
    title: "Single Deal 6",
    subtitle: "For one",
    description: "Chapli Burger + Fries + Drink",
    price: 800,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s7",
    title: "Single Deal 7",
    subtitle: "For one",
    description: "Grill Sandwich + Fries + Drink",
    price: 900,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-s8",
    title: "Single Deal 8",
    subtitle: "For one",
    description: "Small Pizza + Zinger + Drink",
    price: 1100,
    badge: "Solo",
    group: "single",
  },
  {
    id: "deal-t1",
    title: "2 Person Deal 1",
    subtitle: "For two",
    description: "2 Shawarma + 2× 500ml Drinks",
    price: 500,
    badge: "Duo",
    group: "two",
  },
  {
    id: "deal-t2",
    title: "2 Person Deal 2",
    subtitle: "For two",
    description: "2 Paratha Rolls + 2 Drinks",
    price: 700,
    badge: "Duo",
    group: "two",
  },
  {
    id: "deal-t3",
    title: "2 Person Deal 3",
    subtitle: "For two",
    description: "2 Zinger Burgers + 2 Drinks",
    price: 850,
    badge: "Duo",
    group: "two",
  },
  {
    id: "deal-t4",
    title: "2 Person Deal 4",
    subtitle: "For two",
    description: "Pasta + Sandwich + 2 Mint Margaritas",
    price: 1000,
    badge: "Duo",
    group: "two",
  },
  {
    id: "deal-t5",
    title: "2 Person Deal 5",
    subtitle: "For two",
    description: "Small Pizza + 2 Burgers + Drink",
    price: 1350,
    badge: "Duo",
    group: "two",
  },
  {
    id: "deal-f1",
    title: "Family Deal 1",
    subtitle: "Family",
    description: "Large Pizza + 1.5L Drink",
    price: 1200,
    badge: "Family",
    group: "family",
  },
  {
    id: "deal-f2",
    title: "Family Deal 2",
    subtitle: "Family",
    description: "Large Pizza + Fries + 1.5L Drink",
    price: 1600,
    badge: "Family",
    group: "family",
  },
  {
    id: "deal-f3",
    title: "Family Deal 3",
    subtitle: "Family",
    description: "2 Large Pizzas + 1.5L Drink",
    price: 2500,
    badge: "Family",
    group: "family",
  },
  {
    id: "deal-f4",
    title: "Family Deal 4",
    subtitle: "Family",
    description: "2 Large Pizzas + 4 Zingers + Fries + 1.5L",
    price: 3500,
    badge: "Family",
    group: "family",
  },
  {
    id: "deal-f5",
    title: "Birthday Deal",
    subtitle: "Family",
    description: "2lb Cake + Pizza + Wings + Drink",
    price: 4500,
    badge: "Birthday",
    group: "family",
  },
  {
    id: "deal-c1",
    title: "Crave Special 1",
    subtitle: "House special",
    description: "Medium Pizza + Wings + 1L Drink",
    price: 1200,
    badge: "Special",
    group: "special",
  },
  {
    id: "deal-c2",
    title: "Crave Special 2",
    subtitle: "House special",
    description: "Large Pizza + Nuggets + 1.5L Drink",
    price: 1800,
    badge: "Special",
    group: "special",
  },
  {
    id: "deal-c3",
    title: "Crave Special 3",
    subtitle: "House special",
    description: "2 Large Pizzas + Wings + 1.5L Drink",
    price: 3200,
    badge: "Special",
    group: "special",
  },
  {
    id: "deal-c4",
    title: "Crave Special 8",
    subtitle: "Mega feast",
    description: "2 Large + 2 Medium Pizzas + 20 Hot Wings + 2× 1.5L Coke",
    price: 6000,
    badge: "Mega",
    group: "special",
  },
];

export { categories, menuItems };
