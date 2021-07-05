from django.utils import timezone

from django.db import models


class Group(models.Model):
    list_display = ('name',)

    name = models.CharField(max_length=50)
    data_analytics = models.BooleanField()
    service_analytics = models.BooleanField()
    voice_analytics = models.BooleanField()
    queue_stats = models.BooleanField()
    voice_stats = models.BooleanField()
    video = models.BooleanField()
    smart_access = models.BooleanField()
    diagrams = models.BooleanField()
    date_added = models.DateTimeField(editable=False, default=timezone.now())
    date_modified = models.DateTimeField(default=timezone.now())

    def save(self, *args, **kwargs):
        if not self.id:
            self.date_added = timezone.now()
        self.date_modified = timezone.now()
        return super(Group, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'

    def _to_js_boolean(self, values):
        return (str(x).lower() for x in values)

    def values(self):
        return {
            field.name: str(val)
            for field, val in zip(self._meta.fields, (self._to_js_boolean([
                self.id,
                self.name,
                self.data_analytics,
                self.service_analytics,
                self.voice_analytics,
                self.queue_stats,
                self.voice_stats,
                self.video,
                self.smart_access,
                self.diagrams,
                self.date_added,
                self.date_modified
            ])))
        }


class User(models.Model):
    list_display = ('email', 'group')

    email = models.CharField(max_length=100)
    group = models.ForeignKey(Group, on_delete=models.PROTECT)
    is_admin = models.BooleanField()
    date_added = models.DateTimeField(editable=False, default=timezone.now())
    date_modified = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return f'{self.email}'

    def save(self, *args, **kwargs):
        if not self.id:
            self.date_added = timezone.now()
        self.date_modified = timezone.now()
        return super(User, self).save(*args, **kwargs)

    def _to_js_boolean(self, values):
        return (str(x).lower() for x in values)

    def values(self):
        return {
            field.name: str(val)
            for field, val in zip(self._meta.fields, (self._to_js_boolean([
                self.id,
                self.email,
                self.group,
                self.is_admin,
                self.date_added,
                self.date_modified
            ])))
        }
