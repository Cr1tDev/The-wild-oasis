import supabase, { supabaseUrl } from "./supabase";

// Fetch data from supabase
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Insert data to supabase
export async function createEditCabin({ newCabinData, id }) {
  const isEditSession = Boolean(id);

  // 1️.) Check if image is already a stored URL
  const hasImagePath =
    typeof newCabinData.image === "string" &&
    newCabinData.image.startsWith(supabaseUrl);

  const imageName = hasImagePath
    ? newCabinData.image.split("/").at(-1)
    : `${Math.random()}-${newCabinData.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 2️.) Build query
  let query = supabase.from("cabins");

  if (isEditSession) {
    // A) CREATE
    query = query.update({ ...newCabinData, image: imagePath }).eq("id", id);
  } else {
    // B) EDIT
    query = query.insert([{ ...newCabinData, image: imagePath }]);
  }

  // 3️.) Execute DB operation
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      isEditSession ? "Cabin could not be edited" : "Cabin could not be created"
    );
  }

  if (hasImagePath) return data;

  // 4️.) Upload image ONLY if it's a new file
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabinData.image);

    // 5️.) Rollback if upload fails
    if (storageError) {
      if (!isEditSession)
        await supabase.from("cabins").delete().eq("id", data.id);

      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }

  return data;
}

// Delete data from supabase
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
