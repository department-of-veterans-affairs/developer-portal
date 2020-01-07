#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

function list_bad_files {
  oldref="$1"
  newref="$2"
  filename_pattern="$3"
  maxbytes="$4"
  git rev-list --objects "${oldref}..${newref}" | \
    grep -E "$filename_pattern" | \
      git cat-file --batch-check='%(objectname) %(objecttype) %(objectsize) %(rest)' | \
	(
	  while read -r objectname objecttype objectsize path; do
	    if [[ "$objecttype" == "blob" ]] && [[ "$objectsize" -gt "$maxbytes" ]]; then
	      echo "$path"
	    fi
	  done
	)
  return 0
}

legacy_snapshots=$(list_bad_files "$1" "$2" "src/__image_snapshots__" 0)
if [[ -n "$legacy_snapshots" ]]; then
  echo ""
  echo "-----------------------------------------------------------------------------"
  echo "Please do not commit images to src/__image_snapshots__. We've stopped"
  echo "commiting visual regression tests directly to the repository. We now use"
  echo "git-lfs to store pointers to externally-managed files in test/image_snapshots."
  echo "Please see docs/development.md for more info about git-lfs."
  echo "-----------------------------------------------------------------------------"
  echo ""
  echo "$legacy_snapshots"
  exit 1
fi

raw_snapshot_files=$(list_bad_files "$1" "$2" "test/image_snapshots" 140)
if [[ -n "$raw_snapshot_files" ]]; then
  echo ""
  echo "-----------------------------------------------------------------------------"
  echo "Please do not commit raw images to test/image_snapshots. The files in"
  echo "this directory should be git-lfs pointers. This allows us to prevent the"
  echo "repository from bloating over time. Please see docs/development.md for more"
  echo "info about git-lfs."
  echo "-----------------------------------------------------------------------------"
  echo ""
  echo "$raw_snapshot_files"
  exit 1
fi

exit 0
