import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const customization = await db.customization.findUnique({
    where: { id: params.id },
  });
  if (!customization) throw new Response("Not Found", { status: 404 });
  return json({ customization });
};

export default function CustomizationView() {
  const { customization } = useLoaderData<typeof loader>();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Diseño guardado</h1>
      <p>Producto: {customization.productType}</p>
      <p>Color: {customization.color}</p>
      <pre className="overflow-auto border p-2">
        {customization.design}
      </pre>
    </div>
  );
}
