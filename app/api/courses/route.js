import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function  POST (req) {

    const {createdBy} = await  req.json();

    const result = await db.select().from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.createdBy,createdBy));


    return NextResponse.json({result:result});
}