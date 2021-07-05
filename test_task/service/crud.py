from django.db.models import ForeignKey
from .helpers import validate_email


def update_table(data: dict, model):
    try:
        record = model.objects.get(id=data.pop('id'))
        for field in model._meta.fields:
            if field.name == 'id':
                continue
            if isinstance(field, ForeignKey):
                fk_model = field.target_field.model
                setattr(record, field.name, fk_model.objects.get(name=data[field.name].capitalize()))
            else:
                print(field.name)
                if field.name == 'email':
                    validate_email(data[field.name])
                setattr(record, field.name, data[field.name])
        record.save()
    except:
        print('ERROR')
        return False
    return True


def delete_from_table(data: dict, model):
    try:
        row_id = data['id']
        model.objects.filter(id=row_id).delete()
    except:
        return False
    return True


def add_to_table(data: dict, model):
    try:

        for key in [x.name for x in model._meta.fields if x.name != 'id']:
            if key not in data.keys():
                data.update({
                    key: False
                })
        new_record = model(**data)
        new_record.save()
    except:
        return False
    return True