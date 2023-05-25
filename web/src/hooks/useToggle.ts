import { Dispatch, SetStateAction, useCallback, useState } from "react";

export default function useToggle(
  defaultValue: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle, setValue];
}
