# BDJuno
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/forbole/bdjuno/Tests)](https://github.com/forbole/bdjuno/actions?query=workflow%3ATests)
[![Go Report Card](https://goreportcard.com/badge/github.com/forbole/bdjuno)](https://goreportcard.com/report/github.com/forbole/bdjuno)
![Codecov branch](https://img.shields.io/codecov/c/github/forbole/bdjuno/cosmos/v0.40.x)

BDJuno (shorthand for BigDipper Juno) is the [Juno](https://github.com/forbole/juno) implementation
for [BigDipper](https://github.com/forbole/big-dipper).

It extends the custom Juno behavior by adding different handlers and custom operations to make it easier for BigDipper
showing the data inside the UI.

All the chains' data that are queried from the RPC and gRPC endpoints are stored inside
a [PostgreSQL](https://www.postgresql.org/) database on top of which [GraphQL](https://graphql.org/) APIs can then be
created using [Hasura](https://hasura.io/).

## Localy usage
To know how to setup and run BDJuno, please refer to
the [docs website](https://docs.bigdipper.live/cosmos-based/parser/overview/).

## Docker usage
- docker compose up -d --build
- docker exec -it hasura hasura metadata apply

### Docker postgres service
If you want to access the database through pgAdmin or another DB tool, please ensure that the service port is exposed:

```docker
ports:
    - xxxx:5432 # xxxx => 5432 | 5433 | any
```

### Binary tools
- ./bin/prune.sh -db to clear all and database
- ./bin/build.sh     to build all

## Testing
If you want to test the code, you can do so by running

```shell
$ make test-unit
```
**Note**: Requires [Docker](https://docker.com).

This will:
1. Create a Docker container running a PostgreSQL database.
2. Run all the tests using that database as support.

