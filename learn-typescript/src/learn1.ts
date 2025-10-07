type Pizza = {
    name: string;
    price: number;
}

type Order = {
    id: number;
    pizza: Pizza;
    status: OrderStatus;
}

type OrderStatus = 'ordered' | 'preparing' | 'completed' | 'delivered';

 const menu = [
    {name: 'Margherita', price: 8},
    {name: 'Pepperoni', price: 10},
    {name: 'Hawaiian', price: 9}, 
    {name: 'Veggie', price: 11}
]

let cashInRegister = 100;
let nextOrderId = 1;
const orders: Order[] = [];

function addNewPizza(pizza: Pizza): void {
    menu.push(pizza);
}

function placeOrder(pizzaName: string): Order | null {
    const selectedPizza = menu.find(pizza => pizza.name === pizzaName);
    if (!selectedPizza) {
        console.error(`${pizzaName} is not on the menu.`);
        return null;
    }
    cashInRegister += selectedPizza.price;
    const newOrder: Order = {
        id: nextOrderId++, 
        pizza: selectedPizza,
        status: 'ordered'
    }
    orders.push(newOrder);
    return newOrder;
}

function completeOrder(orderId: number): Order | null {
    const order = orders.find(order => order.id === orderId);
    if (!order) {
        console.error(`Order with ID ${orderId} not found.`);
        return null;
    }

    order.status = 'completed';
    return order;
}

addNewPizza({name: 'BBQ Chicken', price: 12});
addNewPizza({name: 'Meat Lovers', price: 13});
addNewPizza({name: 'Supreme', price: 14});

placeOrder('Margherita');
placeOrder('BBQ Chicken');
completeOrder(1);

console.log('Menu:', menu);
console.log('Cash in register:', cashInRegister);
console.log('Order Queue:', orders);

