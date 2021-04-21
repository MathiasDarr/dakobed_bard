FROM ubuntu:20.04
ENV DEBIAN_FRONTEND noninteractive

# build-essential
RUN apt-get -qq -y update \
    && apt-get -qq -y install locales \
    ca-certificates postgresql-client curl \
    python3-pip python3-icu python3-psycopg2 \
    python3-lxml python3-crypto \
    && apt-get -qq -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8


# Install Python dependencies
RUN pip3 install --no-cache-dir -q -U pip setuptools six

# Install bard
COPY . /bard
WORKDIR /bard
ENV PYTHONPATH /bard
RUN pip install -q -e /bard


COPY requirements.txt /tmp/
RUN pip3 install --no-cache-dir -q -r /tmp/requirements.txt
