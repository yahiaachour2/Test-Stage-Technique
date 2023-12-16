import {
  Model,
  Sequelize,
  UUID,
} from 'sequelize';

export interface DocumentAttributes {
  id: string;
  name?: string | null;
  type?: string | null;
  description?: string | null;
}

interface DocumentInstance extends Model<DocumentAttributes>, DocumentAttributes {}

const DocumentModel = (sequelize: Sequelize, DataTypes: any) => {
  const DocumentModel = sequelize.define<DocumentInstance, DocumentAttributes>(
    'document',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUID,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
    }
  );

  return DocumentModel;
};

export default DocumentModel;
