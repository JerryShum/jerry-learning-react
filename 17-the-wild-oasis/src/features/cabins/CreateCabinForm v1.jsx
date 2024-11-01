import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
   const queryClient = useQueryClient();
   const { register, handleSubmit, reset, getValues, formState } = useForm();
   const { errors } = formState;

   const { mutate, isLoading: isCreating } = useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
         toast.success("New cabin successfully created.");
         queryClient.invalidateQueries({
            queryKey: "cabins",
         });
         reset();
      },
      onError: (error) => toast.error(error.message),
   });

   function onSubmit(data) {
      // doing data.image[0] because that is a file list and we are trying to destructure the actual value of the file instead of the list
      mutate({ ...data, image: data.image[0] });
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
               disabled={isCreating}
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
               disabled={isCreating}
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
               disabled={isCreating}
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
               disabled={isCreating}
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
               disabled={isCreating}
            />
         </FormRow>

         <FormRow label={"Cabin Photo"}>
            <FileInput
               id="image"
               accept="image/*"
               disabled={isCreating}
               {...register("image", {
                  required: "This field is required",
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset" size="medium">
               Cancel
            </Button>
            <Button variation="primary" size="medium" disabled={isCreating}>
               Edit cabin
            </Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
