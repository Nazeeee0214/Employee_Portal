import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!API_BASE) {
      return NextResponse.json({ error: "API Base URL not configured" }, { status: 500 });
    }

    if (contentType.includes("multipart/form-data")) {
      const incomingFormData = await req.formData();
      const fileField = incomingFormData.get("file") as File | null;

      // Server-Side Security Validation
      if (fileField) {
        if (!fileField.type.startsWith("image/") || fileField.type === "image/gif") {
          return NextResponse.json({ error: "Only JPEG, PNG, and WebP images are allowed. GIFs are excluded." }, { status: 400 });
        }
        if (fileField.size > 15 * 1024 * 1024) { // 15MB absolute limit
          return NextResponse.json({ error: "File size exceeds 15MB limit. Upload rejected." }, { status: 400 });
        }
      }

      const folderName = "hr_attachments";
      const cookieHeader = req.headers.get("cookie") || "";
      const directusToken = process.env.DIRECTUS_API_BASE_TOKEN;

      const getHeaders = (extra: Record<string, string> = {}) => {
        const headers: Record<string, string> = {
          "cookie": cookieHeader,
          ...extra,
        };
        if (directusToken) {
          headers["Authorization"] = `Bearer ${directusToken}`;
        }
        return headers;
      };

      let folderId = "";

      // 1. Find the folder by name
      try {
        const folderQuery = new URLSearchParams({
          "filter[name][_eq]": folderName,
          "fields": "id",
          "limit": "1"
        }).toString();

        const folderSearchRes = await fetch(`${API_BASE}/folders?${folderQuery}`, {
          headers: getHeaders(),
        });
        
        const folderSearch = await folderSearchRes.json();

        if (folderSearch.data && folderSearch.data.length > 0) {
          folderId = folderSearch.data[0].id;
        } else {
          // 2. Create the folder if not found
          const createFolderRes = await fetch(`${API_BASE}/folders`, {
            method: "POST",
            headers: getHeaders({ "Content-Type": "application/json" }),
            body: JSON.stringify({ name: folderName }),
          });
          const createdFolder = await createFolderRes.json();
          folderId = createdFolder.data?.id;
        }
      } catch (folderErr) {
        console.error("Proxy Folder Error:", folderErr);
      }

      // 3. Reconstruct FormData (Crucial: Folder ID must come BEFORE the file for many parsers)
      const outgoingFormData = new FormData();
      if (folderId) {
        outgoingFormData.append("folder", folderId);
      }
      
      // Transfer all other fields (including the file)
      for (const [key, value] of incomingFormData.entries()) {
        if (key !== "folder") {
          outgoingFormData.append(key, value);
        }
      }

      // 4. Forward to /files
      const response = await fetch(`${API_BASE}/files`, {
        method: "POST",
        headers: getHeaders(),
        body: outgoingFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: result.errors?.[0]?.message || "Upload failed" },
          { status: response.status }
        );
      }

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid Content-Type" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
