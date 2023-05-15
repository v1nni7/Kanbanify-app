interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function FormGroup({ children }: FormGroupProps) {
  return <div className="flex items-center relative mb-2">{children}</div>;
}
