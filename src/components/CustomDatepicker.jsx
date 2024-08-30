import React, { forwardRef } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

/**
 * Datepicker with Input
 */
const DatePickerInput = forwardRef((props, ref) => {
	const onDateValueChange = () => {
		console.log('date value changed');
	};
	return (
		<input
			type="text"
			className={`form-control ${props.inputClass}`}
			onClick={props.onClick}
			value={props.value}
			onChange={onDateValueChange}
			ref={ref}
		/>
	);
});

/**
 * Datepicker with addon input
 */
const DatePickerInputWithAddon = forwardRef((props, ref) => (
	<div className="input-group" ref={ref}>
		<input
			type="text"
			className={`form-control ${props.inputClass}`}
			onClick={props.onClick}
			value={props.value}
			readOnly
		/>
		<span className={`input-group-text bg-${props.variant} border-${props.variant} text-white`}>
			<i className="ri-calendar-todo-fill fs-13" />
		</span>
	</div>
));

const CustomDatepicker = (props) => {
	// handle custom input
	const input =
		props.hideAddon === true ? (
			<DatePickerInput inputClass={props.inputClass} value={props.value.toDateString()} />
		) : (
			<DatePickerInputWithAddon variant={props.variant} inputClass={props.inputClass} value={props.value.toDateString()} />
		);

	return (
		<>
			<DatePicker
				customInput={input}
				timeIntervals={props.tI}
				selected={props.value}
				value={props.value.toDateString()}
				onChange={(date) => props.onChange(date)}
				showTimeSelect={props.showTimeSelect}
				timeFormat={props.timeFormat || 'hh:mm a'}
				timeCaption={props.timeCaption}
				dateFormat={props.dateFormat || 'MM/dd/yyyy'}
				minDate={props.minDate}
				maxDate={props.maxDate}
				monthsShown={props.monthsShown}
				showTimeSelectOnly={props.showTimeSelectOnly}
				inline={props.inline}
				autoComplete="off"
			/>
		</>
	);
};

export default CustomDatepicker;
