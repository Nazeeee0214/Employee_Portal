"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Timer } from "lucide-react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { submitOvertimeRequest } from "../../actions/requests.actions";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FileOTModal({ isOpen, onClose }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formElement = e.currentTarget;
      let uploadedFileId: string | null = null;
      const fileInput = formElement.elements.namedItem("attachment") as HTMLInputElement;
      const file = fileInput?.files?.[0];
      
      if (file && file.size > 15 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 15MB.");
        setLoading(false);
        return;
      }
 
      if (file && file.size > 0 && file.type.startsWith("image/") && file.type !== "image/gif") {
        const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedBlob = await imageCompression(file, options);
        const finalFile = new File([compressedBlob], file.name, { type: compressedBlob.type || file.type });
        
        // Use client-side proxy API to preserve Auth Token Cookies
        const uploadData = new FormData();
        uploadData.append("file", finalFile);
        uploadData.append("folder", "hr_attachments");

        const uploadRes = await fetch("/api/profile?path=/files", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("File upload failed via proxy.");
        const uploadJson = await uploadRes.json();
        uploadedFileId = uploadJson?.data?.id;
      }

      const formData = new FormData(formElement);
      if (uploadedFileId) formData.set("attachment_id", uploadedFileId);
      // Remove the raw file to avoid hitting Next.js Server Action body limits
      formData.delete("attachment");

      await submitOvertimeRequest(formData);
      toast.success("Overtime Request Submitted!", {
        description: "Your request has been successfully filed."
      });
      onClose();
    } catch (err: any) {
      toast.error("Submission Failed", {
        description: err.message || "An unexpected error occurred."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-3xl overflow-hidden glass-panel"
          >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                  <Timer size={20} />
                </div>
                <h2 className="text-xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">File Overtime</h2>
              </div>
              <button disabled={loading} onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X size={20} className="text-zinc-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Request Date</label>
                  <input type="date" name="request_date" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sched Timeout</label>
                  <input type="time" name="sched_timeout" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">OT From</label>
                  <input type="time" name="ot_from" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">OT To</label>
                  <input type="time" name="ot_to" required className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Purpose</label>
                <textarea name="purpose" required rows={3} placeholder="Explain why overtime is needed..." className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Attachment (Optional)</label>
                <label className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center relative hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-center">
                  <UploadCloud size={24} className={`mb-2 ${fileName ? 'text-primary' : 'text-zinc-400'}`} />
                  <span className={`text-xs font-medium w-full truncate px-2 ${fileName ? 'text-primary' : 'text-zinc-500'}`}>
                    {fileName ? fileName : "Click to upload file"}
                  </span>
                  <input 
                    type="file" 
                    accept="image/jpeg,image/png,image/webp"
                    name="attachment" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setFileName(e.target.files[0].name);
                      } else {
                        setFileName(null);
                      }
                    }}
                  />
                </label>
              </div>

              <button disabled={loading} type="submit" className="mt-4 w-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 font-black uppercase tracking-widest text-sm py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all disabled:opacity-50">
                {loading ? "Submitting..." : "Submit Overtime"}
              </button>
            </form>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
