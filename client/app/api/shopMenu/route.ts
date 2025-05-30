import db from "@/app/lib/db";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    console.log("Requested shop menu")
    const shop = request.nextUrl.searchParams.get("shop");
    console.log(shop);
    try{
        const result = await db.query("SELECT * FROM menu_items where shop_id=$1",[shop]);
        console.log("returning")
        return NextResponse.json({items:result.rows},{status:200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message:"Some error occured in fetching menu items"},{status:500});

    }
}
