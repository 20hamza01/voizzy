
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const limit = parseInt(url.searchParams.get("limit") || "3");
    const layout = url.searchParams.get("layout") || "grid";
    
    console.log("🔍 get-public-testimonials - Request received", { userId, limit, layout });
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "userId parameter is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query approved testimonials for the user
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("❌ get-public-testimonials - Error fetching testimonials:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Increment view count for each testimonial
    const updatePromises = testimonials.map((testimonial) =>
      supabase
        .from("testimonials")
        .update({ views: testimonial.views + 1 })
        .eq("id", testimonial.id)
    );

    await Promise.all(updatePromises);
    console.log(`✅ get-public-testimonials - Fetched ${testimonials.length} testimonials and updated view counts`);

    return new Response(
      JSON.stringify({ testimonials, layout }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("💥 get-public-testimonials - Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
