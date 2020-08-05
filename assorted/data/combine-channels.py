from os.path import isfile,isdir,join
from os import listdir
import json

if __name__ == "__main__":
    slack = 'UC-Berkeley-School-of-Information-Slack-export-May-5-2017'
    for dir in listdir(slack):
        # print(join(slack,dir))
        if isdir(join(slack,dir)):
            print(join(slack,dir))
            all_json = []
            for file in listdir(join(slack,dir)):
                print(file)
                with open(join(slack,dir,file),"r") as f:
                    day = json.loads(f.read())
                all_json.extend(day)
            with open(join("combined-channels",dir)+".json","w") as f:
                f.write(json.dumps(all_json,indent=4))
                
