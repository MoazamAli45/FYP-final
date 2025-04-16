import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function ATSChecker() {
  return (
    <div className="min-h-screen flex flex-col px-5 sm:px-8">
      {/* Header */}
      <header className="border-b border-gray-200 py-4 ">
        <div className=" mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <Image
              src="/assets/logo-new.svg"
              alt="Logo"
              width={135}
              height={40}
            />
          </div>
          <Link href="/overview">
            <Button className="bg-primary hover:bg-primary/90">
              Go to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className=" mx-auto py-6 px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700">Resume Checker</li>
            </ol>
          </nav>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Is your resume good enough?
                </h1>
                <p className="text-gray-600">
                  A free and fast AI resume checker doing 16 crucial checks to
                  ensure your resume is ready to perform and get you interview
                  callbacks.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-gray-700 mb-1">Drop your resume here</p>
                  <p className="text-sm text-gray-500">
                    or choose a file. PDF & DOCX only. Max 2MB file size.
                  </p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Upload Resume
                </Button>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Privacy guaranteed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Treated as an image for responsive design */}
            <div className="w-full h-auto bg-gray-50 rounded-lg overflow-hidden">
              <div className="relative w-full ">
                <Image
                  src="/assets/ats/ats-img.png"
                  alt="Resume analysis showing a 45/100 score with ATS parse rate and content analysis"
                  width={600}
                  height={700}
                  className="w-full h-auto object-fill"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
