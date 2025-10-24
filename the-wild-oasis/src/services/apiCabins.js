import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins can not be loaded!');
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = Boolean(newCabin?.image?.startsWith?.(supabaseUrl));

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', ''); //create a unique name for each image and remove '/' to avoid problems with supabase

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/Edit a cabin
    let query = supabase.from('cabins');

    // A) Create a cabin (if there is NOT id)
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    }

    // B) Edit (if there is id)
    if (id) {
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id)
    }

    const { data, error } = await query.select().single();


    if (error) {
        console.error(error);
        throw new Error('Cabin can not be created!');
    }

    // Prevent uploading plain text.
    if (!hasImagePath) {

        // 2. Upload the image in cabin-images bucket
        const { error: storageError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, newCabin.image);


        // 3.Delete the cabin if there is a storageError(the image is NOT uploaded successfully);
        if (storageError) {
            await supabase
                .from('cabins')
                .delete()
                .eq('id', data.id);

            console.error(storageError);
            throw new Error('Cabin image could not be uploaded and the cabin was not created!');
        }
    }
    return data;

}

export async function deleteCabin(id) {

    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);


    if (error) {
        console.error(error);
        throw new Error('Cabin can not be deleted!');
    }

    return;
}