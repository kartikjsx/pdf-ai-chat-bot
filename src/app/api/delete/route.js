import { supabase } from "@@/lib/supabase";

export async function DELETE(req) {
  try {
    const body = await req.json();

    const documentId = body?.documentId;

    if (!documentId) {
      return Response.json({
        success: false,
      });
    }

    await supabase
      .from("chunks")
      .delete()
      .eq("document_id", Number(documentId));

    await supabase.from("documents").delete().eq("id", Number(documentId));

    return Response.json({
      success: true,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}
