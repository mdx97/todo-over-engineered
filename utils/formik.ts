import { FormikErrors, FormikHelpers } from "formik";

/**
 * A validation pipeline builder for Formik form data.
 *
 * @example
 * // This is how to use this class inside the validate function of a Formik form.
 * validate={(values) =>
 *   new FormikValidator(values)
 *     .required("label")
 *     .required("description")
 *     .validate()
 * }
 *
 * @example
 * // FormikValidator can also be easily extended to provide new validation methods.
 * class CustomFormikValidator<T> extends FormikValidator<T> {
 *   function evaluate(value: T[keyof T]) {
 *     return typeof value === "string"
 *       ? value
 *         .split(" ")
 *         .every((token) => token.charAt(0) === token.charAt(0).toUpperCase())
 *       : false;
 *   }
 *
 *   this.assert(property, evaluate, "Must be in Title Case!");
 *   return this;
 * }
 */
export default class FormikValidator<T> {
  _values: T;
  _errors: FormikErrors<T> = {};

  constructor(values: T) {
    this._values = values;
  }

  // Helper methods for accessing the private data of this class.

  protected getValue(property: keyof T): T[keyof T] {
    return this._values[property];
  }

  protected getError(property: keyof T): FormikErrors<T>[keyof T] {
    return this._errors[property];
  }

  protected setError(property: keyof T, error: string) {
    // TODO: For some reason Typescript is not recognizing `property` as a valid key of `this.errors`?
    (this._errors as any)[property] = error;
  }

  /**
   * The purpose of this function is to set the given `error` if a certain set of criteria is met:
   *
   * 1. The `property` does not already have an error.
   * 2. The given `evaluator` function return false.
   */
  protected assert(
    property: keyof T,
    evaluator: (value: T[keyof T]) => boolean,
    error: string
  ) {
    if (!this.getError(property) && !evaluator(this.getValue(property))) {
      this.setError(property, error);
    }
  }

  /** Returns an error for the `property` if it is empty. */
  public required(property: keyof T): this {
    this.assert(property, (value) => Boolean(value), "Cannot be empty!");
    return this;
  }

  /** Finish the pipeline and return any errors produced. */
  public validate(): FormikErrors<T> {
    return this._errors;
  }
}

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
