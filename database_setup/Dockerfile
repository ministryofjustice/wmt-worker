FROM mcr.microsoft.com/mssql/server:2019-CU11-ubuntu-20.04

ENV SA_PASSWORD yourStrong(!)Password
ENV ACCEPT_EULA Y

EXPOSE 1433

COPY --chown=mssql:mssql entrypoint.sh /

COPY --chown=mssql:mssql ddl/* /ddl/

COPY --chown=mssql:mssql run-initialization.sh /run-initialization.sh

RUN chmod +x /run-initialization.sh
CMD /bin/bash ./entrypoint.sh