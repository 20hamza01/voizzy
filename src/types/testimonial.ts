
export type Testimonial = {
  id: string;
  client_name: string;
  client_role: string | null;
  content: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  views: number;
  ai_enhanced_content?: string | null;
  selected_version?: "original" | "enhanced";
  ai_summary?: string | null;
  sentiment_score?: number | null;
  key_points?: string[] | null;
};
