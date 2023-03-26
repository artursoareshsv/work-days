import { TextField, TextFieldProps } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { FormikField } from '../types/FormikField';

export function FormikNumberField({ name, ...rest }: TextFieldProps & FormikField) {
	const [field] = useField<number>(name);
	const { setFieldValue } = useFormikContext();

	return <TextField value={field.value} type='number' onChange={(event) => setFieldValue(name, event.target.value)} {...rest} />;
}
