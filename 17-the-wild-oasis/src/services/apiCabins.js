import supabase from "./supabase";

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
