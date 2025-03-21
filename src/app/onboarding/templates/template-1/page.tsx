"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Loader2Icon, Play } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useAuthUser from "@/hooks/use-auth-user";
import EditResume from "@/components/templates/template-1/edit-resume-1";
import { initialData } from "@/components/templates/template-1/data";
import EditLayout from "@/components/templates/edit-layout";

export default function Template1Wrapper() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader2Icon className="h-6 w-6 animate-spin" />
          <span> Loading template...</span>
        </div>
      }
    >
      <Template1Page />
    </Suspense>
  );
}

function Template1Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const [resumeTitle, setResumeTitle] = useState("My Professional Resume");

  const [resumeData, setResumeData] = useState<any>(
    resumeId ? null : initialData
  ); // Conditional initial state
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const user = useAuthUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("id");
      if (storedId) {
        setUserId(storedId);
      } else {
        setUserId(user?.id);
      }
    }
  }, [user]);

  const updateUrlWithResumeId = useCallback(
    (id: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set("resumeId", id);
      router.replace(url.pathname + url.search);
    },
    [router]
  );

  const handleDataChange = (data: any) => {
    setResumeData(data);
  };

  const saveResumeData = useCallback(
    async (autoSave = false) => {
      if (!resumeTitle) {
        toast.error("Please provide a title for your resume");
        return null;
      }
      if (!resumeData) {
        toast.error("No resume data to save");
        return null;
      }
      setIsSaving(true);
      try {
        const { createBuiltResume, updateBuiltResume } = await import(
          "@/data/data"
        );
        let savedResume;
        if (resumeId) {
          savedResume = await updateBuiltResume({
            id: resumeId,
            title: resumeTitle,
            data: resumeData,
            active: true,
          });
          if (!autoSave) {
            toast.success("Resume updated successfully!");
          }
        } else {
          savedResume = await createBuiltResume({
            title: resumeTitle,
            userId: userId || "1",
            templateType: "template-1",
            data: resumeData,
            active: true,
          });
          if (savedResume?.id) {
            updateUrlWithResumeId(savedResume.id);
          }
          if (!autoSave) {
            toast.success("Resume created successfully!");
          }
        }
        return savedResume;
      } catch (error) {
        console.error("Error saving resume:", error);
        if (!autoSave) {
          toast.error("Failed to save resume. Please try again.");
        }
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    [resumeId, resumeTitle, resumeData, updateUrlWithResumeId]
  );

  const handleSaveResume = async () => {
    await saveResumeData(false);
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      if (resumeId) {
        setIsSaving(true);
        try {
          const { getResumeById } = await import("@/data/data");
          const resume = await getResumeById(resumeId);
          if (resume) {
            setResumeTitle(resume.title || "My Professional Resume");
            if (resume.data) {
              setResumeData(resume.data);
              console.log("Resume data loaded:", resume.data);
              toast.info("Loaded existing resume");
            }
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
          toast.error("Failed to load resume. Starting with a new template.");
          setResumeData(initialData); // Fallback to initialData
        } finally {
          setIsSaving(false);
        }
      }
    };
    fetchResumeData();
  }, [resumeId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <EditLayout />

      <div className="flex items-center justify-between px-2 gap-2   w-full max-w-[850px] mx-auto sm:px-4 pt-6">
        <Label htmlFor="resume-title" className="sr-only">
          Resume Title
        </Label>
        <Input
          id="resume-title"
          value={resumeTitle}
          onChange={(e) => setResumeTitle(e.target.value)}
          className="w-60 max-w-full border-none font-bold focus:outline-none focus:border-b focus:border-primary focus:ring-0"
          placeholder="Resume Title"
        />

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSaveResume}
            disabled={isSaving}
            className="flex items-center gap-2 h-[50] bg-[#e6ecf8] text-primary hover:bg-[#e6ecf8]/90"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {resumeId ? "Update" : "Save"}
              </>
            )}
          </Button>
          <Button
            className="bg-primary text-white h-[50]  flex items-center justify-center"
            asChild
          >
            <Link href={"/"} className="flex items-center gap-1">
              <Play className="w-4 h-4  text-white" />
              <span className="text-white font-normal">Preview</span>
            </Link>
          </Button>
        </div>
      </div>

      <main>
        {resumeData ? (
          <EditResume
            onDataChange={handleDataChange}
            initialResumeData={resumeData}
            onSuccessfulEdit={saveResumeData}
            resumeId={resumeId}
            key={resumeId || "new-resume"}
          />
        ) : (
          <div className="flex items-center h-[60vh] justify-center  w-full">
            <div className="flex gap-1">
              <Loader2Icon className="h-6 w-6 animate-spin" />
              <span> Loading resume data...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
