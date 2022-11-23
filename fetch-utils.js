const SUPABASE_URL = 'https://lmxgwefcojhyudouhfdi.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteGd3ZWZjb2poeXVkb3VoZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0MTE4NjAsImV4cCI6MTk3OTk4Nzg2MH0.sJ2d3kgfQnCLcAr9C7ybkPsuB6wHrKD1cv_Dva8hdqI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// export async functions that fetch data

export async function getPosts(title, category) {
    // let query = client
    //     .from('beanie_babies')
    //     .select('*', { count: 'exact' })
    //     .order('title')
    //     .limit(100);

    let query = client.from('posts').select('*');
    // , { count: 'exact' })
    // .limit(200)
    // .order('created_at', { ascending: false });

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }
    if (category) {
        query = query.eq('category', category);
    }

    const response = await query;

    return response;
}
export async function getPost(id) {
    return await client
        .from('posts')
        .select(`*,comments(*)`)
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function getUrls(id) {
    const response = await client.from('post-id-img').select('*').eq('post_id', id);
    return response;
}
// export async function getCategory() {
// let query = client.from('post').select('category').order('name');
// const response = await query;
// return response;
// }
