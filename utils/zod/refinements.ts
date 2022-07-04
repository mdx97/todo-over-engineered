import { Refinement, ZodIssueCode } from "zod";

/**
 * Below are the custom validation functions used to validate Zod schemas. Each one of these should have a companion
 * `Refinement` wrapper below (naming schema is self-evident). You can pass each of these validation functions to
 * `.refine` when defining a Zod schema, and provide your own error message like so:
 *
 * const MySchema = z.object({
 *   name: z.string().refine(isTitleCase, { message: "This needs to be title case, you pleb!"}),
 * });
 */

/**
 * Returns whether a given string is formatted in Title Case.
 * https://en.wikipedia.org/wiki/Title_case
 */
export const isTitleCase = (value: string): boolean => {
  return value
    .split(" ")
    .every((token) => token.charAt(0) === token.charAt(0).toUpperCase());
};

/**
 * Below are the Zod `Refinement` wrappers for the validation functions found above. These can be passed to `.superRefine`
 * when defining a Zod schema like so:
 *
 * const MySchema = z.object({
 *   name: z.string().superRefine(isTitleCaseRefinement),
 * });
 */

/** Adds a Zod issue if the value does not pass `isTitleCase`.*/
export const isTitleCaseRefinement: Refinement<string> = (value, context) => {
  if (!isTitleCase(value)) {
    context.addIssue({
      code: ZodIssueCode.custom,
      message: `${context.path} should be Title Case!`,
    });
  }
};
