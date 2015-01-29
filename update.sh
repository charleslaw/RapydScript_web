#!/bin/sh
git clone https://github.com/atsepkov/RapydScript.git
cp RapydScript/lib/*.js lib/
cp -rf RapydScript/src/ .
rm -rf RapydScript
git apply 0001-attempt-at-getting-latest-rapydscript-to-work.patch
git apply temporary_index_counter_patch.patch

