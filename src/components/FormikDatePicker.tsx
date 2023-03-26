import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useField, useFormikContext } from 'formik';
import { FormikField } from '../types/FormikField';

export function FormikDatePicker({ name, ...rest }: DatePickerProps<Date> & FormikField) {
	const [field] = useField<Date>(name);
	const { setFieldValue } = useFormikContext();

	return <DatePicker value={field.value} onChange={(value) => setFieldValue(name, value)} {...rest} />;
}
