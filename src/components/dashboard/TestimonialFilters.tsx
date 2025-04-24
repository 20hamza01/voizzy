
import React from "react";
import { Button } from "@/components/ui/button";

interface TestimonialFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const TestimonialFilters: React.FC<TestimonialFiltersProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={statusFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("all")}
      >
        All
      </Button>
      <Button
        variant={statusFilter === "pending" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("pending")}
      >
        Pending
      </Button>
      <Button
        variant={statusFilter === "approved" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("approved")}
      >
        Approved
      </Button>
      <Button
        variant={statusFilter === "rejected" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("rejected")}
      >
        Rejected
      </Button>
    </div>
  );
};

export default TestimonialFilters;
