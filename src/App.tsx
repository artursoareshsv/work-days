import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import isWeekend from 'date-fns/isWeekend';
import startOfMonth from 'date-fns/startOfMonth';
import { Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { AutoSubmit } from './components/AutoSubmit';
import { FormikDatePicker } from './components/FormikDatePicker';
import { FormikNumberField } from './components/FormikNumberField';
import { getOfficeDays } from './services/officeDays';

type FormData = {
	from: Date;
	to: Date;
	holidays: number;
};

const DATE_FORMAT = 'dd/MM/yyyy';

export default function App() {
	const initialValues: FormData = {
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
		holidays: 0,
	};

	const [workDays, setWorkDays] = useState<number>(0);
	const [officeDays, setOfficeDays] = useState<Date[]>();

	useEffect(() => {
		getOfficeDays().then((dates) => setOfficeDays(dates));
	}, []);

	const handleSubmit = useCallback(
		({ from, to, holidays }: FormData): void => {
			const days = eachDayOfInterval({ start: from, end: to });
			const weekDays = days.filter((day) => !isWeekend(day));

			setWorkDays(weekDays.length - holidays - (officeDays?.length ?? 0));
		},
		[officeDays]
	);

	return (
		<Card variant='outlined'>
			<CardContent>
				<Stack spacing={2}>
					<Typography variant='h5' component='div' gutterBottom>
						Work days
					</Typography>

					<Formik initialValues={initialValues} onSubmit={handleSubmit}>
						<Grid container gap={2}>
							<Grid item>
								<FormikDatePicker label='From' name='from' format={DATE_FORMAT} />
							</Grid>

							<Grid item>
								<FormikDatePicker label='To' name='to' format={DATE_FORMAT} />
							</Grid>

							<Grid item>
								<FormikNumberField label='Holidays' name='holidays' />
							</Grid>

							<AutoSubmit dependencies={[officeDays]} />
						</Grid>
					</Formik>

					<Stack gap={0.5}>
						<Typography variant='subtitle1'>
							<strong>Business days:</strong>
						</Typography>
						<Typography>- {workDays}</Typography>

						<Typography variant='subtitle1'>
							<strong>Office days:</strong>
						</Typography>
						{officeDays?.map((officeDay) => (
							<Typography key={officeDay.toISOString()}>- {format(officeDay, DATE_FORMAT)}</Typography>
						))}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
}
