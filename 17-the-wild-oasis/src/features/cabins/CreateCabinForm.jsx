import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit }) {
   const { id: editID, ...editValues } = cabinToEdit || {};

   // Checking to see if we're editing the cabin
   // If there is an editID, it is true
   const isEditSession = Boolean(editID);

   const { register, handleSubmit, reset, getValues, formState } = useForm({
      defaultValues: isEditSession ? editValues : {},
   });
   const { errors } = formState;

   const { isCreating, createCabin } = useCreateCabin();
   const { isEditing, editCabin } = useEditCabin();

   const isWorking = isCreating || isEditing;

   function onSubmit(data) {
      // checking the type of the image in our cabin data that we submit
      const image = typeof data.image === "string" ? data.image : data.image[0];

      // doing data.image[0] because that is a file list and we are trying to destructure the actual value of the file instead of the list

      if (!isEditSession) {
         createCabin(
            { ...data, image: data.image[0] },
            {
               onSuccess: (data) => reset(),
            }
         );
      } else if (isEditSession) {
         editCabin(
            { newCabinData: { ...data, image }, id: editID },
            {
               onSuccess: (data) => reset(),
            }
         );
      }
   }

   function onError(errors) {
      // console.log(errors);
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
         <FormRow label={"Cabin Name"} error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               {...register("name", { required: "This field is required" })}
               disabled={isWorking}
            />
         </FormRow>

         <FormRow
            label={"Maximum Capacity"}
            error={errors?.maxCapacity?.message}
         >
            <Input
               type="number"
               id="maxCapacity"
               {...register("maxCapacity", {
                  required: "This field is required",
                  min: {
                     value: 1,
                     message: "Capacity should be atleast 1.",
                  },
               })}
               disabled={isWorking}
            />
         </FormRow>

         <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
            <Input
               type="number"
               id="regularPrice"
               {...register("regularPrice", {
                  required: "This field is required",
                  min: {
                     value: 1,
                     message: "Price should be atleast 1.",
                  },
               })}
               disabled={isWorking}
            />
         </FormRow>

         <FormRow label={"Discount"} error={errors?.discount?.message}>
            <Input
               type="number"
               id="discount"
               defaultValue={0}
               {...register("discount", {
                  required: "This field is required",
                  validate: (value) =>
                     Number(value) < Number(getValues().regularPrice)
                        ? true
                        : "Discount should be less than the regular price.",
               })}
               disabled={isWorking}
            />
         </FormRow>

         <FormRow
            label={"Description for Website"}
            error={errors?.description?.message}
         >
            <Textarea
               type="number"
               id="description"
               defaultValue=""
               {...register("description", {
                  required: "This field is required",
               })}
               disabled={isWorking}
            />
         </FormRow>

         <FormRow label={"Cabin Photo"}>
            <FileInput
               id="image"
               accept="image/*"
               disabled={isWorking}
               {...register("image", {
                  required: isEditSession ? false : "This field is required",
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset" size="medium">
               Cancel
            </Button>
            <Button variation="primary" size="medium" disabled={isWorking}>
               {isEditSession ? "Edit Cabin" : "Create Cabin"}
            </Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
