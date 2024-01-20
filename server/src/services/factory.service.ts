import { Model, isValidObjectId } from 'mongoose';
import AppError from '../utils/appErrorClass';
import { BAD_REQUEST } from '../utils/constants';
import { checkIfDocExists } from '../utils/helpers';
import { DocumentType } from '@typegoose/typegoose';

type GetOneFactory<T> = {
	Model: Model<T>;
	id: string;
	populate?: string;
	select?: string;
};

type GetAllFactory<T> = Omit<GetOneFactory<T>, 'id'>;

type DeleteOneFactory<T> = Omit<GetOneFactory<T>, 'populate' | 'select'>;

type UpdateOneFactory<T> = {
	Model: Model<T>;
	id: string;
	payload: any;
};

type CreateOneFactory<T> = Omit<UpdateOneFactory<T>, 'id'>;

export const getOne = async <T>({ Model, id, populate, select }: GetOneFactory<T>): Promise<DocumentType<T>> => {
	if (!isValidObjectId(id)) {
		throw new AppError(`${id} is not a valid object id`, BAD_REQUEST);
	}

	let doc;

	doc = await Model.findById(id)
		.populate(populate ?? '')
		.select(select ?? '');

	const { errorInstance, doc: existDoc } = checkIfDocExists<T, typeof doc>({ Model, doc, id });

	if (!existDoc) {
		throw errorInstance;
	}

	return doc as DocumentType<T>;
};

export const getAll = async <T>({ Model, populate }: GetAllFactory<T>) => {
	const docs = await Model.find().populate(populate ?? '');

	return docs;
};

export const createOne = async <T>({ Model, payload }: CreateOneFactory<T>) => {
	const createdDoc = await Model.create(payload);

	return createdDoc;
};

export const updateOne = async <T>({ Model, id, payload }: UpdateOneFactory<T>) => {
	if (!isValidObjectId(id)) {
		throw new AppError(`${id} is not a valid object id`, BAD_REQUEST);
	}

	const docToUpdate = await Model.findOne({ _id: id });

	const { errorInstance, doc } = checkIfDocExists<T, typeof docToUpdate>({ Model, id, doc: docToUpdate });

	if (!doc) {
		throw errorInstance;
	}

	const updatedDoc = await doc.updateOne(payload);

	return updatedDoc;
};

export const deleteOne = async <T>({ Model, id }: DeleteOneFactory<T>) => {
	if (!isValidObjectId(id)) {
		throw new AppError(`${id} is not a valid object id`, BAD_REQUEST);
	}

	const deletedDoc = await Model.deleteOne({ _id: id });
	const deletedCount = deletedDoc.deletedCount;

	const { errorInstance, doc } = checkIfDocExists<T, typeof deletedCount>({ Model, doc: deletedCount, id });

	if (!doc) {
		throw errorInstance;
	}

	return deletedDoc;
};
