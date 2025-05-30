import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get("id");

    if (shopId) {
      const result = await db.query("SELECT * FROM SHOP WHERE id = $1", [shopId]);

      if (result.rows.length === 0) {
        return NextResponse.json({ message: "Shop not found" }, { status: 404 });
      }

      return NextResponse.json({ shop: result.rows[0] });
    } else {
      const result = await db.query("SELECT * FROM SHOP");
      return NextResponse.json({ shops: result.rows });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Some error has occurred" },
      { status: 500 }
    );
  }
}
