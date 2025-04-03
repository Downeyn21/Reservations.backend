const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/", (req, res, next) => {
    res.send("hello world")
})

app.get("/api/customers", async (req, res, next) => {
    try {
        const customers = await prisma.customer.findMany();
        res.send(customers)
    } catch (error) {
        next(error)
    }
})

app.get("/api/restaurants", async (req, res, next) => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        res.send(restaurants)
    } catch (error) {
        next(error)
    }
})

app.get("/api/reservations", async (req, res, next) => {
    try {
        const reservations = await prisma.reservation.findMany()
        res.send(reservations)
    } catch (error) {
        next(error)
    }
})

app.post("/api/customers/:id/reservations", async (req, res, next) => {
    try {
        console.log("CONNECTION")
        const customerId = +req.params.id
        const { restaurantId, partyCount, date } = req.body;

        console.log("info submited =>", restaurantId, partyCount, date)
        const reservations = await prisma.reservation.create( { 
            data: {
                customerId,
                restaurantId,
                partyCount,
                date
            }
        })
        res.status(204).json(reservations)
    } catch (error) {
        next(error)
    }
})

app.delete("/api/customers/:customerId/reservations/:id", async (req, res, next) => {
    try {
        const customerId = +req.params.customerId
        const id = +req.params.id

        const reservationExists = await prisma.reservation.findFirst( { where: {customerId, id} })

        if (!reservationExists) {
            next({
                status: 404,
                message: `Could not find customer ${customerId} || reservation ${id}`
            })
        } else {
            await prisma.reservation.delete({ where: {customerId, id} })
        }
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})


app.listen(PORT)