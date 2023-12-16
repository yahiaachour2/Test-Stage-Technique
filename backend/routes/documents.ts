import {
  Request,
  Response,
  Router,
} from 'express';
import {
  v4 as uuidv4,
  validate,
} from 'uuid';

import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  updateDocument,
} from '../services/docService';

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!validate(id)) {
    return res.status(400).json("id is not valid");
  }

  const document = await getDocument(req.params.id);

  if (!document) {
    return res.status(404).json("Document not found");
  }

  res.status(200).send(document);
});

// (getAll | list) with pagination
router.get("/", async (req: Request, res: Response) => {
  const documents = await getDocuments();

  res.status(200).send(documents);
});

// createone
router.post("/", async (req: Request, res: Response) => {
  const { name, type, description } = req.body;

  const id = uuidv4();
  const doc = await createDocument({ id, name, type, description });

  res.status(201).json(doc);
});

// updateOne
router.put("/:id", async (req: Request, res: Response) => {
  const { name, type, description } = req.body;
  const id = req.params.id;

  if (!validate(id)) {
    return res.status(400).json("id is not valid");
  }

  const document = await getDocument(req.params.id);

  if (!document) {
    return res.status(404).json("Document not found");
  }

  const doc = await updateDocument({ id, name, type, description });
  return res.status(200).send(doc);
});

// deleteOne
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!validate(id)) {
    return res.status(400).json("id is not valid");
  }

  const document = await getDocument(id);
  if (!document) {
    return res.status(404).json("Document not found");
  }

  const deletedDocument = await deleteDocument(id);

  return res.status(200).json(deletedDocument);
});

export default router;
