import supabase from "./supabase";

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw new Error(error.message)
    };

    console.log(data)
    return data;
}

export async function getCurrentUser() {

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser();

    console.log(data);

    if (error) {
        throw new Error(error.message)
    };


    return data?.user;
}