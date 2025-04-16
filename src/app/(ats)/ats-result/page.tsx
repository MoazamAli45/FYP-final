"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function ATSResult() {
  //   const [showProModal, setShowProModal] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");

  const categories = [
    { name: "Content", issues: 3 },
    { name: "Format", issues: 3 },
    { name: "Sections", issues: 3 },
    { name: "Skills", issues: 0 },
    { name: "Style", issues: 0 },
  ];

  const bulletPoints = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  ];

  return (
    <div className="flex flex-col min-h-screen px-5 sm:px-8 bg-white">
      {/* Header */}
      <header className="flex items-center justify-between py-4 border-b">
        <div className="flex gap-2">
          <Image
            src="/assets/logo-new.svg"
            alt="Logo"
            width={135}
            height={40}
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Upload New Resume
        </Button>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r bg-gray-50">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 border-2 border-gray-200">
                <AvatarImage src="/placeholderr.svg" alt="User" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h3 className="font-medium">Your Score</h3>
                <p className="text-lg font-semibold">65/100</p>
              </div>
            </div>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    activeTab === category.name
                      ? "bg-blue-50 border-l-4 border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(category.name)}
                >
                  <div className="flex items-center">
                    {category.name === "Content" ||
                    category.name === "Format" ||
                    category.name === "Sections" ? (
                      <div className="w-6 h-6 mr-2">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {category.name === "Content" && (
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          )}
                          {category.name === "Format" && (
                            <path
                              d="M4 6h16M4 12h16M4 18h12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                          {category.name === "Sections" && (
                            <path
                              d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z M7 7h10 M7 12h10 M7 17h6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      </div>
                    ) : category.name === "Skills" ? (
                      <div className="w-6 h-6 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 7V4h16v3" />
                          <path d="M9 20h6" />
                          <path d="M12 4v16" />
                        </svg>
                      </div>
                    )}
                    <span
                      className={`font-medium ${
                        activeTab === category.name ? "text-blue-600" : ""
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                  {category.issues > 0 && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      {category.issues}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-green-600">Great!</span>
                <span className="text-sm text-gray-500">Parsed (60%)</span>
              </div>
              <Progress value={60} className="h-2 bg-gray-200" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-medium text-gray-500 mb-4">
              ATS Parse Rate
            </h2>

            {activeTab === "Content" && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  CONTENT
                </h3>
                <p className="text-gray-500 mb-6">15 Issues Found</p>

                <h4 className="text-lg text-gray-600 mb-4">
                  Here are some suggestions for rewriting your bullets
                </h4>

                <div className="space-y-4">
                  {bulletPoints.map((bullet, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-gray-600">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Format" && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  FORMAT
                </h3>
                <p className="text-gray-500 mb-6">3 Issues Found</p>

                <div className="space-y-4">
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                    <h4 className="font-medium text-yellow-800 mb-2">
                      Formatting Issues
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                      <li>Inconsistent spacing between sections</li>
                      <li>Multiple font styles detected</li>
                      <li>
                        Margins are not consistent throughout the document
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Sections" && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  SECTIONS
                </h3>
                <p className="text-gray-500 mb-6">3 Issues Found</p>

                <div className="space-y-4">
                  <div className="p-4 border border-orange-200 bg-orange-50 rounded-md">
                    <h4 className="font-medium text-orange-800 mb-2">
                      Missing Sections
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-orange-700">
                      <li>No skills section found</li>
                      <li>Education details are incomplete</li>
                      <li>Missing professional summary</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Skills" && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  SKILLS
                </h3>
                <p className="text-gray-500 mb-6">No Issues Found</p>

                <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                  <h4 className="font-medium text-green-800 mb-2">
                    Skills Analysis
                  </h4>
                  <p className="text-green-700 mb-4">
                    Your skills section is well-formatted and contains relevant
                    keywords for your target position.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded border border-green-100">
                      <span className="font-medium">Technical Skills:</span>{" "}
                      Excellent
                    </div>
                    <div className="bg-white p-2 rounded border border-green-100">
                      <span className="font-medium">Soft Skills:</span> Good
                    </div>
                    <div className="bg-white p-2 rounded border border-green-100">
                      <span className="font-medium">Industry Keywords:</span>{" "}
                      Excellent
                    </div>
                    <div className="bg-white p-2 rounded border border-green-100">
                      <span className="font-medium">Skill Relevance:</span> High
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Style" && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  STYLE
                </h3>
                <p className="text-gray-500 mb-6">No Issues Found</p>

                <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                  <h4 className="font-medium text-green-800 mb-2">
                    Style Analysis
                  </h4>
                  <p className="text-green-700">
                    Your resume has a clean, professional style that is
                    appropriate for your industry.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Pro Modal */}
      {/* <Dialog open={showProModal} onOpenChange={setShowProModal}>
        <DialogContent className="sm:max-w-md">
          <div className="absolute right-4 top-4">
            <button
              onClick={() => setShowProModal(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <DialogTitle className="text-center text-xl font-semibold">
            Automatically rewrite my bullets with Rezlinks Pro
          </DialogTitle>
          <div className="flex justify-center mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">
              Buy Now
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
