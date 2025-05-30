import { NextRequest,NextResponse } from "next/server";
import db from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { CodeSquare } from "lucide-react";
export async function POST(req: NextRequest){
    console.log("Shop reg requested");
    const saltRounds = 10;
    const{shopName,email,shop_no,gstIn,password,role,shopId} = await req.json();
    try{
        const response = await db.query("SELECT * FROM SHOP WHERE email = $1",[email]);
        if((response.rowCount??0)>0) return NextResponse.json({success:false,message:"User already exists"},{status:409});
        
        const hashed_pass = await bcrypt.hash(password,saltRounds)   
        try{
            console.log("trying");
            const resp = await db.query("INSERT INTO SHOP (name,shop_no,gst_in,password,email,id) VALUES($1,$2,$3,$4,$5,$6)",[shopName,gstIn,shop_no,hashed_pass,email,shopId]);
            return NextResponse.json({success:true,message:"Successfully registered user"},{status:200});
        }catch(err){
            console.log(err);
            return NextResponse.json({success:false,message:"Unable to add user in db"},{status:500});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({success:false,message:"Unable to check for exsisting user"},{status:500});

    }

}