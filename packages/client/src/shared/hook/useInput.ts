import { useCallback, useState, ChangeEvent } from 'react';

interface Props<T> {
  defaultValue: T;
}

const useInput = <T extends Record<string, any>>({
  defaultValue,
}: Props<T>) => {
  const [value, setValue] = useState<T>(defaultValue);

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value: newValue } = event.target;

      setValue((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    },
    [],
  );

  return { value, handleChangeValue };
};

export default useInput;
