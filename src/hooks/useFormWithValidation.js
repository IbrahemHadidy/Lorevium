import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useFormWithValidation(
  schema,
  defaultValues
) {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
}
