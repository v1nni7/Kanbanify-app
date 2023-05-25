interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FormGroup(props: FormGroupProps) {
  const { children } = props;

  return (
    <div {...props} className="mb-4">
      {children}
    </div>
  );
}
