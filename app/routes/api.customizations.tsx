import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import db from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();
  const customization = await db.customization.create({
    data: {
      productType: data.productType,
      color: data.color,
      design: data.design,
    },
  });
  return json({ id: customization.id });
};
