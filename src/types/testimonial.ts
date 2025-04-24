
export type Testimonial = {
  id: string;
  client_name: string;
  client_role: string | null;
  content: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
};
