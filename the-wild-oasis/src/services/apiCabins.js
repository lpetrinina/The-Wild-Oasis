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

export async function createCabin(newCabin) {

    //https://qewyniuqkyeaifamyeaz.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', ''); //create a unique name for each image and remove '/' to avoid problems with supabase

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create a cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error('Cabin can not be created!');
    }

    console.log(data)

    // 2. Upload the image in cabin-images bucket
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3.Delete the cabin if there is a storageError(the image is uploaded successfully);
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);

        console.error(storageError);
        throw new Error('Cabin image could not be uploaded and the cabin was not created!');
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