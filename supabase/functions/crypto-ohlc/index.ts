import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const coin = url.searchParams.get('coin') || 'bitcoin';
    const days = url.searchParams.get('days') || '30';
    const vs = url.searchParams.get('vs') || 'usd';

    console.log(`Fetching OHLC data for ${coin}, ${days} days`);

    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${vs}&days=${days}`;
    
    const response = await fetch(coingeckoUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform data to lightweight-charts format
    const formattedData = data.map((row: number[]) => ({
      time: Math.round(row[0] / 1000),
      open: row[1],
      high: row[2],
      low: row[3],
      close: row[4],
    }));

    return new Response(JSON.stringify(formattedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
