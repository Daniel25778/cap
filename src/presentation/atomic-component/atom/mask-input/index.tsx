import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useIMask } from 'react-imask';
import type { ChangeEvent, ChangeEventHandler, FC } from 'react';
import type { TextFieldProps } from '@mui/material';
import type { UseFormRegisterReturn } from 'react-hook-form';

type MaskInputProps = TextFieldProps & {
  mask: string;
  register?: UseFormRegisterReturn;
  handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};

export const MaskInput: FC<MaskInputProps> = ({
  mask,
  register,
  value,
  handleChange,
  ...props
}) => {
  const maskRef = useIMask({
    mask
  });

  useEffect(() => {
    maskRef.setValue(value ? String(value) : '');
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (props.onChange) props.onChange(event);
    else if (register?.onChange) register.onChange(event);

    if (handleChange) handleChange(event);
  };

  return (
    <TextField
      {...props}
      {...register}
      inputRef={maskRef.ref}
      onInput={handleInputChange}
      ref={register?.ref}
      type={'tel'}
    />
  );
};
