# Defining shell is necessary in order to modify PATH
SHELL := sh
export PATH := node_modules/.bin/:$(PATH)
export NODE_OPTIONS := --trace-deprecation

# On CI servers, use the `npm ci` installer to avoid introducing changes to the package-lock.json
# On developer machines, prefer the generally more flexible `npm install`. 💪
NPM_I := $(if $(CI), ci, install)

# Modify these variables in local.mk to add flags to the commands, ie.
# FLAGS_MOCHA += --reporter nyan
# Now mocha will be invoked with the extra flag and will show a nice nyan cat as progress bar 🎉
FLAGS_MOCHA :=
FLAGS_NPM :=
FLAGS_TSC :=
FLAGS_ESLINT := --ext js,ts --cache --cache-location .buildstate/.eslintcache

SRCFILES = $(shell utils/make/projectfiles.sh ts)
DSTFILES = $(patsubst %.ts, %.js, $(SRCFILES))
GITFILES = $(patsubst utils/githooks/%, .git/hooks/%, $(wildcard utils/githooks/*))
TSTFILES = "{src,test}/**/*.test.js"

# Do this when make is invoked without targets
all: compile $(GITFILES)


# GENERIC TARGETS

.buildstate:
	mkdir .buildstate

.buildstate/compile.make: node_modules tsconfig.json $(SRCFILES) .buildstate
	tsc $(FLAGS_TSC) && touch $@

node_modules: package.json
	npm $(NPM_I) $(FLAGS_NPM) && touch $@

# Default target for all possible git hooks
.git/hooks/%: utils/githooks/%
	cp $< $@

coverage/lcov.info: compile
	nyc mocha $(FLAGS_MOCHA) $(TSTFILES)


# TASK DEFINITIONS

compile: .buildstate/compile.make

coverage: coverage/lcov.info

install: node_modules $(GITFILES)

lint: force install
	eslint $(FLAGS_ESLINT) .
	remark --quiet .

test: force compile
	mocha $(FLAGS_MOCHA) $(TSTFILES)

inspect: force compile
	mocha --inspect --inspect-brk $(FLAGS_MOCHA) $(TSTFILES)

watch/compile: force install
	tsc $(FLAGS_TSC) --watch

watch/test: force install
	mocha $(FLAGS_MOCHA) --watch "{src,test}/**/*.js" $(TSTFILES)

clean:
	rm -rf .nyc_output coverage docs .eslintcache
	find . -not -path '*/node_modules/*' -name '*.log' -print -delete

clean/compile: clean
	rm -rf .buildstate
	git clean -Xf src test

clean/all: clean/compile
	rm -rf node_modules

release/latest:
	utils/make/release.sh release/latest

release/next:
	utils/make/release.sh release/next

.PHONY: force

-include local.mk
