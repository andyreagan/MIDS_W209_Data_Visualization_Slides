# let's combine the files for each folder
# mkdir combined-channels
for folder in $(\ls -1 UC-Berkeley-School-of-Information-Slack-export-May-5-2017)
do
    if [ -d UC-Berkeley-School-of-Information-Slack-export-May-5-2017/$folder ];
    then
        cat UC-Berkeley-School-of-Information-Slack-export-May-5-2017/$folder/* > combined-channels/$folder.json
    fi
done
