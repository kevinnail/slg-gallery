const SUPABASE_URL = 'https://lknorjsqpymayqwsnryo.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrbm9yanNxcHltYXlxd3NucnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxNjQwMTUsImV4cCI6MTk4NDc0MDAxNX0.VNrjjjios2POI2xABGY7Xf0vlqi_fXeBZZ9xBdLdKaI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

// export async functions that fetch data

export async function getPosts(title, category) {
    let query = client
        .from('posts')
        .select('*', { count: 'exact' })
        .limit(200)
        .order('created_at', { ascending: false });

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
    return await client.from('posts').select(`*`).eq('id', id).order('created_at').single();
}

export async function getUrls(id) {
    const response = await client.from('post-id-img').select('*').eq('post_id', id);

    return response;
}

export async function createPost(post) {
    return await client.from('posts').insert(post).single();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);
    let url = null;
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        // in this case, we will _replace_ any
        // existing file with same name.
        upsert: true,
    });

    if (response.error) {
        return null;
    }

    // Construct the URL to this image:
    url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
export async function uploadImage2(urls, postId) {
    for (let i = 0; i < urls.length; i++) {
        let obj = {
            post_id: postId,
            image_url: urls[i],
        };

        await client.from('post-id-img').insert(obj);
    }
}

export async function deletePostById(id) {
    for (let i = 0; i < id.length; i++) {
        await client.from('post-id-img').delete().eq('post_id', id[i]);
        await client.from('posts').delete().eq('id', id[i]).single();
    }
}
