"""empty message

Revision ID: bafb6c637f1b
Revises: None
Create Date: 2021-05-21 21:18:03.472025

"""

# revision identifiers, used by Alembic.
revision = 'bafb6c637f1b'
down_revision = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('collection',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('deleted_at', sa.DateTime(), nullable=True),
    sa.Column('label', sa.Unicode(), nullable=True),
    sa.Column('foreign_id', sa.Unicode(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('foreign_id')
    )
    op.create_table('entity_set',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('deleted_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.String(length=128), nullable=False),
    sa.Column('label', sa.Unicode(), nullable=True),
    sa.Column('type', sa.String(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_entity_set_type'), 'entity_set', ['type'], unique=False)
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('deleted_at', sa.DateTime(), nullable=True),
    sa.Column('foreign_id', sa.Unicode(length=2048), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=False),
    sa.Column('email', sa.Unicode(), nullable=True),
    sa.Column('type', sa.Enum('user', 'group', 'system', name='role_type'), nullable=False),
    sa.Column('api_key', sa.Unicode(), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('is_blocked', sa.Boolean(), nullable=False),
    sa.Column('password_digest', sa.Unicode(), nullable=True),
    sa.Column('reset_token', sa.Unicode(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('foreign_id')
    )
    op.create_table('document',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['collection_id'], ['collection.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_document_collection_id'), 'document', ['collection_id'], unique=False)
    op.create_table('entity',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.String(length=128), nullable=False),
    sa.Column('schema', sa.String(length=255), nullable=True),
    sa.Column('data', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.Column('collection_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['collection_id'], ['collection.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_entity_collection_id'), 'entity', ['collection_id'], unique=False)
    op.create_index(op.f('ix_entity_schema'), 'entity', ['schema'], unique=False)
    op.create_table('permission',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.Column('read', sa.Boolean(), nullable=True),
    sa.Column('write', sa.Boolean(), nullable=True),
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_permission_role_id'), 'permission', ['role_id'], unique=False)
    op.create_table('role_membership',
    sa.Column('group_id', sa.Integer(), nullable=True),
    sa.Column('member_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['group_id'], ['role.id'], ),
    sa.ForeignKeyConstraint(['member_id'], ['role.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('role_membership')
    op.drop_index(op.f('ix_permission_role_id'), table_name='permission')
    op.drop_table('permission')
    op.drop_index(op.f('ix_entity_schema'), table_name='entity')
    op.drop_index(op.f('ix_entity_collection_id'), table_name='entity')
    op.drop_table('entity')
    op.drop_index(op.f('ix_document_collection_id'), table_name='document')
    op.drop_table('document')
    op.drop_table('role')
    op.drop_index(op.f('ix_entity_set_type'), table_name='entity_set')
    op.drop_table('entity_set')
    op.drop_table('collection')
    # ### end Alembic commands ###
