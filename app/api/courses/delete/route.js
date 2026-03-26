import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { courseId } = await req.json();
    if (!courseId) return NextResponse.json({ deleted: false, error: "missing courseId" }, { status: 400 });

    // remove dependent content first
    await db.delete(STUDY_TYPE_CONTENT_TABLE).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));
    await db.delete(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    // remove main study material row
    await db.delete(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

    return NextResponse.json({ deleted: true });
  } catch (err) {
    return NextResponse.json({ deleted: false, error: err?.message || String(err) }, { status: 500 });
  }
}
