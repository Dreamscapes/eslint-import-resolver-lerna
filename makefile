# Defining shell is necessary in order to modify PATH
SHELL := bash
export PATH := node_modules/.bin/:$(PATH)
export NODE_OPTIONS := --trace-deprecation --trace-warnings

# Modify these variables in local.mk to add flags to the commands, ie.
# testflags += --reporter nyan
# Now mocha will be invoked with the extra flag and will show a nice nyan cat as progress bar 🎉
lintflags :=
installflags :=

# Do this when make is invoked without targets
all: install

# Note about `touch`:
# npm does not update the timestamp of the node_modules folder itself. This confuses Make as it
# thinks node_modules is not up to date and tries to constantly install pacakges. Touching
# node_modules after installation fixes that.
node_modules: package.json
	npm install $(installflags) && touch node_modules

install: node_modules

lint: install force
	eslint --report-unused-disable-directives $(lintflags) .
	remark --quiet .

clean: force
	rm -rf {.nyc_output,coverage,docs}

pristine: clean force
	rm -rf node_modules

.PHONY: force

-include local.mk
