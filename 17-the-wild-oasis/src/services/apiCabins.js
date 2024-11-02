import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
   const { data: cabins, error } = await supabase.from("cabins").select("*");

   if (error) {
      console.error(error);
      throw new Error("cabins could not be loaded");
   }

   return cabins;
}

export async function deleteCabin(cabinID) {
   const { error } = await supabase.from("cabins").delete().eq("id", cabinID);

   if (error) {
      console.error(error);
      throw new Error("Cabins could not be deleted.");
   }
}

// input/needs a new cabin object
export async function createEditCabin(newCabin, id) {
   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
   );
   const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

   //! Create/Edit cabin
   let query = supabase.from("cabins");

   // A) CREATE
   // When we use the insert function, we do not immediately return the data (object)
   // .select() and .single() will take the value out of the array

   query = id
      ? query.update({ ...newCabin, image: imagePath }).eq("id", id)
      : query.insert([{ ...newCabin, image: imagePath }]);

   const { data, error } = await query.select().single();

   if (error) {
      console.error(error);
      throw new Error(
         id ? "Cabins could not be edited." : "Cabins could not be created."
      );
   }

   // Upload Image
   if (hasImagePath) return data;

   const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

   // Delete cabin if there was an error from image
   if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);

      throw new Error(
         "Cabin image could not be uploaded as the cabin was not created."
      );
   }
}
