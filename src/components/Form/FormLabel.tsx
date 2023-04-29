interface FormLabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function FormLabel(props: FormLabelProps) {
  const { children, ...rest } = props;

  return (
    <label {...rest} className="absolute text-3xl mx-2 peer-focus:text-neutral-400 text-neutral-500">
      {children}
    </label>
  );
}
