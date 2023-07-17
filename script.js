function testLength(value, length) {
	return value.length == length;
}

function testNumber(value) {
	return !isNaN(value);
}

function validateControl(control, name, length) {
	if (!testLength(control.value, length)) {
		let errorMsg = document.getElementById(name + "Error");
		errorMsg.removeAttribute("hidden");
		return false;
	}
	if (!testNumber(control.value)) {
		let errorMsg = document.getElementById(name + "Error");
		errorMsg.removeAttribute("hidden");
		return false;
	}
	let errorMsg = document.getElementById(name + "Error");
	errorMsg.setAttribute("hidden", "");
	return true;
}

function validateCreditCard(value) {
	let cardCompany = [3, 6, 5, 4]
	
	value = value.replaceAll(" ", "");
	
	//test if number
	if (!testNumber(value)) {
		let errorMsg = document.getElementById("cNumberError");
		errorMsg.removeAttribute("hidden");
		return false;
	}


	//test if valid company number
	if (!(cardCompany.includes(parseInt(value[0])))) {
		let errorMsg = document.getElementById("cNumberError");
		errorMsg.removeAttribute("hidden");
		return false;
	}
	
	//test length
	if(value[0] == 3) {
		if (!testLength(value, 15)) {
			let errorMsg = document.getElementById("cNumberError");
			errorMsg.removeAttribute("hidden");
			return false;
		}
	} else {
		if (!testLength(value, 16)) {
			let errorMsg = document.getElementById("cNumberError");
			errorMsg.removeAttribute("hidden");
			return false;
		}
	}
	
	let errorMsg = document.getElementById("cNumberError");
	errorMsg.setAttribute("hidden", "");
	return true;
}

function validateDate(value) {
	let today = function() {
		let td = new Date();
		let year = td.getFullYear();
		let month = (td.getMonth() + 1).toString().padStart(2, '0');
		return `${year}-${month}`;
	};
	
	if (value < today()) {
		let errorMsg = document.getElementById("exDateError");
		errorMsg.removeAttribute("hidden");
		return false;
	}
	
	let errorMsg = document.getElementById("exDateError");
	errorMsg.setAttribute("hidden", "");
	return true;
}

function validateEmail(value){
	let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	if (!emailRegExp.test(value)) {
		let errorMsg = document.getElementById("eAddressError");
		errorMsg.removeAttribute("hidden");
		return false;
	}
	
	let errorMsg = document.getElementById("eAddressError");
	errorMsg.setAttribute("hidden", "");
	return true;
}

function validateState(value) {
	if (value === "SS") {
		let errorMsg = document.getElementById("stateError");
		errorMsg.removeAttribute("hidden");
		return false;
	}
  
  let errorMsg = document.getElementById("stateError");
  errorMsg.setAttribute("hidden", "");
  return true;
}

function validateForm() {
	//all validations
	event.preventDefault();
	
	validateCreditCard(document.getElementById("cNumber").value)
	validateControl(document.getElementById("cv"), "cv", 3)
	validateEmail(document.getElementById("eAddress").value)
	validateDate(document.getElementById("exDate").value)
	validateState(document.getElementById("state").value)
	validateControl(document.getElementById("zip"), "zip", 5)
	
	if (validateCreditCard(document.getElementById("cNumber").value)
	&& validateControl(document.getElementById("cv"), "cv", 3)
	&& validateEmail(document.getElementById("eAddress").value)
	&& validateDate(document.getElementById("exDate").value)
	&& validateState(document.getElementById("state").value)
	&& validateControl(document.getElementById("zip"), "zip", 5)) {
		let msg = document.getElementById("paymentSubmitted");
		msg.removeAttribute("hidden");
	} else {
		let msg = document.getElementById("paymentSubmitted");
		msg.setAttribute("hidden" ,"");
	}
	
	return false;
}
