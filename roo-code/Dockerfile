FROM mcr.microsoft.com/devcontainers/python:3.11

ENV WORKSPACE_DIR "/workspace"


RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip install -r ./requirements.txt
