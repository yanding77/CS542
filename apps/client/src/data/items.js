export const categories = [
    "Entradas", "Ceviches", "Caldos y Sopas", "Platos Tipicos", "Banderas", "Sanduches",
    "Menu Ninos", "Adicionales", "Desayuno y Tarde", "Piqueos", "Postres", "Bebidas Calientes", "Gaseosas", "Tragos", "Cervezas",
];

export const menu = [
    // Entrees
    { name: "Ensalada Cesar de Pollo", category: "Entradas", price: 9.80, image: "14.jpeg"},
    { name: "Ensalada Fria", category: "Entradas", price: 6.20, image: "15.jpeg" },
    { name: "Humita", category: "Entradas", price: 5.15 , image: "4.jpeg"},
    { name: "Hayaca", category: "Entradas", price: 6.20 , image: "16.jpeg"},
    { name: "Muchines", category: "Entradas", price: 6.80 , image: "6.jpeg"},
    { name: "Patacones", category: "Entradas", price: 3.75 , image: "17.jpeg"},
    { name: "Maduro", category: "Entradas", price: 16.99 , image: "18.jpeg"},
    { name: "Empanaditas de Viento con Queso", category: "Entradas", price: 6.95, image: "19.jpeg"},
    { name: "Empanaditas MIxtas", category: "Entradas", price: 6.95 , image: "20.jpeg"},
    { name: "Tortitas de Verde" , category: "Entradas", price: 5.20 , image: "21.png"},

    // Appetizers
    { name: "Ceviche de Camaron", category: "Ceviches", price: 12.95, image: "22.jpeg"},
    { name: "Ceviche de Pescado", category: "Ceviches", price: 13.40, image: "23.jpeg"},
    { name: "Ceviche de Concha", category: "Ceviches", price: 14.90, image: "24.jpeg" },
    { name: "Ceviche de Camaron con Calamar", category: "Ceviches", price: 13.95, image: "25.jpeg" },
    { name: "Ceviche Mixto", category: "Ceviches", price: 13.95, image: "26.jpeg" },



    // Vegetarian
    { name: "Caldo de Salchicha", category: "Caldos y Sopas", price: 8.25, image: "1.jpeg"},
    { name: "Caldo de Pata", category: "Caldos y Sopas", price: 7.95, image: "27.jpeg"},
    { name: "Encebollado de Pescado", category: "Caldos y Sopas", price: 7.95, image: "28.jpeg" },
    { name: "Encebollado Mixto", category: "Caldos y Sopas", price: 9.45, image: "29.jpeg" },
    { name: "Meloso de Gallina", category: "Caldos y Sopas", price: 7.95 , image: "30.jpeg"},
    { name: "Aguado de Gallina", category: "Caldos y Sopas", price: 7.95 , image: "31.jpeg"},
    { name: "Caldo de Gallina", category: "Caldos y Sopas", price: 7.99 , image: "32.jpeg"},
    { name: "Locro de Papas con Cuero", category: "Caldos y Sopas", price: 7.95 , image: "33.jpeg"},
    { name: "Caldo de Bola", category: "Caldos y Sopas", price: 9.85 , image: "34.jpeg"},

    // Salads
    { name: "Guatita", category: "Platos Tipicos", price: 13.75, image: "39.jpeg" },
    { name: "Seco de Gallina", category: "Platos Tipicos", price: 14.95, image: "7.jpeg"},
    { name: "Seco de Chivo", category: "Platos Tipicos", price: 16.95 , image: "13.jpeg"},
    { name: "Seco de Chancho", category: "Platos Tipicos", price: 14.90 , image: "5.jpeg"},
    { name: "Fritada", category: "Platos Tipicos", price: 15.20, image: "2.jpeg"},
    { name: "Lomo Apanado", category: "Platos Tipicos", price: 12.95, image: "35.jpeg"},
    { name: "Churrasco", category: "Platos Tipicos", price: 14.45 , image: "11.jpeg"},
    { name: "Lomito Saltado", category: "Platos Tipicos", price: 14.45, image: "37.jpeg"},
    { name: "Chuleta y arroz con menestra", category: "Platos Tipicos", price: 12.95, image: "38.jpeg"},
    { name: "Pollo y arroz con menestra", category: "Platos Tipicos", price: 12.95, image: "40.jpeg"},
    { name: "Carne y arroz con menestra", category: "Platos Tipicos", price: 13.95, image: "41.jpeg"},
    { name: "Lomo fino a la plancha", category: "Platos Tipicos", price: 17.65 , image: "12.jpeg"},
    { name: "Sango de Choclo con camaron", category: "Platos Tipicos", price: 13.95, image: "42.jpeg" },
    { name: "Cazuela de Pescado", category: "Platos Tipicos", price: 12.45, image: "43.jpeg"},
    { name: "Cazuela Mixta", category: "Platos Tipicos", price: 13.95, image: "43.jpeg"},
    { name: "LLapingacho", category: "Platos Tipicos", price: 13.95 , image: "45.jpeg"},
    { name: "Bandera Mixta", category: "Platos Tipicos", price: 13.95, image: "9.jpeg"},

    { name: "Sándwich de Pollo", category: "Sanduches", price: 6.50, image: "46.jpeg" },
    { name: "Sándwich de Jamón y Queso", category: "Sanduches", price: 5.00, image: "47.jpeg" },
    { name: "Sándwich Vegetariano", category: "Sanduches", price: 5.80 },

    // Menu Ninos
    { name: "Pechuga de Pollo con Papas Fritas", category: "Menu Ninos", price: 4.50 },
    { name: "Mini Hamburguesa con Papas", category: "Menu Ninos", price: 4.00 },
    { name: "Pizza Personal", category: "Menu Ninos", price: 4.20 },

    // Adicionales
    { name: "Papas Fritas", category: "Adicionales", price: 2.00 },
    { name: "Arroz Blanco", category: "Adicionales", price: 1.50 },
    { name: "Ensalada Mixta", category: "Adicionales", price: 2.30 },

    // Desayuno y Tarde
    { name: "Desayuno Tradicional", category: "Desayuno y Tarde", price: 7.00 },
    { name: "Tostadas con Mantequilla", category: "Desayuno y Tarde", price: 3.50 },
    { name: "Café con Leche", category: "Desayuno y Tarde", price: 2.50 },

    // Piqueos
    { name: "Yuca con Salsa", category: "Piqueos", price: 3.80 },
    { name: "Tostones con Guacamole", category: "Piqueos", price: 4.20 },
    { name: "Alitas de Pollo", category: "Piqueos", price: 5.00 },

    // Postres
    { name: "Tarta de Manzana", category: "Postres", price: 3.00 },
    { name: "Flan Casero", category: "Postres", price: 2.80 },
    { name: "Helado de Chocolate", category: "Postres", price: 2.50 , image: "8.jpeg"},

    // Bebidas Calientes
    { name: "Café Americano", category: "Bebidas Calientes", price: 1.80 },
    { name: "Té Verde", category: "Bebidas Calientes", price: 1.50 },
    { name: "Chocolate Caliente", category: "Bebidas Calientes", price: 2.20 },

    // Gaseosas
    { name: "Coca-Cola", category: "Gaseosas", price: 1.20 , image: "02.jpeg" },
    { name: "Sprite", category: "Gaseosas", price: 1.20 , image: "08.jpeg"},
    { name: "Fanta", category: "Gaseosas", price: 1.20 , image: "09.jpeg"},

    // Tragos
    { name: "Mojito", category: "Tragos", price: 5.50 },
    { name: "Pisco Sour", category: "Tragos", price: 6.00 },
    { name: "Caipirinha", category: "Tragos", price: 5.80 },

    // Cervezas
    { name: "Club Verde", category: "Cervezas", price: 2.50 , image: "01.jpeg" },
    { name: "Pilsener", category: "Cervezas", price: 3.50, image: "04.png" },
    { name: "Pilsener Light", category: "Cervezas", price: 3.50, image: "05.jpeg" },
    { name: "Budweiser", category: "Cervezas", price: 3.50 , image: "06.jpeg"},
    { name: "Stella-Artois", category: "Cervezas", price: 3.50 , image: "03.jpeg"},
    { name: "Cerveza Artesanal", category: "Cervezas", price: 4.00, image: "07.jpeg" }

];