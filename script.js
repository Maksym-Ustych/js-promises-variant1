/**
 * Практична робота 10.1
 * Варіант 1: Система замовлення їжі
 * Promise chains без async/await
 */

const order = {
    id: 101,
    amount: 450
};

function hasRandomError() {
    return Math.random() < 0.2;
}

function checkAvailability(orderId) {
    return new Promise((resolve, reject) => {
        console.log("Перевірка наявності товарів...");

        setTimeout(() => {
            if (hasRandomError()) {
                reject("Помилка: товарів немає в наявності");
            } else {
                console.log("Товари є в наявності");
                resolve({ orderId: orderId, amount: order.amount });
            }
        }, 1000);
    });
}

function reserveItems(orderId) {
    return new Promise((resolve, reject) => {
        console.log("Резервування товарів...");

        setTimeout(() => {
            if (hasRandomError()) {
                reject("Помилка: не вдалося зарезервувати товари");
            } else {
                console.log("Товари успішно зарезервовано");
                resolve({ orderId: orderId, amount: order.amount });
            }
        }, 1000);
    });
}

function processPayment(orderId, amount) {
    return new Promise((resolve, reject) => {
        console.log("Обробка оплати...");

        setTimeout(() => {
            if (hasRandomError()) {
                reject("Помилка: оплату відхилено");
            } else {
                console.log("Оплату прийнято. Сума:", amount, "грн");
                resolve({ orderId: orderId });
            }
        }, 1500);
    });
}

function scheduleDelivery(orderId) {
    return new Promise((resolve, reject) => {
        console.log("Планування доставки...");

        setTimeout(() => {
            if (hasRandomError()) {
                reject("Помилка: не вдалося запланувати доставку");
            } else {
                console.log("Доставку заплановано");
                resolve({ orderId: orderId, status: "Замовлення успішно оформлено" });
            }
        }, 1000);
    });
}

function startOrder() {
    console.clear();
    console.log("=== Практична робота 10.1 ===");
    console.log("=== Система замовлення їжі ===");
    console.log("Номер замовлення:", order.id);

    checkAvailability(order.id)
        .then(result => reserveItems(result.orderId))
        .then(result => processPayment(result.orderId, result.amount))
        .then(result => scheduleDelivery(result.orderId))
        .then(result => {
            console.log("Фінальний статус:", result.status);
        })
        .catch(error => {
            console.log("Обробка помилки:");
            console.log(error);
        })
        .finally(() => {
            console.log("Операцію завершено");
        });
}