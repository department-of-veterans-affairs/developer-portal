## variables:
# 	
## 
##
##
##
##
#

# Sets user
UNAME ?= jenkins
# Sets group
GNAME ?= jenkins
# Sets defaul audit level
AUDIT_LEVEL?= critical
# Sets Branch running in
BRANCH ?= notmaster
# Sets default tag
TAG ?= dev 
# Shorten full repo path 
REPOSITORY = $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com

.PHONY: help
help : Makefile
	@sed -n 's/^##//p' $<

## build:	builds testing environment
.PHONY: build
build:
	docker build -t devportal .

## test:	runs all tests
.PHONY: test 
test: security unit lint accessibility e2e visual

## security:	runs `npm audit --audit-level critical`
.PHONY: security
security: build
ifeq ($(BRANCH), master)
	docker run --rm -i --name security devportal /bin/bash -c "npm config set audit-level ${AUDIT_LEVEL} && npm audit"
else	
	docker run --rm -i --name security devportal /bin/bash -c "npm config set audit-level ${AUDIT_LEVEL} && npm audit" \
	|| exit 0
endif


## unit:	runs unit test script 
.PHONY: unit
unit: build
	docker run -i --name unit --user ${UNAME}:${GNAME} devportal npm run-script test:unit:ci \
	|| { docker cp unit:/application/test-report.xml reports/.; \
	docker container rm unit; \
	exit 1; }
	docker container rm unit
	 
.PHONY: lint
lint: build
	docker run -i --name lint --user ${UNAME}:${GNAME} devportal npm run-script lint:ci \
	|| { docker cp unit:/application/lint-results.xml reports/.; \
	docker container rm lint; \
	exit 1; }
	docker container rm lint

.PHONY: visual
visual: build
	docker run -i --name visual --user ${UNAME}:${GNAME} devportal npm run test:visual \
	|| { docker cp unit:/application/test/image_snapshots/diff_output/* reports/.; \
	docker container rm visual; \
	FAIL_VISUAL=1; \
	exit 1; }
	docker container rm visual
	 
.PHONY: e2e
e2e: build
	docker run -i --name e2e --user ${UNAME}:${GNAME} devportal npm run test:e2e:ci \
	|| { docker cp unit:/application/test-report.xml reports/.; \
	docker container rm e2e; \
	exit 1; }
	docker container rm e2e

.PHONY: accessibility
accessibility: build
	docker run -i --name accessibility --user ${UNAME}:${GNAME} devportal npm run test:accessibility:ci \
	|| { docker cp unit:/application/test-report.xml reports/.; \
	docker container rm accessibility; \
	exit 1; }
	docker container rm accessibility

## clean:	Removes a local image
.PHONY: clean
clean:

## Tdod build; run; ? 
