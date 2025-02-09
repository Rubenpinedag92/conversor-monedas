import { useEffect, useState } from "react";
import "./App.css";
import SelectorMoneda from "./components/SelectorMoneda";

type ConversionResponse = {
  factor: number;
};

function App() {
  const [monedaOrigen, setMonedaOrigen] = useState("");
  const [monedaObjetivo, setMonedaObjetivo] = useState("");
  const [factorConversion, setFactorConversion] = useState<
    number | undefined
  >();
  const [monto, setMonto] = useState(0.0);

  useEffect(() => {
    if (monedaObjetivo && monedaOrigen) {
      const params = new URLSearchParams({
        objetivo: monedaObjetivo,
        original: monedaOrigen,
      }).toString();

      fetch(`http://localhost:3000/convertir?${params}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al consultar conversion");

          return res.json() as Promise<ConversionResponse>;
        })
        .then((data) => {
          console.log(data);
          setFactorConversion(data.factor);
        })
        .catch((e) => console.log(e));
    }
  }, [monedaObjetivo, monedaOrigen]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonto(Number.parseFloat(e.currentTarget.value));
  };

  return (
    <>
      <div className="body">
        <h2>Conversor de Monedas</h2>
        <div className="input-row">
          <div>
            <input
              type="number"
              placeholder="Ingresa monto"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="filtros">
          <SelectorMoneda
            title="De:"
            onChange={(e) => setMonedaOrigen(e.currentTarget.value)}
          ></SelectorMoneda>
          <div className="separator" />
          <SelectorMoneda
            title="A:"
            onChange={(e) => setMonedaObjetivo(e.currentTarget.value)}
          ></SelectorMoneda>
        </div>
        {factorConversion ? (
          <p className="texto-resultado">
            Monto en {monedaObjetivo}: {factorConversion * monto}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
