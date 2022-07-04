import NiceModal from "@ebay/nice-modal-react";
import { Formik } from "formik";
import { z } from "zod";

import useModalExtended from "../hooks/useModalExtended";
import { formikOnSubmitHandler } from "../utils/formik";
import { toFormikValidationSchema } from "../utils/zod";
import { trpc } from "../utils/trpc";
import { isTitleCaseRefinement } from "../utils/zod";
import FormTextArea from "./FormTextArea";
import FormTextInput from "./FormTextInput";
import Modal from "./Modal";

interface FormValues {
  label: string;
  description: string;
}

const FormSchema = z.object({
  label: z.string().superRefine(isTitleCaseRefinement),
  description: z.string(),
});

/** Modal for creating new TODO items. */
const CreateTodoModal = NiceModal.create(() => {
  const handler = useModalExtended();
  const todoCreateOne = trpc.useMutation(["todo.createOne"]);

  return (
    <Modal
      className="flex flex-col gap-8 p-8"
      isOpen={handler.visible}
      handler={handler}
    >
      {/* Modal Header */}
      <h1 className="form-header">Create TODO</h1>

      {/* Form */}
      <Formik
        initialValues={{ label: "", description: "" } as FormValues}
        validationSchema={toFormikValidationSchema(FormSchema)}
        onSubmit={formikOnSubmitHandler(({ label, description }) =>
          todoCreateOne
            .mutateAsync({ label, description })
            .then(handler.success)
            .catch(handler.failure)
        )}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldError,
        }) => (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <FormTextInput
              className="input"
              label="Label"
              name="label"
              onChange={(e) => {
                setFieldError("label", "");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.label}
              // TODO: This is kind of a funky way of doing this, can we clean this up?
              error={touched.label ? errors.label : ""}
            />
            <FormTextArea
              label="Description"
              name="description"
              onChange={(e) => {
                setFieldError("description", "");
                handleChange(e);
              }}
              onBlur={handleBlur}
              value={values.description}
              // TODO: This is kind of a funky way of doing this, can we clean this up?
              error={touched.description ? errors.description : ""}
            />
            <button
              className="button self-end w-40"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
});

export default CreateTodoModal;
