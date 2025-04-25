
import React from "react";
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDisplayContent = (testimonial: Testimonial) => {
    if (testimonial.selected_version === "enhanced" && testimonial.ai_enhanced_content) {
      return testimonial.ai_enhanced_content;
    }
    return testimonial.content;
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
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.client_name}</TableCell>
                  <TableCell>{testimonial.client_role || "-"}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs">
                    <div className="line-clamp-2">
                      {getDisplayContent(testimonial)}
                      {testimonial.selected_version === "enhanced" && (
                        <span className="ml-2 text-xs text-blue-600">(Enhanced)</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(testimonial.created_at)}</TableCell>
                  <TableCell>
                    <TestimonialStatusBadge status={testimonial.status} views={testimonial.views} />
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
