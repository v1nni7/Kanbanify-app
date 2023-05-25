interface FormLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
}

export default function FormLabel(props: FormLabelProps) {
  const { htmlFor, children } = props;

  return (
    <label
      htmlFor={htmlFor}
      className="absolute text-slate-500 peer-focus:text-slate-400 transition ml-2"
    >
      {children}
    </label>
  );
}
