// import React, { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FileText, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";

// interface VerificationDocumentsProps {
//   documents: any[]; // Replace with your IDocument type
// }

// export function VerificationDocuments({
//   documents,
// }: VerificationDocumentsProps) {
//   const [displayLimit, setDisplayLimit] = useState(4); // Show 4 at a time (one row)

//   const hasMore = documents.length > displayLimit;
//   const displayedDocs = documents.slice(0, displayLimit);

//   const handleShowMore = () => setDisplayLimit((prev) => prev + 4);
//   const handleShowLess = () => setDisplayLimit(4);

//   if (!documents || documents.length === 0) {
//     return <p className="text-muted-foreground">No documents uploaded.</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {displayedDocs.map((doc) => (
//           <Card
//             key={doc._id}
//             className="p-4 shadow-sm border border-gray-100 flex flex-col gap-3"
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gray-50 rounded-lg">
//                 <FileText className="h-5 w-5 text-gray-600" />
//               </div>
//               <span className="font-semibold text-gray-900 truncate">
//                 {doc.name}
//               </span>
//             </div>

//             <div className="flex items-center gap-4 mt-1">
//               <Button
//                 variant="link"
//                 className="p-0 h-auto text-custom-primary font-medium flex items-center gap-1"
//                 asChild
//               >
//                 <a href={doc.fileUrl} target="_blank" rel="noreferrer">
//                   <Eye className="h-3 w-3" /> View
//                 </a>
//               </Button>

//               <Button
//                 variant="link"
//                 className="p-0 h-auto text-custom-primary font-medium flex items-center gap-1"
//                 onClick={() => window.open(doc.fileUrl, "_blank")}
//               >
//                 <Download className="h-3 w-3" /> Download
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Slicing / Pagination Control */}
//       <div className="flex justify-center pt-2">
//         {hasMore ? (
//           <Button
//             variant="ghost"
//             onClick={handleShowMore}
//             className="text-gray-500"
//           >
//             Show More Documents <ChevronDown className="ml-2 h-4 w-4" />
//           </Button>
//         ) : (
//           documents.length > 4 && (
//             <Button
//               variant="ghost"
//               onClick={handleShowLess}
//               className="text-gray-500"
//             >
//               Show Less <ChevronUp className="ml-2 h-4 w-4" />
//             </Button>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { downloadFile } from "@/lib/utils";

export function VerificationDocuments({ documents }: { documents: any[] }) {
  const [displayLimit, setDisplayLimit] = useState(4);

  const displayedDocs = documents.slice(0, displayLimit);
  const hasMore = documents.length > displayLimit;

  if (!documents || documents.length === 0) {
    return (
      <p className="text-muted-foreground  text-center">
        No documents uploaded.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedDocs.map((doc) => (
          <Card
            key={doc._id}
            className="p-4 shadow-none border border-gray-100 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900 truncate text-sm">
                {doc.name.replace(/_/g, " ")}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* --- VIEW DIALOG --- */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-custom-primary font-medium flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>{doc.name.replace(/_/g, " ")}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="flex-1 w-full rounded-md border p-4 h-110">
                    <div className="flex justify-center items-center min-h-full">
                      <img
                        src={doc.fileUrl}
                        alt={doc.name}
                        className="max-w-full h-auto object-contain rounded-sm"
                      />
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              {/* --- DOWNLOAD BUTTON --- */}
              <Button
                variant="link"
                className="p-0 h-auto text-custom-primary font-medium flex items-center gap-1"
                onClick={() => downloadFile(doc.fileUrl, `${doc.name}.png`)}
              >
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Slicing Controls */}
      {documents.length > 4 && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setDisplayLimit(hasMore ? displayLimit + 4 : 4)}
            className="text-gray-500 hover:text-custom-primary"
          >
            {hasMore ? (
              <>
                Show More <ChevronDown className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
