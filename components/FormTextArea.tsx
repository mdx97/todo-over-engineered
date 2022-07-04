import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

// TODO: There is some unfortunate duplication between here and `FormTextInput`, should look into
// cleaning that up at some point...

/** Textarea component with a `label` and `error` text (for use in forms.) */
function FormTextArea({ label, error, ...rest }: Props) {
  return (
    <div className="relative flex flex-col">
      <label className="form-label">{label}</label>
      <textarea {...rest} className="input" />
      {error && (
        <span className="absolute top-full text-rose-500 text-sm">{error}</span>
      )}
    </div>
  );
}

export default FormTextArea;
