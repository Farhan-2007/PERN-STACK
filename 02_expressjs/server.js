import express from "express";
const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());
let cars = [
    {id : 1, make : "Toyota", model : "Camry", year : 2020, price : 25000},
    {id : 2, make : "Tesla", model : "Model S", year : 2023, price : 80000},
    {id : 3, make : "Toyota", model : "Camry", year : 2020, price : 25000},
]

app.get("/", (req, res) => {
    res.send("Hello from the cars api");
});

router.get("/", (req, res) => {
    res.json(cars);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id == id);

    if(!car) return res.status(404).send('Car not found');

    res.json(car);

});

router.post("/", (req, res) => {
    const {make, model, year, price} = req.body;

    if(!make || !model || !year || !price) {
        return res.status(404).json({error : "Missing fields"});
    }

    const newCar = {
        id : cars.length+1,
        make,
        model,
        uear :Number(year),
        price : Number(price)
    };

    cars.push(newCar);
    res.status(201).json(newCar);
});

router.put ("/", (req, res) => {
    res.send("Update the car");
});

router.delete("/", (req, res) => {
    res.send("Delete Car");
});


app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

