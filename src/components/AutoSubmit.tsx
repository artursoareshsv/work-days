import { useFormikContext } from 'formik';
import { useEffect } from 'react';

type Props = {
	dependencies?: any[];
};

export function AutoSubmit({ dependencies }: Props) {
	const { values, submitForm } = useFormikContext();

	useEffect(() => {
		submitForm();
	}, [values, submitForm, dependencies]);

	return null;
}
