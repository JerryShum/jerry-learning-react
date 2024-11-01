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
export async function createCabin(newCabin) {
   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
   );
   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

   // Create cabin
   const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select();

   if (error) {
      console.error(error);
      throw new Error("Cabins could not be created.");
   }

   console.log("data:" + data);

   // Upload Image

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
