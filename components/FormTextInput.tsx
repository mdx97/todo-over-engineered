import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// TODO: There is some unfortunate duplication between here and `FormTextArea`, should look into
// cleaning that up at some point...

/** Text input component with a `label` and `error` text (for use in forms.) */
function FormTextInput({ label, error, ...rest }: Props) {
  return (
    <div className="relative flex flex-col">
      <label className="form-label">{label}</label>
      <input {...rest} type="text" />
      {error && (
        <span className="absolute top-full text-rose-500 text-sm">{error}</span>
      )}
    </div>
  );
}

export default FormTextInput;
