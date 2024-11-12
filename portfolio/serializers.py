# portfolio/serializers.py
from rest_framework import serializers
from .models import Portfolio, Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'link']

class PortfolioSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)

    class Meta:
        model = Portfolio
        fields = ['user', 'name', 'bio', 'projects']
        depth = 1

    def create(self, validated_data):
        projects_data = validated_data.pop('projects')
        portfolio = Portfolio.objects.create(**validated_data)
        for project_data in projects_data:
            Project.objects.create(portfolio=portfolio, **project_data)
        return portfolio

    def update(self, instance, validated_data):
        projects_data = validated_data.pop('projects')
        instance.name = validated_data.get('name', instance.name)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()

        # 프로젝트 업데이트
        for project_data in projects_data:
            project_id = project_data.get('id')
            if project_id:
                project = Project.objects.get(id=project_id, portfolio=instance)
                project.title = project_data.get('title', project.title)
                project.description = project_data.get('description', project.description)
                project.link = project_data.get('link', project.link)
                project.save()
            else:
                Project.objects.create(portfolio=instance, **project_data)
        return instance
