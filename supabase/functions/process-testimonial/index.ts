
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client with the service role key
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
    
    // Process with OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI that analyzes testimonials. For each testimonial:
              1. Provide a brief summary
              2. Calculate a sentiment score from -1 to 1
              3. Extract key points
              Format response as JSON with fields: summary, sentimentScore, keyPoints`
          },
          {
            role: 'user',
            content: content
          }
        ],
      }),
    });

    const aiResponse = await response.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);
    
    // If testimonialId is provided, update the testimonial with AI analysis
    if (testimonialId) {
      const { error: updateError } = await supabase
        .from('testimonials')
        .update({
          ai_summary: analysis.summary,
          sentiment_score: analysis.sentimentScore,
          key_points: analysis.keyPoints
        })
        .eq('id', testimonialId);
        
      if (updateError) {
        console.error('Error updating testimonial with AI analysis:', updateError);
      }
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-testimonial function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
