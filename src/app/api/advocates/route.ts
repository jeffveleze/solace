import db from '../../../db';
import { advocates } from '../../../db/schema';
// import { advocateData } from "../../../db/seed/advocates"; // Uncomment this line to use the hardcoded seed data

export async function GET() {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  // Uncomment this line to use the hardcoded seed data
  // const data = advocateData;

  return Response.json({ data });
}
