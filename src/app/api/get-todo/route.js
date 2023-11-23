import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function GET() {
  try {
    const query = "SELECT * FROM todolist ORDER BY created_at ASC";
    const result = await conn.query(query);

    return NextResponse.json(
      { message: "Todos successfully returned", result: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
