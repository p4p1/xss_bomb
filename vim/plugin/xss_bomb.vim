" Description:	A plugin to work with XSS Bomb from VIM
" Author:		p4p1 aka Leo Smith

" let s:login_text = [
" 	\ ' Login',
" 	\ '     Username: ',
" 	\ '     Password: ',
" 	\ ]


function UpdateFile(url, token)
	let l:source = join(getline(1, '$'), "\n")
	let l:ret = system("curl --location --request POST '" . a:url . "/user/set_code' --header 'Authorization: Bearer " . a:token . "' --header 'Content-Type: application/json' --data-raw '{\"code\": \"" . l:source . "\"}'")
	echo l:ret
	echo "curl --location --request POST '" . a:url . "/user/set_code' --header 'authorization: Bearder " . a:token . "' --data-raw '{\"code\": \"" . l:source . "\"}'"
	echo test
endfunction

" Main function for the plugin
function XSSBomb()
	let l:username = input("Enter Username: ")
	let l:password = input("Enter Password: ")
	let l:url = g:url

	let l:get_token = system("curl --silent --location --request POST '" . l:url . "/auth/login' --header 'Content-Type: application/json' --data-raw '{ \"username\": \"" . l:username . "\",\"password\": \"" . l:password . "\", \"notificationId\": \"vim\"}'  | jq .token | cut -d '\"' -f2 | tr -d '\n'")
	let l:ref_token = system("curl --silent --location --request GET '" . l:url . "/auth/refresh' --header 'Authorization: Bearer " . l:get_token . "' --data-raw ''  | jq .token | tr -d '\"' | tr -d '\n'")
	if l:get_token == "null" || l:ref_token == "null"
		echo "Error Could not login"
		return
	endif
	let l:code = system("curl --silent --location --request GET '" . l:url . "/user/get_code' --header 'authorization: Bearder " . l:ref_token . "' | jq .code | tr -d '\"' | tr -d '\n'")
	let l:file = system("mktemp")
	execute 'edit' l:file
	execute "normal! i" . l:code
	:%s/\\n/\r/g
	let g:xss_bomb_url = l:url
	let g:xss_bomb_token = l:ref_token
	autocmd BufWritePost * call UpdateFile(g:xss_bomb_url, g:xss_bomb_token)
endfunction
