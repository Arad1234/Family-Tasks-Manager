import validator from 'validator';

type Event = string;
type Args = any[];

export const sanitizeData = (packet: [Event, ...Args], next: Function) => {
	const [event, ...args] = packet;
	const [data] = args;
	if (data) {
		// Remove all "$" and "." from the sent data.
		const sanitizedData = validator.blacklist(JSON.stringify(data), '$.');

		// Replacing the "...args" with "JSON.parse(sanitizedData)".
		packet.splice(1, 1, JSON.parse(sanitizedData));
	}
	next();
};
