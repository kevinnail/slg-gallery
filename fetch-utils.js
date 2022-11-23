const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// export async functions that fetch data

export async function getPosts(title, category) {
    let query = client
        .from('beanie_babies')
        .select('*', { count: 'exact' })
        .order('title')
        .limit(100);

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }
    if (category) {
        query = query.eq('category', category);
    }
    const response = await query;
    return response;
}

export async function getCategory() {
    let query = client.from('beanie_baby_astro_signs').select('*').order('name');
    const response = await query;
    return response;
}
