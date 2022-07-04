import NiceModal from "@ebay/nice-modal-react";
import { Formik } from "formik";
import useModalExtended from "../hooks/useModalExtended";
import FormikValidator, { formikOnSubmitHandler } from "../utils/formik";
import { trpc } from "../utils/trpc";
import FormTextArea from "./FormTextArea";
import FormTextInput from "./FormTextInput";
import Modal from "./Modal";

interface FormValues {
  label: string;
  description: string;
}

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
        validate={(values) =>
          new FormikValidator(values)
            .required("label")
            .required("description")
            .validate()
        }
        onSubmit={formikOnSubmitHandler(({ label, description }) =>
          todoCreateOne
            .mutateAsync({ label, description })
            .then(handler.success)
            .catch(handler.failure)
        )}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <FormTextInput
              className="input"
              label="Label"
              name="label"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.label}
              // TODO: This is kind of a funky way of doing this, can we clean this up?
              error={touched.label ? errors.label : ""}
            />
            <FormTextArea
              label="Description"
              name="description"
              onChange={handleChange}
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
