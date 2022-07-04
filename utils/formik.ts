import { FormikHelpers } from "formik";

export type FormikOnSubmitHandler<T> = (
  values: T,
  actions: FormikHelpers<T>
) => Promise<void>;

/**
 * Wraps an async action that the consumer writes for handling a Formik form submission
 * with logic to properly set the `submitting` field.
 */
export function formikOnSubmitHandler<T>(
  handler: FormikOnSubmitHandler<T>
): FormikOnSubmitHandler<T> {
  return (values, actions) => {
    actions.setSubmitting(true);
    return handler(values, actions).finally(() => actions.setSubmitting(false));
  };
}
