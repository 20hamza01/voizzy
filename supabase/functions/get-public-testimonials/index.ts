
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
    const format = url.searchParams.get("format") || "json"; // New parameter to determine response format
    
    console.log("🔍 get-public-testimonials - Request received", { userId, limit, layout, format });
    
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

    // If HTML format is requested, return rendered HTML
    if (format === "html") {
      const html = generateHtml(testimonials, layout);
      return new Response(
        html,
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "text/html" } 
        }
      );
    }

    // Default JSON response for iframe and API usage
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

// Function to generate HTML for testimonials
function generateHtml(testimonials: any[], layout: string) {
  const layoutClass = layout === "list" 
    ? "flex flex-col space-y-4" 
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

  if (testimonials.length === 0) {
    return `
      <div class="p-4 bg-gray-50 rounded-md">
        <div class="text-center py-10">
          <p class="text-gray-500">No testimonials available.</p>
        </div>
        <div class="text-center mt-4 text-xs text-gray-400">
          Powered by Voizzy
        </div>
      </div>
    `;
  }

  const testimonialCards = testimonials.map(testimonial => `
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p class="text-gray-700 italic mb-4">"${testimonial.content}"</p>
      <div class="flex items-center">
        <div>
          <p class="font-semibold">${testimonial.client_name}</p>
          ${testimonial.client_role ? `<p class="text-sm text-gray-500">${testimonial.client_role}</p>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="p-4 bg-gray-50 rounded-md" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
      <div class="${layoutClass}">
        ${testimonialCards}
      </div>
      <div class="text-center mt-4 text-xs text-gray-400">
        Powered by Voizzy
      </div>
    </div>
  `;
}
