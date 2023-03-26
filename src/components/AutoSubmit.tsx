import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export function AutoSubmit() {
	const { values, submitForm } = useFormikContext();

	useEffect(() => {
		submitForm();
	}, [values, submitForm]);

	return null;
}
