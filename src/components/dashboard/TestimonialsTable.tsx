
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import type { Testimonial } from "@/types/testimonial";
import { TestimonialStatusBadge } from "./TestimonialStatusBadge";
import { TestimonialActions } from "./TestimonialActions";
import { TestimonialPagination } from "./TestimonialPagination";
import { StarRating } from "@/components/ui/star-rating";
import { TestimonialDialog } from "./TestimonialDialog";

interface TestimonialsTableProps {
  testimonials: Testimonial[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  handleStatusChange: (id: string, status: "pending" | "approved" | "rejected") => void;
  handleDelete: (id: string) => void;
}

const TestimonialsTable: React.FC<TestimonialsTableProps> = ({
  testimonials,
  loading,
  currentPage,
  totalPages,
  setCurrentPage,
  handleStatusChange,
  handleDelete
}) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRowCellClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">No testimonials found.</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Testimonial</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow 
                  key={testimonial.id} 
                  className="hover:bg-gray-50"
                >
                  <TableCell 
                    className="font-medium cursor-pointer"
                    onClick={() => handleRowCellClick(testimonial)}
                  >
                    {testimonial.client_name}
                  </TableCell>
                  
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => handleRowCellClick(testimonial)}
                  >
                    {testimonial.client_role || "-"}
                  </TableCell>
                  
                  <TableCell 
                    className="hidden md:table-cell max-w-xs cursor-pointer"
                    onClick={() => handleRowCellClick(testimonial)}
                  >
                    <div className="line-clamp-2">
                      {testimonial.content}
                    </div>
                  </TableCell>
                  
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => handleRowCellClick(testimonial)}
                  >
                    <StarRating value={testimonial.rating || 0} readonly className="scale-75 origin-left" />
                  </TableCell>
                  
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => handleRowCellClick(testimonial)}
                  >
                    {formatDate(testimonial.created_at)}
                  </TableCell>
                  
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => handleRowCellClick(testimonial)}
                  >
                    <TestimonialStatusBadge status={testimonial.status} />
                  </TableCell>
                  
                  <TableCell>
                    <TestimonialActions
                      testimonial={testimonial}
                      handleStatusChange={handleStatusChange}
                      handleDelete={handleDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {selectedTestimonial && (
            <TestimonialDialog
              testimonial={selectedTestimonial}
              isOpen={true}
              onClose={() => setSelectedTestimonial(null)}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
            />
          )}

          <TestimonialPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default TestimonialsTable;
