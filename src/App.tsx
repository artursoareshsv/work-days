import { Card, CardContent, Grid, Typography } from '@mui/material';
import { addWeeks, isThisMonth } from 'date-fns';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import isWeekend from 'date-fns/isWeekend';
import startOfMonth from 'date-fns/startOfMonth';
import { Formik } from 'formik';
import { useState } from 'react';
import { AutoSubmit } from './components/AutoSubmit';
import { FormikDatePicker } from './components/FormikDatePicker';
import { FormikNumberField } from './components/FormikNumberField';
import { get, save } from './services/officeDays';

type FormData = {
	from: Date;
	to: Date;
	holidays: number;
};

const DATE_FORMAT = 'dd/MM/yyyy';

function App() {
	const initialValues: FormData = {
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
		holidays: 3,
	};

	const [workDays, setWorkDays] = useState<number>(0);

	const handleSubmit = ({ from, to, holidays }: FormData): void => {
		const days = eachDayOfInterval({ start: from, end: to });
		const weekDays = days.filter((day) => !isWeekend(day));

		setWorkDays(weekDays.length - holidays);
	};

	const officeDays = async () => {
		const officeDays: Date[] = [new Date('2023-04-12')];
		let keepLooping = true;

		while (keepLooping) {
			const initialDay = officeDays[officeDays.length - 1];
			const nextOfficeDay = addWeeks(initialDay, 2);

			if (!isThisMonth(nextOfficeDay)) {
				keepLooping = false;
				break;
			}

			officeDays.push(nextOfficeDay);
		}

		console.log(await get());
		await save(officeDays);

		return officeDays;
	};

	officeDays();

	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='h5' component='div'>
					Work days
				</Typography>

				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item>
							<FormikDatePicker label='From' name='from' format={DATE_FORMAT} />
						</Grid>

						<Grid item>
							<FormikDatePicker label='To' name='to' format={DATE_FORMAT} />
						</Grid>

						<Grid item>
							<FormikNumberField label='Holidays' name='holidays' />
						</Grid>

						<AutoSubmit />
					</Grid>
				</Formik>

				<Typography>{workDays}</Typography>
			</CardContent>
		</Card>
	);
}

export default App;
