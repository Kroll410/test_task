from django.db.models import ForeignKey


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
                setattr(record, field.name, data[field.name])
        record.save()
    except:
        return False
    return True
