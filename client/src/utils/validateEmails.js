const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
	const invalidEmails = emails
		.split(",")
		.map(email => email.trim())
		.filter(email => !re.test(email));

	if (invalidEmails.length) {
		if (invalidEmails[invalidEmails.length - 1] == "")
			return "You cannot have trailing commas in your email list";
		return `These emails are invalid ${invalidEmails}`;
	}

	return null;
};
