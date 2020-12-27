build: compile copy_templates
	@echo "Build successful"

compile:
	@echo "############ compiling typescript files"
	npm run build

copy_templates:
	@echo "############ copying template files"
	sh scripts/copy-files.sh .template
