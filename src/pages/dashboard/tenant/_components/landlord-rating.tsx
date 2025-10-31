/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { tenantRatingService } from "@/api/tenant-rating.api";

interface AddPropertyRatingProps {
  booking: any;
  isOpen: boolean;
  closeModal: () => void;
  onSubmit?: (data: { rating: number; comment: string }) => void;
}

const LandlordRating = ({
  booking,
  isOpen,
  closeModal,
}: AddPropertyRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  console.log({ booking });

  const createRatingMutation = useMutation({
    mutationFn: (payload: any) =>
      tenantRatingService.createLandlordRating(payload),
    onSuccess: () => {
      toast.success("Rating added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    const data = { rating, comment, landlordId: booking?.landlord._id };
    console.log("Submitted:", data);
    createRatingMutation.mutateAsync(data);

    // onSubmit?.(data); // optional callback to parent
    closeModal(); // close dialog after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto py-12 rounded-4xl">
        <p className="font-[500] text-[20px] mb-4 text-center">Rate Landlord</p>
        <hr className="mb-6" />

        {/* Rating Stars */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={35}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className={`cursor-pointer transition-colors duration-200 ${
                (hovered ?? rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Comment box */}
        <div className="flex justify-center mb-6">
          <Textarea
            className="w-full max-w-xl"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <hr className="mb-6" />

        {/* Submit button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="bg-[#004542] hover:bg-[#006c66] text-white px-10 py-2 rounded-md"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandlordRating;
