interface FormControlProps extends React.HTMLProps<HTMLInputElement> {
  register?: any;
}

export default function FormControl(props: FormControlProps) {
  const { register, ...rest} = props;
  return (
    <input
      {...rest}
      {...register}
      className="w-full h-14 rounded-md peer bg-transparent border-2 text-neutral-300 border-neutral-500 outline-0 autofill:bg-neutral-600 focus:placeholder:text-neutral-400 focus:border-neutral-400 transition placeholder:text-neutral-500 text-xl pl-10"
    />
  );
}
