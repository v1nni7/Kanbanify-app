interface FormControlProps extends React.HTMLAttributes<HTMLInputElement> {
  type: string;
  register: any;
}

export default function FormControl(props: FormControlProps) {
  const { register } = props;

  return (
    <input
      {...props}
      {...register}
      autoComplete="off"
      className="w-full p-2 outline-0 h-10 border-2 border-slate-500 focus:border-slate-400 text-slate-400 bg-transparent rounded-md"
    />
  );
}
