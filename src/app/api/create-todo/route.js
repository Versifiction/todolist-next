import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function GET() {
  return NextResponse.json({ message: "Create todo route" }, { status: 400 });
}

export async function POST(req) {
  try {
    const query =
      "INSERT INTO todolist(id, content, created_at, done) VALUES($1, $2, $3, $4)";
    const values = Object.values(await req.json());
    const result = await conn.query(query, values);

    return NextResponse.json(
      { message: "Todo successfully created", result: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
