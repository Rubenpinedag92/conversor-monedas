import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

const diccionario: DiccionarioMonedas = {
  MXN: { MXN: 1.0, USD: 20.48 },
  USD: { USD: 1.0, MXN: 0.5 },
};

interface Conversion {
  [moneda: string]: number;
}

interface DiccionarioMonedas {
  [moneda: string]: Conversion;
}

app.use(express.json());

app.get("/monedas", (req: Request, res: Response) => {
  res.json({ monedas: Object.keys(diccionario) });
});

app.get("/convertir/", (req: Request, res: Response) => {
  const monedaOriginal = req.query.original
    ? req.query.original.toString()
    : "";

  const monedaObjetivo = req.query.objetivo
    ? req.query.objetivo.toString()
    : "";

  if (!monedaOriginal) {
    res.status(400).send("Moneda base incorrecta");
    return;
  }
  if (!monedaObjetivo) {
    res.status(400).send("Moneda objetivo incorrecta");
    return;
  }

  const factorConversion = diccionario[monedaOriginal][monedaObjetivo];

  if (!factorConversion) {
    res.status(404).send("Conversion no encontrada");
    return;
  }

  res.json({
    factor: factorConversion,
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
