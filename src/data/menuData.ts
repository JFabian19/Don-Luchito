export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
}

export interface Category {
  id: string;
  nombre: string;
  destacada?: boolean;
  horario?: string;
  items: Dish[];
}

const item = (nombre: string, precio: string, descripcion?: string): Dish => ({ nombre, precio, descripcion });

// Carta transcrita de las piezas gráficas proporcionadas por Don Luchito.
export const DEFAULT_MENU_DATA: Category[] = [
  { id: 'menu-brasa', nombre: 'Menú brasa', destacada: true, horario: 'Disponible de 12:00 p. m. a 5:00 p. m.', items: [
    item('1/8 pollo a la brasa', 'S/ 10.00', 'Papas + chaufa + refresco + aguadito'),
  ] },
  { id: 'pollos-a-la-brasa', nombre: 'Pollos a la brasa', items: [
    item('Octavo p/brasa', 'S/ 8.50', '1/8 pollo + papas + ensalada + cremas'),
    item('Cuarto p/brasa', 'S/ 10.00', '1/4 pollo + papas + ensalada + cremas'),
    item('Medio p/brasa', 'S/ 20.00', '1/2 pollo + papas + ensalada + cremas'),
    item('Entero p/brasa', 'S/ 40.00', '1 pollo + papas + ensalada + cremas'),
    item('Octavo mostrito', 'S/ 12.00', '1/8 pollo + papas + chaufa + ensalada + cremas'),
    item('Cuarto mostro', 'S/ 14.00', '1/4 pollo + papas + chaufa + ensalada + cremas'),
  ] },
  { id: 'combos-personales', nombre: 'Combos personales', items: [
    item('Octavo p/brasa', 'S/ 11.50', 'Papas + Pepsi 750 ml + ensalada + cremas'),
    item('Cuarto p/brasa', 'S/ 13.00', 'Papas + Pepsi 750 ml + ensalada + cremas'),
    item('Octavo mostrito', 'S/ 15.00', 'Papas + chaufa + Pepsi 750 ml + ensalada + cremas'),
    item('Cuarto mostro', 'S/ 17.00', 'Papas + chaufa + Pepsi 750 ml + ensalada + cremas'),
    item('Octavo + chicha', 'S/ 12.50', 'Papas + 1/2 L de chicha + ensalada + cremas'),
    item('Cuarto + chicha', 'S/ 14.00', 'Papas + 1/2 L de chicha + ensalada + cremas'),
  ] },
  { id: 'combos-familiares', nombre: 'Combos familiares', items: [
    item('Combo para dos', 'S/ 24.50', '1/2 pollo a la brasa + papas + Pepsi 1.5 L + ensalada + cremas'),
    item('Combo Pepsi', 'S/ 26.50', '1/2 pollo a la brasa + papas + Pepsi 1.5 L + ensalada + cremas'),
    item('Dúo chaufereo', 'S/ 30.00', '1/2 pollo a la brasa + papas + chaufa + ensalada + cremas'),
    item('Dúo tradicional', 'S/ 28.00', '1/2 pollo a la brasa + papas + chicha morada 1 L + ensalada + cremas'),
    item('Combo clásico', 'S/ 46.00', '1 pollo a la brasa + papas + Inca o Coca Cola 1.5 L + ensalada + cremas'),
    item('Combo chaufereo', 'S/ 50.00', '1 pollo a la brasa + papas + chaufa + ensalada + cremas'),
    item('Combo tradicional', 'S/ 47.00', '1 pollo a la brasa + chicha morada 1 L + papas + ensalada + cremas'),
    item('A la brasa con yapa', 'S/ 47.00', '1 pollo a la brasa + 1/2 pollo + papas + ensalada + cremas'),
    item('Familiar peruano', 'S/ 50.00', '1 pollo a la brasa + Inca o Coca Cola 3 L + papas + ensalada + cremas'),
    item('Familiar Pepsi', 'S/ 53.00', '1 pollo a la brasa + Pepsi 2.5 L + papas + ensalada + cremas'),
    item('Mega familiar', 'S/ 56.00', '1 pollo a la brasa + Inca o Coca Cola 1.5 L + 1/4 de pollo + papas + ensalada + cremas'),
  ] },
  { id: 'chifa', nombre: 'Chifa', items: [
    item('Arroz chaufa de pollo', 'S/ 12.00'), item('Aeropuerto', 'S/ 14.00'), item('Tallarín chifa', 'S/ 16.00'), item('Salvaje', 'S/ 15.00'), item('Combinado', 'S/ 18.00'),
  ] },
  { id: 'extras', nombre: 'Extras', items: [
    item('Porción de papas fritas', 'S/ 11.00'), item('Media porción de papas fritas', 'S/ 7.00'), item('Porción de ensalada', 'S/ 6.00'), item('Media porción de ensalada', 'S/ 3.00'), item('Porción de chaufa', 'S/ 4.00'),
  ] },
  { id: 'bebidas', nombre: 'Bebidas', items: [
    item('Inca o Coca Cola personal', 'S/ 2.50'), item('Inca o Coca Cola 600 ml', 'S/ 4.00'), item('Inca o Coca Cola 1 L', 'S/ 7.00'), item('Inca o Coca Cola 1.5 L', 'S/ 9.00'), item('Inca o Coca Cola 2.25 L', 'S/ 11.00'), item('Inca o Coca Cola 3 L', 'S/ 14.00'), item('Gordita', 'S/ 5.00'),
    item('Pepsi 750 ml', 'S/ 4.00'), item('Pepsi 1 L', 'S/ 5.50'), item('Pepsi 1.5 L', 'S/ 6.50'), item('Pepsi 2 L', 'S/ 7.00'), item('Pepsi 3 L', 'S/ 11.00'), item('Agua Cielo o San Luis', 'S/ 2.00'), item('Cerveza Pilsen', 'S/ 8.00'), item('Cusqueña trigo o negra', 'S/ 10.00'), item('Concordia 1.5 L', 'S/ 6.50'), item('Pepsi, Concordia o 7up 355 ml', 'S/ 1.50'), item('Gatorade', 'S/ 3.00'),
    item('Chicha o maracuyá 1 L', 'S/ 10.00'), item('Chicha o maracuyá 500 ml', 'S/ 6.00'), item('Infusiones (té, anís y manzanilla)', 'S/ 2.50'),
  ] },
];
