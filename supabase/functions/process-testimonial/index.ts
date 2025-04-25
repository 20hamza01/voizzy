
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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, testimonialId } = await req.json();
    console.log("🔄 Processing testimonial:", { testimonialId, contentLength: content.length });
    
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
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);
    console.log("✨ AI Analysis completed:", { testimonialId, analysis });
    
    // If testimonialId is provided, update the testimonial with AI analysis
    if (testimonialId) {
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
        throw updateError;
      }
      console.log("✅ Testimonial updated with AI analysis:", testimonialId);
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('💥 Error in process-testimonial function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
