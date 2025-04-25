
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, testimonialId } = await req.json();
    console.log("🔄 Processing testimonial:", { testimonialId, contentLength: content.length });
    
    if (!content) {
      throw new Error("Testimonial content is required");
    }
    
    // Process with OpenAI - Using a reliable model with proper error handling
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Using gpt-4o-mini as requested
          messages: [
            {
              role: 'system',
              content: `You are an AI that analyzes and enhances testimonials. For each testimonial:
                1. Provide a brief summary (2-3 sentences)
                2. Calculate a sentiment score from -1 to 1
                3. Extract 3-5 key points as bullet points
                4. Create an enhanced version that maintains the original meaning but makes it more impactful
                Format response as JSON with fields: summary, sentimentScore, keyPoints, enhancedContent`
            },
            {
              role: 'user',
              content: content
            }
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ OpenAI API error:", response.status, errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const aiResponse = await response.json();
      console.log("✅ Received OpenAI response:", { model: 'gpt-4o-mini', usage: aiResponse.usage });
      
      let analysis;
      try {
        analysis = JSON.parse(aiResponse.choices[0].message.content);
        console.log("✨ AI Analysis completed:", { 
          testimonialId, 
          summary: analysis.summary?.substring(0, 50) + "...",
          sentimentScore: analysis.sentimentScore,
          keyPointsCount: analysis.keyPoints?.length
        });
      } catch (parseError) {
        console.error("❌ Error parsing OpenAI response:", parseError);
        console.log("Raw response content:", aiResponse.choices[0].message.content);
        throw new Error("Failed to parse AI response. The model returned an invalid format.");
      }
      
      // If testimonialId is provided, update the testimonial with AI analysis
      if (testimonialId) {
        console.log("🔄 Updating testimonial with AI analysis:", testimonialId);
        const { error: updateError } = await supabase
          .from('testimonials')
          .update({
            ai_summary: analysis.summary,
            sentiment_score: analysis.sentimentScore,
            key_points: analysis.keyPoints,
            ai_enhanced_content: analysis.enhancedContent
          })
          .eq('id', testimonialId);
          
        if (updateError) {
          console.error('❌ Error updating testimonial with AI analysis:', updateError);
          // Still return a success response to the client, as we don't want to block the process
          // But log the error for debugging purposes
          return new Response(JSON.stringify({
            analysis,
            warning: "Testimonial was processed but could not be updated in the database."
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        console.log("✅ Testimonial updated with AI analysis:", testimonialId);
      }

      return new Response(JSON.stringify(analysis), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (aiError) {
      console.error('💥 OpenAI processing error:', aiError);
      throw new Error(`AI processing failed: ${aiError.message}`);
    }
  } catch (error) {
    console.error('💥 Error in process-testimonial function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        details: "There was an error processing your testimonial. Please try again later."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
