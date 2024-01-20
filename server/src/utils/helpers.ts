import { Model } from 'mongoose';
import AppError from './appErrorClass';
import { NOT_FOUND } from './constants';

type CheckDocType<T, Y> = {
	Model: Model<T>;
	doc: Y;
	id: string;
};

export const checkIfDocExists = <T, Y>({ Model, doc, id }: CheckDocType<T, Y>) => {
	if (!doc) {
		const collectionName = Model.collection.collectionName;
		const modelName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1, -1);

		const errorInstance = new AppError(`${modelName} with id ${id} not found`, NOT_FOUND);

		return { errorInstance };
	}

	return { doc };
};
