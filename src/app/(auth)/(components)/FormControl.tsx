import { UseFormRegisterReturn } from "react-hook-form";

interface FormControlProps extends React.HTMLAttributes<HTMLInputElement> {
  type: string;
  disabled: boolean;
  register: UseFormRegisterReturn<any>;
}

export default function FormControl(props: FormControlProps) {
  const { register } = props;
  return (
    <input
      {...props}
      {...register}
      autoComplete="off"
      className="w-full h-12 rounded-md placeholder:text-slate-500 text-slate-500 text-xl border-2 border-slate-500 focus:placeholder:text-slate-400 focus:text-slate-400 focus:border-slate-400 peer bg-transparent transition outline-none pl-10 disabled:bg-blue-200/20 disabled:cursor-not-allowed"
    />
  );
}

// React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>
