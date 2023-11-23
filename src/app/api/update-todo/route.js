import { NextResponse } from "next/server";
import conn from "../../../lib/db";

export async function GET() {
  return NextResponse.json({ message: "Update todo route" }, { status: 400 });
}

export async function POST(req) {
  try {
    const query =
      "UPDATE todolist SET id=$1, content=$2, created_at=$3, done=$4 WHERE id=$1";
    const values = Object.values(await req.json());
    const result = await conn.query(query, values);
    console.log("result ", result);

    return NextResponse.json(
      { message: "Todo successfully updated", result: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
