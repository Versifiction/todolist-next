import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function GET() {
  return NextResponse.json({ message: "Delete todo route" }, { status: 400 });
}

export async function POST(req) {
  try {
    const query = "DELETE FROM todolist WHERE id=$1";
    const values = Object.values(await req.json());
    const result = await conn.query(query, values);

    return NextResponse.json(
      { message: "Todo successfully deleted", result: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
