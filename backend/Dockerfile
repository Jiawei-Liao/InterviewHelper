FROM python:3.8

WORKDIR /app

ENV FLASK_APP=getFeedback.py 

RUN pip install -U openai-whisper

RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "getFeedback.py"]