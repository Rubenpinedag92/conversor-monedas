import { useEffect, useState } from "react";

type SelectorMonedaProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title: string;
};

function SelectorMoneda(props: SelectorMonedaProps) {
  const handleOnChange = props.onChange;
  const title = props.title;

  const [monedas, setMonedas] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/monedas")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al consultar monedas");
        }

        return res.json();
      })
      .then((data) => {
        setMonedas(data.monedas);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <p>{title}</p>
      <select className="selector" onChange={handleOnChange}>
        <option key={0} value="">
          Seleccionar Moneda
        </option>
        {monedas.length > 0 ? (
          monedas.map((moneda, index) => (
            <option key={index} value={moneda}>
              {moneda}
            </option>
          ))
        ) : (
          <option value="">No hay monedas disponibles</option>
        )}
      </select>
    </div>
  );
}

export default SelectorMoneda;
