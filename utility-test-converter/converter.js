
// Confirmation (or Failure) Message
const confirmation = (message) => {
	document.getElementById("success").innerHTML = message;
};

/* eslint-disable no-unused-vars*/
const updateCheckbox = (e) => {
	const { checked } = document.getElementById('conversionTypeCheckbox');
	const label = document.getElementById('checkboxLabel');
	const text = checked
		? 'IIFE (test is multiline condition with setup variables)'
		: 'Simple return statement (test is one-line condition)';
	label.innerHTML = `<code>${text}</code>`;
}

// Clear confirmation message on change
const handleChange = () => confirmation('');

// Converter
const convert = () => {
	const testField = document.getElementById('test');
	const messageField = document.getElementById('message');

	const { value: test } = testField;
	const { value: message } = messageField;
	
	if (!test) {
		confirmation("No Test Statement!");
		return;
	}
	
	if (!message) {
		confirmation("No Test Message!");
		return;
	}

	const convertedTest = test
		.replace(/\n/g, ' ') // multi-line string to single-line
		.replace(/\s\s+/g, ' ') // replace multiple spaces
		.replace(/;;+/g, ';'); // replace multiple semicolons
	const convertedMessage = `'message: ${message}'`;

	const { checked } = document.getElementById('conversionTypeCheckbox');
	const testLine = !checked
		? `assert(${convertedTest}, ${convertedMessage});`
		: `assert((function() { ${convertedTest} })(), ${convertedMessage});`;
		
	const result = `"${testLine}",`;

	document.getElementById("dummy").value = result;
	const copyText = document.querySelector("#dummy");
	copyText.select();
	document.execCommand("Copy");
	confirmation("Copied to clipboard!");

	testField.value = '';
	messageField.value = '';
	testField.focus();

}

// Command + Enter runs code
document.addEventListener('keydown', ({ metaKey, which }) => {
	if (metaKey && which === 13) convert();
});