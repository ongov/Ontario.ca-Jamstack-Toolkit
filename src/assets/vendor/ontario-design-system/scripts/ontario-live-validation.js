(function () {
	const LICENSE_NUMBER_MIN_LENGTH = 2;
	const LICENSE_NUMBER_MAX_LENGTH = 8;

	const PIN_NUMBER_MIN_LENGTH = 6;
	const PIN_NUMBER_MAX_LENGTH = 12;

	const lang = window.lang ?? 'en';

	const errorMessagesTranslations = {
		en: {
			odometer: {
				emptyError: 'You must enter an odometer reading.',
				invalidError: 'The odometer reading must only include numbers.',
			},
			licensePlate: {
				emptyError: 'You must enter a licence plate number.',
				invalidError: 'The format of the plate number is not valid.',
			},
			email: {
				emptyError: 'You must enter an email address.',
				invalidError: 'The format of the email address is not valid.',
			},
			pin: {
				emptyError: 'You must enter a PIN.',
				invalidError: 'The PIN must only contain numbers.',
				invalidAndMinLengthError: 'The PIN must only contain numbers and must be at least 6 characters.',
				invalidAndMaxLengthError: 'The PIN must only contain numbers and must not be greater than 12 characters.',
				minLengthError: 'The PIN must be at least 6 characters.',
				maxLengthError: 'The PIN must not be greater than 12 characters.',
			},
			birthdate: {
				emptyDay: 'Enter the day.',
				emptyMonth: 'Enter the month.',
				emptyYear: 'Enter the year.',
				emptyDayAndMonth: 'Enter the month and day.',
				emptyDayAndYear: 'Enter the year and day.',
				emptyMonthAndYear: 'Enter the year and month.',
				invalidDate: 'Enter a valid date.',
				invalidDay: 'Enter a valid day.',
				invalidMonth: 'Enter a valid month.',
				invalidYear: 'Enter a valid year.',
			},
		},
		fr: {
			odometer: {
				emptyError: 'Vous devez saisir une lecture d’odomètre.',
				invalidError: 'La lecture de l’odomètre ne doit comprendre que des chiffres.',
			},
			licensePlate: {
				emptyError: 'Vous devez saisir un numéro de plaque d’immatriculation.',
				invalidError: 'Le format du numéro de plaque d’immatriculation est non valide.',
			},
			email: {
				emptyError: 'Vous devez saisir une adresse courriel.',
				invalidError: 'Le format de l’adresse courriel est non valide.',
			},
			pin: {
				emptyError: 'Vous devez saisir un NIP.',
				invalidError: 'Le NIP ne doit comprendre que des chiffres.',
				invalidAndMinLengthError: 'Le NIP ne doit comprendre que des chiffres et doit comporter au moins 6 caractères.',
				invalidAndMaxLengthError: 'Le NIP ne doit comprendre que des chiffres et ne doit pas comporter plus de 12 caractères.',
				minLengthError: 'Le NIP doit comporter au moins 6 caractères.',
				maxLengthError: 'Le NIP ne doit pas comporter plus de 12 caractères.',
			},
			birthdate: {
				emptyDay: 'Saisissez le jour.',
				emptyMonth: 'Saisissez le mois.',
				emptyYear: 'Saisissez l’année.',
				emptyDayAndMonth: 'Saisissez le mois et le jour.',
				emptyDayAndYear: 'Saisissez l’année et le jour.',
				emptyMonthAndYear: 'Saisissez l’année et le mois.',
				invalidDate: 'Saisissez une date valide.',
				invalidDay: 'Saisissez un jour valide.',
				invalidMonth: 'Saisissez un mois valide.',
				invalidYear: 'Saisissez une année valide.',
			},
		},
	};
	const errorMessages = errorMessagesTranslations[lang];

	const isEmpty = function (str) {
		return !str || str?.length <= 0;
	};

	const isNumber = function (str) {
		const pattern = /^\d+\.?\d*$/;
		return pattern.test(str);
	};

	const isNumberOrAlphabate = function (str) {
		const pattern = /^[a-zA-Z0-9]*$/;
		return pattern.test(str);
	};

	const isValidLicensePlateNumber = function (str) {
		return !(!str || str?.length < LICENSE_NUMBER_MIN_LENGTH || str?.length > LICENSE_NUMBER_MAX_LENGTH || !isNumberOrAlphabate(str));
	};

	const isValidEmail = function (email) {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	/**
	 *  Date input field should be treated as one component for errors
	 *  User should be able to tab through each fields and leaving component without
	 *  it throwing an error.
	 */
	const isDateFocusedOrEmpty = function (inputId, isBirthdateTyped) {
		const dayInput = document.getElementById(`${inputId}-day`);
		const monthInput = document.getElementById(`${inputId}-month`);
		const yearInput = document.getElementById(`${inputId}-year`);

		const dayValue = dayInput.value;
		const monthValue = monthInput.value;
		const yearValue = yearInput.value;

		const activeElement = document.activeElement;

		// if all 3 date input field are empty and date has not been entered, no validation is required
		if (!isBirthdateTyped && isEmpty(dayValue) && isEmpty(monthValue) && isEmpty(yearValue)) {
			return true;
		}

		// if any of 3 date input field is active, do not perform any validation
		if (activeElement === dayInput || activeElement === monthInput || activeElement === yearInput) {
			return true;
		}

		return false;
	};

	/*
	 *  Day field should be a number, not negative, no greater than “31”
	 *  Month field should be a number, not negative, no greater than “12”
	 *  Year field should be a number, not negative, at length at least 4 digits
	 */
	const isInvalidDay = day => !isNumber(day) || day < 1 || day > 31;
	const isInvalidMonth = month => !isNumber(month) || month < 1 || month > 12;
	const isInvalidYear = year => !isNumber(year) || year <= 999 || year > 9999;

	/**
	 * Helper function to get error message for odometer reading validation
	 */
	function getOdometerReadingErrorMessage(inputElement, isOdometerTyped) {
		const odometerValue = inputElement.value;
		const { emptyError, invalidError } = errorMessages['odometer'];

		let errorText = '';

		if (isOdometerTyped && isEmpty(odometerValue)) {
			errorText = emptyError;
		} else if (!isEmpty(odometerValue) && !isNumber(odometerValue)) {
			errorText = invalidError;
		}

		return errorText;
	}

	/**
	 * Odometer Reading Valdiation
	 */
	function handleOdometerReadingValidation() {
		const odometerInputId = 'text-input-odometer-example';
		const errorContainerId = `${odometerInputId}-error-container`;
		const errorTextId = `${odometerInputId}-error-text`;
		const odometerInput = document.getElementById(odometerInputId);
		const errorContainer = document.getElementById(errorContainerId);
		const errorTextElement = document.getElementById(errorTextId);

		let isOdometerTyped = false;

		odometerInput.addEventListener('input', () => {
			if (!isOdometerTyped) {
				isOdometerTyped = true;
			}
		});

		odometerInput.addEventListener('blur', () => {
			const errorText = getOdometerReadingErrorMessage(odometerInput, isOdometerTyped);

			if (!isEmpty(errorText)) {
				errorTextElement.innerHTML = errorText;
				errorContainer.classList.remove('ontario-error__hidden');
				odometerInput.classList.add('ontario-input__error');
				odometerInput.setAttribute('aria-invalid', true);
				odometerInput.setAttribute('aria-describedBy', errorContainerId);
			} else {
				errorContainer.classList.add('ontario-error__hidden');
				odometerInput.classList.remove('ontario-input__error');
				odometerInput.setAttribute('aria-invalid', false);
				odometerInput.setAttribute('aria-describedBy', '');
			}
		});
	}

	/**
	 * Helper function to get error message for license plate validation
	 */
	function getLicensePlateErrorMessage(inputElement, isLicenseTyped) {
		const licenseValue = inputElement.value;
		const { emptyError, invalidError } = errorMessages['licensePlate'];

		let errorText = '';

		if (isLicenseTyped && isEmpty(licenseValue)) {
			errorText = emptyError;
		} else if (!isEmpty(licenseValue) && !isValidLicensePlateNumber(licenseValue)) {
			errorText = invalidError;
		}

		return errorText;
	}

	/**
	 * License Plate Number Validation
	 */
	function handleLicenseNumberValidation() {
		const licenseInputId = 'text-input-license-plate-example';
		const errorContainerId = `${licenseInputId}-error-container`;
		const errorTextId = `${licenseInputId}-error-text`;
		const hintTextId = `${licenseInputId}-hint`;
		const licenseInput = document.getElementById(licenseInputId);
		const errorContainer = document.getElementById(errorContainerId);
		const errorTextElement = document.getElementById(errorTextId);

		let isLicenseTyped = false;

		licenseInput.addEventListener('input', () => {
			if (!isLicenseTyped) {
				isLicenseTyped = true;
			}
		});

		licenseInput.addEventListener('blur', () => {
			const errorText = getLicensePlateErrorMessage(licenseInput, isLicenseTyped);

			if (!isEmpty(errorText)) {
				errorTextElement.innerHTML = errorText;
				errorContainer.classList.remove('ontario-error__hidden');
				licenseInput.classList.add('ontario-input__error');
				licenseInput.setAttribute('aria-invalid', true);
				licenseInput.setAttribute('aria-describedBy', `${errorContainerId} ${hintTextId}`);
			} else {
				errorContainer.classList.add('ontario-error__hidden');
				licenseInput.classList.remove('ontario-input__error');
				licenseInput.setAttribute('aria-invalid', false);
				licenseInput.setAttribute('aria-describedBy', hintTextId);
			}
		});
	}

	/**
	 * Helper function to get error message for email validation
	 */
	function getEmailErrorMessage(inputElement, isEmailTyped) {
		const emailValue = inputElement.value;
		const { emptyError, invalidError } = errorMessages['email'];

		let errorText = '';

		if (isEmailTyped && isEmpty(emailValue)) {
			errorText = emptyError;
		} else if (!isEmpty(emailValue) && !isValidEmail(emailValue)) {
			errorText = invalidError;
		}

		return errorText;
	}

	/**
	 * Email Validation
	 */
	function handleEmailValidation() {
		const emailInputId = 'text-input-email-example';
		const errorContainerId = `${emailInputId}-error-container`;
		const errorTextId = `${emailInputId}-error-text`;
		const emailInput = document.getElementById(emailInputId);
		const errorContainer = document.getElementById(errorContainerId);
		const errorTextElement = document.getElementById(errorTextId);

		let isEmailTyped = false;

		emailInput.addEventListener('input', () => {
			if (!isEmailTyped) {
				isEmailTyped = true;
			}
		});

		emailInput.addEventListener('blur', () => {
			const errorText = getEmailErrorMessage(emailInput, isEmailTyped);

			if (!isEmpty(errorText)) {
				errorTextElement.innerHTML = errorText;
				errorContainer.classList.remove('ontario-error__hidden');
				emailInput.classList.add('ontario-input__error');
				emailInput.setAttribute('aria-invalid', true);
				emailInput.setAttribute('aria-describedBy', errorContainerId);
			} else {
				errorContainer.classList.add('ontario-error__hidden');
				emailInput.classList.remove('ontario-input__error');
				emailInput.setAttribute('aria-invalid', false);
				emailInput.setAttribute('aria-describedBy', '');
			}
		});
	}

	/**
	 * Helper function to get error message for PIN validation
	 */
	function getPinErrorMessage(inputElement, isPinTyped) {
		const pinValue = inputElement.value;
		const pinLength = pinValue?.length;

		const { emptyError, invalidError, invalidAndMinLengthError, invalidAndMaxLengthError, minLengthError, maxLengthError } = errorMessages['pin'];

		let errorText = '';

		if (isPinTyped && isEmpty(pinValue)) {
			errorText = emptyError;
		} else if (!isEmpty(pinValue) && !isNumber(pinValue) && pinLength < PIN_NUMBER_MIN_LENGTH) {
			errorText = invalidAndMinLengthError;
		} else if (!isEmpty(pinValue) && !isNumber(pinValue) && pinLength > PIN_NUMBER_MAX_LENGTH) {
			errorText = invalidAndMaxLengthError;
		} else if (!isEmpty(pinValue) && !isNumber(pinValue)) {
			errorText = invalidError;
		} else if (!isEmpty(pinValue) && pinLength < PIN_NUMBER_MIN_LENGTH) {
			errorText = minLengthError;
		} else if (!isEmpty(pinValue) && pinLength > PIN_NUMBER_MAX_LENGTH) {
			errorText = maxLengthError;
		}

		return errorText;
	}

	/**
	 * Create Pin Validation
	 */
	function handlePinValidation() {
		const pinInputId = 'text-input-pin-number-example';
		const errorContainerId = `${pinInputId}-error-container`;
		const errorTextId = `${pinInputId}-error-text`;
		const hintTextId = `${pinInputId}-hint`;
		const pinInput = document.getElementById(pinInputId);
		const errorContainer = document.getElementById(errorContainerId);
		const errorTextElement = document.getElementById(errorTextId);

		let isPinTyped = false;

		pinInput.addEventListener('input', () => {
			if (!isPinTyped) {
				isPinTyped = true;
			}
		});

		pinInput.addEventListener('blur', () => {
			const errorText = getPinErrorMessage(pinInput, isPinTyped);

			if (isEmpty(errorText)) {
				errorContainer.classList.add('ontario-error__hidden');
				pinInput.classList.remove('ontario-input__error');
				pinInput.setAttribute('aria-invalid', false);
				pinInput.setAttribute('aria-describedBy', hintTextId);
			} else {
				errorTextElement.innerHTML = errorText;
				errorContainer.classList.remove('ontario-error__hidden');
				pinInput.classList.add('ontario-input__error');
				pinInput.setAttribute('aria-invalid', true);
				pinInput.setAttribute('aria-describedBy', `${errorContainerId} ${hintTextId}`);
			}
		});
	}

	/**
	 * Job Description Validation
	 */
	function handleJobDescriptionValidation() {
		const textareaId = 'text-area-example';
		const errorContainerId = `${textareaId}-error-container`;
		const textarea = document.getElementById(textareaId);
		const errorContainer = document.getElementById(errorContainerId);

		let isTextAreaTyped = false;

		textarea.addEventListener('input', () => {
			if (!isTextAreaTyped) {
				isTextAreaTyped = true;
			}
		});

		textarea.addEventListener('blur', () => {
			const textareaValue = textarea.value;

			if (isTextAreaTyped && isEmpty(textareaValue)) {
				errorContainer.classList.remove('ontario-error__hidden');
				textarea.classList.add('ontario-input__error');
				textarea.setAttribute('aria-invalid', true);
				textarea.setAttribute('aria-describedBy', errorContainerId);
			} else {
				errorContainer.classList.add('ontario-error__hidden');
				textarea.classList.remove('ontario-input__error');
				textarea.setAttribute('aria-invalid', false);
				textarea.setAttribute('aria-describedBy', '');
			}
		});
	}

	/**
	 * Helper function to get error message for birthdate validation
	 */
	function getBirthdateErrorMessage(dayInput, monthInput, yearInput) {
		const dayValue = dayInput.value;
		const monthValue = monthInput.value;
		const yearValue = yearInput.value;

		const { emptyDay, emptyMonth, emptyYear, emptyDayAndMonth, emptyDayAndYear, emptyMonthAndYear, invalidDate, invalidDay, invalidMonth, invalidYear } =
			errorMessages['birthdate'];

		let error = '';
		let dayInvalid = false;
		let monthInvalid = false;
		let yearInvalid = false;

		/*
		 *  If one ore more fields are valid but others are empty:
		 *  1 field empty:
		 *  Day as empty - “Enter the day.”
		 *  Month as empty - “Enter the month.”
		 *  Year as empty - “Enter the year.”
		 *  2 fields empty:
		 *  Month and day empty - “Enter the month and day.”
		 *  Year and day empty - “Enter the year and day.”
		 *  Year and month empty - “Enter the year and month.”
		 */
		if (isEmpty(dayValue) && isEmpty(monthValue) && isEmpty(yearValue)) {
			error = invalidDate;
			dayInvalid = true;
			monthInvalid = true;
			yearInvalid = true;
		} else if (isEmpty(dayValue) && isEmpty(monthValue)) {
			error = emptyDayAndMonth;
			dayInvalid = true;
			monthInvalid = true;
		} else if (isEmpty(dayValue) && isEmpty(yearValue)) {
			error = emptyDayAndYear;
			dayInvalid = true;
			yearInvalid = true;
		} else if (isEmpty(monthValue) && isEmpty(yearValue)) {
			error = emptyMonthAndYear;
			yearInvalid = true;
			monthInvalid = true;
		} else if (isEmpty(dayValue)) {
			error = emptyDay;
			dayInvalid = true;
		} else if (isEmpty(monthValue)) {
			error = emptyMonth;
			monthInvalid = true;
		} else if (isEmpty(yearValue)) {
			error = emptyYear;
			yearInvalid = true;
		}

		/*
		 *  If only one error, specify where the error occurs
		 *  E.g. “Enter a valid day.”, “Enter a valid month.” Or “Enter a valid year.”
		 *  If 2 or more fields have error (or all 3), say “Enter a valid date.”
		 *  If one or more fields are invalid but the others are empty say: “Enter a valid date.”
		 */
		if (isEmpty(error)) {
			if (isInvalidDay(dayValue) && isInvalidMonth(monthValue) && isInvalidYear(yearValue)) {
				error = invalidDate;
				dayInvalid = true;
				monthInvalid = true;
				yearInvalid = true;
			} else if (isInvalidDay(dayValue) && isInvalidMonth(monthValue)) {
				error = invalidDate;
				dayInvalid = true;
				monthInvalid = true;
			} else if (isInvalidDay(dayValue) && isInvalidYear(yearValue)) {
				error = invalidDate;
				dayInvalid = true;
				yearInvalid = true;
			} else if (isInvalidMonth(monthValue) && isInvalidYear(yearValue)) {
				error = invalidDate;
				monthInvalid = true;
				yearInvalid = true;
			} else if (isInvalidYear(yearValue)) {
				error = invalidYear;
				yearInvalid = true;
			} else if (isInvalidMonth(monthValue)) {
				error = invalidMonth;
				monthInvalid = true;
			} else if (isInvalidDay(dayValue)) {
				error = invalidDay;
				dayInvalid = true;
			}
		}

		return { error, dayInvalid, monthInvalid, yearInvalid };
	}

	/**
	 *  Birthdate Validation
	 */
	function handleBirthdateValidation() {
		const dateInputId = 'date-input-birthdate-example';
		const errorContainerId = `${dateInputId}-error-container`;
		const errorTextId = `${dateInputId}-error-text`;
		const hintTextId = `${dateInputId}-hint`;
		const dateDayInput = document.getElementById(`${dateInputId}-day`);
		const dateMonthInput = document.getElementById(`${dateInputId}-month`);
		const dateYearInput = document.getElementById(`${dateInputId}-year`);
		const errorContainer = document.getElementById(errorContainerId);
		const dateInputs = [dateDayInput, dateMonthInput, dateYearInput];

		let isBirthdateInvalid = false;
		let isBirthdateTyped = false;

		function validateBirthdate(dayInput, monthInput, yearInput) {
			const errorContainer = document.getElementById(errorContainerId);
			const errorText = document.getElementById(errorTextId);

			if (isDateFocusedOrEmpty(dateInputId, isBirthdateTyped)) {
				return;
			}
			const { error, dayInvalid, monthInvalid, yearInvalid } = getBirthdateErrorMessage(dayInput, monthInput, yearInput);

			if (!isEmpty(error)) {
				errorText.innerHTML = error;
				errorContainer.classList.remove('ontario-error__hidden');
				isBirthdateInvalid = true;
			} else {
				errorContainer.classList.add('ontario-error__hidden');
				isBirthdateInvalid = false;
			}

			if (dayInvalid) {
				dateDayInput.classList.add('ontario-input__error');
				dateDayInput.setAttribute('aria-invalid', true);
				dateDayInput.setAttribute('aria-describedBy', `${errorContainerId} ${hintTextId}`);
			} else {
				dateDayInput.classList.remove('ontario-input__error');
				dateDayInput.setAttribute('aria-invalid', false);
				dateDayInput.setAttribute('aria-describedBy', hintTextId);
			}

			if (monthInvalid) {
				dateMonthInput.classList.add('ontario-input__error');
				dateMonthInput.setAttribute('aria-invalid', true);
				dateMonthInput.setAttribute('aria-describedBy', `${errorContainerId} ${hintTextId}`);
			} else {
				dateMonthInput.classList.remove('ontario-input__error');
				dateMonthInput.setAttribute('aria-invalid', false);
				dateMonthInput.setAttribute('aria-describedBy', hintTextId);
			}

			if (yearInvalid) {
				dateYearInput.classList.add('ontario-input__error');
				dateYearInput.setAttribute('aria-invalid', true);
				dateYearInput.setAttribute('aria-describedBy', `${errorContainerId} ${hintTextId}`);
			} else {
				dateYearInput.classList.remove('ontario-input__error');
				dateYearInput.setAttribute('aria-invalid', false);
				dateYearInput.setAttribute('aria-describedBy', hintTextId);
			}
		}

		dateInputs.map(input => {
			input.addEventListener('blur', () => {
				setTimeout(() => validateBirthdate(dateDayInput, dateMonthInput, dateYearInput), 100);
			});

			input.addEventListener('input', () => {
				if (!isBirthdateTyped) {
					isBirthdateTyped = true;
				}

				if (isBirthdateInvalid) {
					errorContainer.classList.add('ontario-error__hidden');
					dateDayInput.classList.remove('ontario-input__error');
					dateMonthInput.classList.remove('ontario-input__error');
					dateYearInput.classList.remove('ontario-input__error');
				}
			});
		});
	}

	window.addEventListener('DOMContentLoaded', () => {
		handleOdometerReadingValidation();
		handleLicenseNumberValidation();
		handleEmailValidation();
		handlePinValidation();
		handleJobDescriptionValidation();
		handleBirthdateValidation();
	});
})();
