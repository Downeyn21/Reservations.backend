const prisma = require("../prisma");
const seed = async () => {
    async function createCustomers() {
        const customers = [
            {name: "sally"},
            {name: "bobby"},
            {name: "willy"},
            {name: "kyle"}
        ];
        await prisma.customer.createMany( { data: customers });
        console.log("customers seeded")
    }

    async function createRestaurants() {
        const restaurants = [
            {name: "the big clam"},
            {name: "mothers kitchen"},
            {name: "killer chefs platter"}
        ];
        await prisma.restaurant.createMany( { data: restaurants });
        console.log("restaurants seeded")
    }

    async function createReservations() {
        const reservations = [
            {customerId: 1, restaurantId: 1, partyCount: 2, date: new Date("2025-04-28")},
            {customerId: 2, restaurantId: 2, partyCount: 5, date: new Date("2025-06-13")},
            {customerId: 3, restaurantId: 3, partyCount: 1, date: new Date("1987-10-27")},
            {customerId: 4, restaurantId: 1, partyCount: 420, date: new Date("2077-03-23")}
        ];
        await prisma.reservation.createMany( { data: reservations });
        console.log("reservations")
    }

    await createCustomers();
    await createRestaurants();
    await createReservations();
};

seed()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });