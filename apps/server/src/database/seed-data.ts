export const SEED_CATEGORIES = [
    "Entradas", "Gaseosas", "Postres", "Piqueos", "Adicionales", "Tragos"
];

export const SEED_ITEMS = [
    // Entradas (mapped from Entradas, Ceviches, Caldos y Sopas, Platos Tipicos, Sanduches, Menu Ninos)
    { id: "ent-1", name: "Ensalada Cesar de Pollo", category: "Entradas", price: 9.80, image: "/pics/14.jpeg" },
    { id: "ent-2", name: "Ensalada Fria", category: "Entradas", price: 6.20, image: "/pics/15.jpeg" },
    { id: "ent-3", name: "Humita", category: "Entradas", price: 5.15, image: "/pics/4.jpeg" },
    { id: "ent-4", name: "Hayaca", category: "Entradas", price: 6.20, image: "/pics/16.jpeg" },
    { id: "ent-5", name: "Muchines", category: "Entradas", price: 6.80, image: "/pics/6.jpeg" },
    { id: "ent-6", name: "Patacones", category: "Entradas", price: 3.75, image: "/pics/17.jpeg" },
    { id: "ent-7", name: "Maduro", category: "Entradas", price: 16.99, image: "/pics/18.jpeg" },
    { id: "ent-8", name: "Empanaditas de Viento con Queso", category: "Entradas", price: 6.95, image: "/pics/19.jpeg" },
    { id: "ent-9", name: "Empanaditas MIxtas", category: "Entradas", price: 6.95, image: "/pics/20.jpeg" },
    { id: "ent-10", name: "Tortitas de Verde", category: "Entradas", price: 5.20, image: "/pics/21.png" },
    { id: "cev-1", name: "Ceviche de Camaron", category: "Entradas", price: 12.95, image: "/pics/22.jpeg" },
    { id: "cev-2", name: "Ceviche de Pescado", category: "Entradas", price: 13.40, image: "/pics/23.jpeg" },
    { id: "cev-3", name: "Ceviche de Concha", category: "Entradas", price: 14.90, image: "/pics/24.jpeg" },
    { id: "cev-4", name: "Ceviche de Camaron con Calamar", category: "Entradas", price: 13.95, image: "/pics/25.jpeg" },
    { id: "cev-5", name: "Ceviche Mixto", category: "Entradas", price: 13.95, image: "/pics/26.jpeg" },
    { id: "sop-1", name: "Caldo de Salchicha", category: "Entradas", price: 8.25, image: "/pics/1.jpeg" },
    { id: "sop-2", name: "Caldo de Pata", category: "Entradas", price: 7.95, image: "/pics/27.jpeg" },
    { id: "sop-3", name: "Encebollado de Pescado", category: "Entradas", price: 7.95, image: "/pics/28.jpeg" },
    { id: "sop-4", name: "Encebollado Mixto", category: "Entradas", price: 9.45, image: "/pics/29.jpeg" },
    { id: "sop-5", name: "Meloso de Gallina", category: "Entradas", price: 7.95, image: "/pics/30.jpeg" },
    { id: "sop-6", name: "Aguado de Gallina", category: "Entradas", price: 7.95, image: "/pics/31.jpeg" },
    { id: "sop-7", name: "Caldo de Gallina", category: "Entradas", price: 7.99, image: "/pics/32.jpeg" },
    { id: "sop-8", name: "Locro de Papas con Cuero", category: "Entradas", price: 7.95, image: "/pics/3.jpeg" },
    { id: "sop-9", name: "Caldo de Bola", category: "Entradas", price: 9.85, image: "/pics/34.jpeg" },
    { id: "tip-1", name: "Guatita", category: "Entradas", price: 13.75, image: "/pics/39.jpeg" },
    { id: "tip-2", name: "Seco de Gallina", category: "Entradas", price: 14.95, image: "/pics/7.jpeg" },
    { id: "tip-3", name: "Seco de Chivo", category: "Entradas", price: 16.95, image: "/pics/13.jpeg" },
    { id: "tip-4", name: "Seco de Chancho", category: "Entradas", price: 14.90, image: "/pics/5.jpeg" },
    { id: "tip-5", name: "Fritada", category: "Entradas", price: 15.20, image: "/pics/2.jpeg" },
    { id: "tip-6", name: "Lomo Apanado", category: "Entradas", price: 12.95, image: "/pics/35.jpeg" },
    { id: "tip-7", name: "Churrasco", category: "Entradas", price: 14.45, image: "/pics/11.jpeg" },
    { id: "tip-8", name: "Lomito Saltado", category: "Entradas", price: 14.45, image: "/pics/37.jpeg" },
    { id: "tip-9", name: "Chuleta y arroz con menestra", category: "Entradas", price: 12.95, image: "/pics/38.jpeg" },
    { id: "tip-10", name: "Pollo y arroz con menestra", category: "Entradas", price: 12.95, image: "/pics/40.jpeg" },
    { id: "tip-11", name: "Carne y arroz con menestra", category: "Entradas", price: 13.95, image: "/pics/41.jpeg" },
    { id: "tip-12", name: "Lomo fino a la plancha", category: "Entradas", price: 17.65, image: "/pics/12.jpeg" },
    { id: "tip-13", name: "Sango de Choclo con camaron", category: "Entradas", price: 13.95, image: "/pics/42.png" },
    { id: "tip-14", name: "Cazuela de Pescado", category: "Entradas", price: 12.45, image: "/pics/43.jpeg" },
    { id: "tip-15", name: "Cazuela Mixta", category: "Entradas", price: 13.95, image: "/pics/43.jpeg" },
    { id: "tip-16", name: "LLapingacho", category: "Entradas", price: 13.95, image: "/pics/45.jpeg" },
    { id: "tip-17", name: "Bandera Mixta", category: "Entradas", price: 13.95, image: "/pics/9.jpeg" },
    { id: "san-1", name: "Sándwich de Pollo", category: "Entradas", price: 6.50, image: "/pics/46.jpeg" },
    { id: "san-2", name: "Sándwich de Jamón y Queso", category: "Entradas", price: 5.00, image: "/pics/47.jpeg" },
    { id: "san-3", name: "Sándwich Vegetariano", category: "Entradas", price: 5.80, image: "/pics/generated/san-3.webp" },
    { id: "nin-1", name: "Pechuga de Pollo con Papas Fritas", category: "Entradas", price: 4.50, image: "/pics/generated/nin-1.webp" },
    { id: "nin-2", name: "Mini Hamburguesa con Papas", category: "Entradas", price: 4.00, image: "/pics/generated/nin-2.webp" },
    { id: "nin-3", name: "Pizza Personal", category: "Entradas", price: 4.20, image: "/pics/generated/nin-3.webp" },

    // Adicionales
    { id: "adi-1", name: "Papas Fritas", category: "Adicionales", price: 2.00, image: "/pics/generated/adi-1.webp" },
    { id: "adi-2", name: "Arroz Blanco", category: "Adicionales", price: 1.50, image: "/pics/generated/adi-2.webp" },
    { id: "adi-3", name: "Ensalada Mixta", category: "Adicionales", price: 2.30, image: "/pics/generated/adi-3.webp" },

    // Piqueos
    { id: "piq-1", name: "Yuca con Salsa", category: "Piqueos", price: 3.80, image: "/pics/generated/piq-1.webp" },
    { id: "piq-2", name: "Tostones con Guacamole", category: "Piqueos", price: 4.20, image: "/pics/generated/piq-2.webp" },
    { id: "piq-3", name: "Alitas de Pollo", category: "Piqueos", price: 5.00, image: "/pics/generated/piq-3.webp" },

    // Postres (mapped from Postres, Desayuno y Tarde)
    { id: "pos-1", name: "Tarta de Manzana", category: "Postres", price: 3.00, image: "/pics/generated/pos-1.webp" },
    { id: "pos-2", name: "Flan Casero", category: "Postres", price: 2.80, image: "/pics/generated/pos-2.webp" },
    { id: "pos-3", name: "Helado de Chocolate", category: "Postres", price: 2.50, image: "/pics/8.jpeg" },
    { id: "des-1", name: "Desayuno Tradicional", category: "Postres", price: 7.00, image: "/pics/generated/des-1.webp" },
    { id: "des-2", name: "Tostadas con Mantequilla", category: "Postres", price: 3.50, image: "/pics/generated/des-2.webp" },
    { id: "des-3", name: "Café con Leche", category: "Postres", price: 2.50, image: "/pics/generated/des-3.webp" },

    // Gaseosas (mapped from Bebidas Calientes, Gaseosas)
    { id: "cal-1", name: "Café Americano", category: "Gaseosas", price: 1.80, image: "/pics/generated/cal-1.webp" },
    { id: "cal-2", name: "Té Verde", category: "Gaseosas", price: 1.50, image: "/pics/generated/cal-2.webp" },
    { id: "cal-3", name: "Chocolate Caliente", category: "Gaseosas", price: 2.20, image: "/pics/generated/cal-3.webp" },
    { id: "gas-1", name: "Coca-Cola", category: "Gaseosas", price: 1.20, image: "/pics/02.jpeg" },
    { id: "gas-2", name: "Sprite", category: "Gaseosas", price: 1.20, image: "/pics/08.jpeg" },
    { id: "gas-3", name: "Fanta", category: "Gaseosas", price: 1.20, image: "/pics/09.jpeg" },

    // Tragos (mapped from Tragos, Cervezas)
    { id: "tra-1", name: "Mojito", category: "Tragos", price: 5.50, image: "/pics/generated/tra-1.webp" },
    { id: "tra-2", name: "Pisco Sour", category: "Tragos", price: 6.00, image: "/pics/generated/tra-2.webp" },
    { id: "tra-3", name: "Caipirinha", category: "Tragos", price: 5.80, image: "/pics/generated/tra-3.webp" },
    { id: "cer-1", name: "Club Verde", category: "Tragos", price: 2.50, image: "/pics/01.jpeg" },
    { id: "cer-2", name: "Pilsener", category: "Tragos", price: 3.50, image: "/pics/04.png" },
    { id: "cer-3", name: "Pilsener Light", category: "Tragos", price: 3.50, image: "/pics/05.jpeg" },
    { id: "cer-4", name: "Budweiser", category: "Tragos", price: 3.50, image: "/pics/06.jpeg" },
    { id: "cer-5", name: "Stella-Artois", category: "Tragos", price: 3.50, image: "/pics/03.jpeg" },
    { id: "cer-6", name: "Cerveza Artesanal", category: "Tragos", price: 4.00, image: "/pics/07.jpeg" }
];
