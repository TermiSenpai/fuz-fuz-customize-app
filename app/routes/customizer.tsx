// app/routes/customizer.tsx
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva";

export const loader = async () => {
  return json({ message: "Personalizador cargado" });
};

export default function Customizer() {
  const { message } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const stageRef = useRef<any>(null);
  const [productType, setProductType] = useState("camiseta");
  const [color, setColor] = useState("#ffffff");
  const [elements, setElements] = useState<Array<{ text: string }>>([]);
  const [text, setText] = useState("");

  const addText = () => {
    if (text) {
      setElements([...elements, { text }]);
      setText("");
    }
  };

  const save = async () => {
    const stage = stageRef.current as any;
    const design = stage.toJSON();
    const res = await fetch("/api/customizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productType, color, design }),
    });
    const data = await res.json();
    navigate(`/customizations/${data.id}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Personalizador de Producto</h1>
      <p className="text-sm text-gray-500">{message}</p>
      <div className="space-x-2">
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="border p-2"
        >
          <option value="camiseta">Camiseta</option>
          <option value="sudadera">Sudadera</option>
          <option value="taza">Taza</option>
        </select>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <input
          className="border p-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Añadir texto"
        />
        <button className="border px-2" onClick={addText}>
          Añadir texto
        </button>
      </div>
      <Stage width={500} height={400} ref={stageRef} className="border">
        <Layer>
          {elements.map((el, idx) => (
            <Text key={idx} text={el.text} x={50} y={20 * idx} fill={color} />
          ))}
        </Layer>
      </Stage>
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={save}
      >
        Guardar diseño
      </button>
    </div>
  );
}
