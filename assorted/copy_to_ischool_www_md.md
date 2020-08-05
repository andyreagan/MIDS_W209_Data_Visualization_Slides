## Using ischool.berkeley.edu to host web pages

To copy files to the ISchool www server, you can use the following command-line techniques to copy the files to the remote server. The async content mentions a couple gui's for mac & windows (Cyberduk & Filezilla). Personally, on Mac, I'd use the commandline `scp`; on Windows, I prefer WinSCP.  (Note: the async says "ftp", but technically, these are scp & sftp tools.)

The following command-line solutions will however work on any platform, assuming you have:

* Mac -- terminal (bash);
* Windows -- cygwin (most easily installed via babun) (or: the new Windows 10 bash? I don't know if it has ssh/scp/rsync);
* Linux/BSD/Unix -- just install ssh/rsync (if it's not already).


## Connecting to the remote server

Using an scp/sftp client, connect to the ISchool server via the following credentials:

* host: ischool.berkeley.edu
* username: your ISchool username
* password: your ISchool passwordport: 22

Once connected,

* go into the folder called "public_html"
* upload all files/folders into "public_html" (i.e., public_html/index.html)
* your web page is now publicly visible at http://people.ischool.berkeley.edu/~username/

    + be sure to include the "~" before your username:
    + if your email is first.lastname@ischool.berkeley.edu, your "username" is "first.lastname"
    + the password is not your CalNet ID; rather, it's the ISchool intranet login: http://www.ischool.berkeley.edu/intranet

### Login without passwords using private/public keys

Create a key-pair:

`
$ ssh-keygen -t rsa -C "me@ischool"
...etc... use blank pass-phrase for convenience, or use pass-phrase for better securuity
`
Notes:

* use blank pass-phrase to avoid typing any password
   + it's safer to use a pass-phrase
* save the file with a meaningful name, e.g `~/.ssh/id_rsa.ischool`
* the "-C" option is just a comment for your reference
* two files are created: id_rsa.{foo} and id.rsa.{foo}.pub -- share the "pub" with remote,
    + but keep the other file (the private key) on your local system, and keep it protected & private!
	+ If somone gets your private key, it's like the key to your house is hanging on your front door.
	+ If you have a passphrase, at least they'd still have to guess this to use the key.

After generating the private/public key-pair, copy the public key to the remote ischool server; it goes into `~/.ssh/authorized_keys`. There's a command that does this for you, or you can do it manually (note: file permissions and format matters).

Both these "-o {options}" may not be necessary, but I had to use them to get the command to work. (Remote usernames are a little weird, being "firstname.lastname", and I get another error due to having too many keys in my `.ssh` directory, so I force password authentication this one time). Obviously change this to use your username and filenames:
`
# option "-i {public_key_file}" is the name of the public key created in the previous step.
# make sure to use the ".pub" file, not the private key.

$ ssh-copy-id  -o 'User=michael.nielsen' -o 'IdentitiesOnly=yes'  -i id_rsa.ischool.pub ischool.berkeley.edu
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "id_rsa.ischool.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
michael.nielsen@ischool.berkeley.edu's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -o 'User=michael.nielsen' -o 'IdentitiesOnly=yes' 'ischool.berkeley.edu'"
and check to make sure that only the key(s) you wanted were added.
`

If you have issues logging in using your new key-pair, you may need to configure the ssh connection parameters in your (local) `~/.ssh/config` file (note: this is kind of specific to linux! (sorry)). 

Also, you'll need this entry if you named your private key anything other than the default of `~/.ssh/id_rsa` (since I have many private keys, I don't/can't use the default at all).

`
# showing excerpt from my ssh config between "..."
$ vim ~/.ssh/config
Host ischool
    Hostname ischool.berkeley.edu
    User michael.nielsen
    IdentityFile ~/.ssh/id_rsa.ischool
`

## Copying files to the remote server

There are three main ways to copy files from "local" (your pc) to "remote" (the ischool student server):

* sftp (this is "secure" ftp): an interactive session, where you are logged into the remote, and put files there one at a time.
    + On mac/linux (or cygwin/babun on windows), this is (typically) command-line (CLI); there are GUI tools available too.
	+ On Windows, I'd recommend WinSCP (or cygwin/babun for CLI)
	+ If using a GUI, you can't really tell the difference between scp and sftp
* scp (secure copy): run one command to copy either one file or many files or a directory (recusively) to the remote
    + note: you can also copy remote files to local, just by reversing the arguments
* rsync: a powerful remote/local file synchronization tool, used to keep whole directory heirachies in sync, efficiently, by only copying what has changed. (Great for mirrors or backups.)

### Using sftp (secure ftp)

```
$ sftp michael.nielsen@ischool.berkeley.edu
The authenticity of host 'ischool.berkeley.edu (128.32.78.26)' can't be established.
ECDSA key fingerprint is SHA256:MpmnZMEKbNegh3EsTO8hOjTa8Krl5pfOqVIo6uT6As0.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'ischool.berkeley.edu,128.32.78.26' (ECDSA) to the list of known hosts.
michael.nielsen@ischool.berkeley.edu's password:
Connected to ischool.berkeley.edu.
sftp> dir
mydesk           mydocs           mydownloads      public_html      public_html.ssl  xerox_scan

sftp> ls -l
drwx------    2 michael.nielsen michael.nielsen     4096 Dec  1  2015 mydesk
drwx------    2 michael.nielsen michael.nielsen     4096 Dec  1  2015 mydocs
drwx------    2 michael.nielsen michael.nielsen     4096 Dec  1  2015 mydownloads
drwxr-xr-x    2 michael.nielsen michael.nielsen     4096 Dec  1  2015 public_html
drwxr-xr-x    2 michael.nielsen michael.nielsen     4096 Dec  1  2015 public_html.ssl
drwx------    2 michael.nielsen michael.nielsen     4096 Dec  1  2015 xerox_scan

sftp> cd public_html

sftp> dir

sftp> put index.html
Uploading index.html to /home/michael.nielsen/public_html/index.html
index.html                100%   83     0.1KB/s   00:00

sftp> bye
```


### Using scp (secure copy)

```
$ scp index.html michael.nielsen@ischool.berkeley.edu:~/public_html/
michael.nielsen@ischool.berkeley.edu's password:
index.html                 100%   81     0.1KB/s   00:00
```

Notes on scp:

* scp a whole directory, recursively:  `scp -r public_html  michael.nielsen@ischool.berkeley.edu:~/`
* if you get an error `Too many authentication failures`, try the following option: `scp -o 'IdentitiesOnly=yes' ...`


### Using rsync

```
$ rsync -avzhe ssh public_html  michael.nielsen@ischool.berkeley.edu:~/
michael.nielsen@ischool.berkeley.edu's password:
sending incremental file list
public_html/
public_html/index.html
public_html/index.html~
public_html/index2.html
public_html/index2.html~

sent 607 bytes  received 102 bytes  109.08 bytes/sec
total size is 328  speedup is 0.46
```

Notes on rsync:

* don't forget the target directory (the ":" and directory), otherwise, a local directory named "username@host" is created.
* to delete files on the target that no longer exist locally, use the `--delete` option.
* to ignore certain files (e.g., `foo.html~`), use the `--exclude="*~"` option