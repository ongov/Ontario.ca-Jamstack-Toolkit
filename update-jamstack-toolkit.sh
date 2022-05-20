#!/bin/sh

tag="r0.5.0"

echo "Ontario.ca Jamstack Toolkit - Update to $tag"
echo "This will replace the 'core' and 'vendor' directory contents of the current project; continue (y/N)?"
read answer

if [ "$answer" != "${answer#[Yy]}" ] ;then
    tmp_dir=$(mktemp -d -t jamstack-toolkit-tmp)
    echo "Creating temp directory in $tmp_dir"
    echo "Cloning Ontario.ca Jamstack Toolkit repo at tag/branch $tag to temp directory"
    git clone --depth 1 -b $tag https://git.ontariogovernment.ca/service-integration/application-development-toolkit/jamstack-application-toolkit.git $tmp_dir
    echo "Updating 'core' and 'vendor' to tag/branch $tag"
    cp -r $tmp_dir/src/_data/core/ ./src/_data/core/
    cp -r $tmp_dir/src/_includes/core/ ./src/_includes/core
    cp -r $tmp_dir/src/assets/css/core/ ./src/assets/css/core
    cp -r $tmp_dir/src/assets/vendor/ ./src/assets/vendor
    echo "Removing temp directory in $tmp_dir"
    rm -rf $tmp_dir
else
    echo Exiting
fi