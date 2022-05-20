XSS_BOMB VIM PLUGGIN
====================
*vim frontend to edit payloads with ease*

![xss_bomb](https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/logo.png)

This vim plugin is used to work with XSS Bomb and allow you to edit the payload
section in a more appropriate environment.

## Installation
To install it is needed to use [vim-plug](https://github.com/junegunn/vim-plug).
Inside of you vimrc in the vim-plug section add the following:

```
call plug#begin('~/.vim/plugged')

Plug 'p4p1/xss_bomb',{'rtp': 'vim'}

call plug#end()
```

You will then need to add the following two lines inside of your vimrc:
```
" Edit this variable to your instance of xss bomb
let g:xss_bomb_url = "https:/leosmith.xyz:8000"
" To start the xss_bomb main function just run vim with a file named xss
autocmd BufNewFile xss call xss_bomb#main()
```

## Usage
If you followed the previous instruction you should be able to access the uploaded
code with the following command:

```
$ vim xss
```

You should then be prompted by vim to log in with your XSS Bomb account.


## Note
You cannot register to XSS Bomb through vim.
