## It may be helpful to set UNAME=root GNAME=root if running locally as the container runs as jenkins by default.
## --- 
#
#
# Sets user, this is helpful to run locally as you most likely do not have a jenkins user on your machine.
UNAME ?= jenkins
# Sets group, this is helpful to run locally as you most likely do not have a jenkins group on your machine.
GNAME ?= jenkins
# Sets default audit level for security scans
AUDIT_LEVEL?= critical
# Sets Branch
BRANCH ?= notmaster
# Sets default env 
ENV ?= dev

.PHONY: help
help : Makefile
	@sed -n 's/^##//p' $<

## build:		builds developer-portal container environment
.PHONY: build
build:
	docker build -t devportal .

## test:		runs all tests
.PHONY: test 
test: security unit lint accessibility e2e visual

## security:	runs npm audit at AUDIT_LEVEL
.PHONY: security
security:
ifeq ($(BRANCH), master)
	docker run --rm -i --name security devportal /bin/bash -c "npm config set audit-level ${AUDIT_LEVEL} && npm audit"
else	
	docker run --rm -i --name security devportal /bin/bash -c "npm config set audit-level ${AUDIT_LEVEL} && npm audit" \
	|| exit 0
endif


## unit:		runs unit test script 
.PHONY: unit
unit:
	@echo "Running unit tests"
	docker run -i --name unit --user ${UNAME}:${GNAME} devportal npm run-script test:unit:ci \
	|| { docker cp unit:/application/test-report.xml reports/.; \
	docker container rm unit; \
	exit 1; }
	docker container rm unit
	 
## lint:		runs linting 
.PHONY: lint
lint:
	@echo "Running lint tests"
	docker run -i --name lint --user ${UNAME}:${GNAME} devportal npm run-script lint:ci \
	|| { docker cp lint:/application/lint-results.xml reports/.; \
	docker container rm lint; \
	exit 1; }
	docker container rm lint

## visual:	runs visual regression tests 
.PHONY: visual
visual:
	@echo "Running visual tests"
	docker run -i --name visual --user ${UNAME}:${GNAME} devportal npm run test:visual \
	|| { docker cp visual:/application/test/image_snapshots/diff_output/* reports/.; \
	docker container rm visual; \
	exit 1; }
	docker container rm visual
	 
## e2e:		runs end to end tests
.PHONY: e2e
e2e:
	@echo "Running e2e tests"
	docker run -i --name e2e --user ${UNAME}:${GNAME} devportal npm run-script test:e2e:ci \
	|| { docker cp e2e:/application/test-report.xml reports/.; \
	docker container rm e2e; \
	exit 1; }
	docker container rm e2e

## accessibility:	runs accessibility tests
.PHONY: accessibility
accessibility:
	@echo "Running accessibility tests"
	docker run -i --name accessibility --user ${UNAME}:${GNAME} devportal npm run-script test:accessibility:ci \
	|| { docker cp accessibility:/application/test-report.xml reports/.; \
	docker container rm accessibility; \
	exit 1; }
	docker container rm accessibility

## build_app:	builds the developer-portal website, and copies to host
.PHONY: build_app 
build_app:
	docker run -i --name build_app \
		--env NODE_ENV=production \
		--env BUILD_ENV=${ENV} \
		--user ${UNAME}:${GNAME} \
		devportal npm run-script build ${ENV} \
		--no-cache
	docker cp build_app:/application/build/${ENV} .
	docker container rm build_app

## archive:	builds tar ball of local build
.PHONY: archive 
archive:
	tar -C ${ENV} -cf ${ENV}.tar.bz2 .	
