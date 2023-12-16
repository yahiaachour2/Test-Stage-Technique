import db from '../models';
import { DocumentAttributes } from '../models/document';

const DocumentModel = db.documents

export const getDocuments = async () => {
  try {
    const documents = await DocumentModel.findAll();
    return documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getDocument = async (documentId: string) => {
  try {
    const document = await DocumentModel.findByPk(documentId);
    return document
  } catch (error) {
    console.error(error);
    return {};
  }
};


export const createDocument = async (documentInput: DocumentAttributes) => {
  try {
    const document = await DocumentModel.create(documentInput);
    return document
  } catch (error) {
    console.error(error);
    return {};
  }
};
export const deleteDocument = async (id: string) => {
    try {
      await DocumentModel.destroy({ where :{ id }})
      return 'document deleted successfully !'
    } catch (error) {
      console.error(error);
      return {};
    }
  };
  export const updateDocument = async (documentInput: DocumentAttributes) => {
    const { id, name, type, description, } = documentInput
    try {

      await DocumentModel.update({ name, type, description }, {
        where: {
          id,
        },
      })
      return 'document update successfully !'
    } catch (error) {
      console.error(error);
      return {};
    }
  };